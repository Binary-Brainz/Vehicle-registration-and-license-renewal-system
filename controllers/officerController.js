let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const archiver = require('archiver');
const path = require('path');

const Officer = require('../models/officer');
const Owner = require('../models/owner');
const Notification = require('../models/notification');
const Vehicle = require('../models/vehicle');
const Request = require('../models/request');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');
const pdfGenerator = require('../middleware/pdfGenerator');

//login - get all requests(requests by officerID)
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await Officer.findOne({nic});

        if(user !== null){

            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                let token = auth.createToken();
                let fullName = user.firstName + " " + user.lastName;

                res.json({
                    status: 'ok',
                    token: token,
                    data: {
                        nic: nic,
                        id: user._id,
                        fullName: fullName,
                        officerType: user.type
                    }
                });
            }
            else{
                res.json({
                    status: 'error',
                    error: 'Authentication error!'
                });
            }
        }
        else{
            res.json({
                status: 'error',
                error: 'Authentication error!'
            });
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

//get officer dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;
    let state = req.headers['state'];

    try{

        let user = await Officer.findById(mongoose.Types.ObjectId(id));

        if(user !== null){

            let state_check = [];

            if(state === 'pending'){
                state_check = ['new', 'pending'];
            }
            else{
                state_check = [state]
            } 

            let requests = await Request.find({officerID: id, state: { $in: state_check}});

            let return_requests = [];

            for(let i = 0; i < requests.length; i++){

                let sample_request = {};

                for(const key in requests[i]._doc){

                    if(key === 'createdAt'){

                        let dt = new Date(requests[i]._doc[key]);
                        let createdAtDate = dt.getFullYear().toString().padStart(2, '0') + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + dt.getDate().toString().padStart(2, '0');

                        sample_request[key] = createdAtDate;
                    }
                    else{
                        sample_request[key] = requests[i]._doc[key];
                    }
                }
                return_requests.push(sample_request);
            }

            res.json({
                status: 'ok',
                user: user,
                requests: return_requests,
            });
        }
        else{
            res.json({
                status: 'error',
                error: 'Invalid User!'
            });
        }  
    }
    catch(err){
        console.log(err)
    }
}

//get all the requests of the officer
const get_officer_requests = async (req, res) => {

    let id = req.body.id;

    try{

        let requests = await Request.find({officerID: id});

        res.json({
            status: 'ok',
            data: {requests: requests}
        });
    }
    catch(err){
        console.log(err)
    }
}

//get all vehicles - when fetching change the timezone to IST
const get_vehicles = async (req, res) => {

    try {
        
        let vehicles = await Vehicle.find();
        let owners = await Owner.find();

        if(vehicles.length > 0){

            let result = [];

            vehicles.forEach((vehicle) => {

                let nic = vehicle.ownerNIC;

                for (let i = 0; i < owners.length; i++) {

                    let owner = owners[i];

                    if(owner.nic === nic){

                        result.push({
                            vehicle,
                            owner
                        });
                        continue;
                    }
                }
            });

            res.json({
                status: 'ok',
                result: result
            });
        }
        else{
            res.json({
                status: 'empty',
                result: []
            })
        }
    }
    catch (err) {
        console.log(err);
    }
}

//edit officer profile
const edit_officer = async (req, res) => {

    let data = req.body;
    let id = req.body.id;
    delete data.id

    let new_data = {};

    for(let key in data){
        if(data[key] !== ''){
            new_data[key] = data[key];
        }
    }

    try {

        if(Object.keys(new_data).length > 0){
        
            Officer.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, data, {new: true}, async (err, new_officer) => {
    
                if (err){
                    res.json({
                        status: 'error',
                        error: err
                    });
                }
                else if(new_officer === null){

                    res.json({
                        status: 'error',
                        error: 'Invalid User!'
                    })
                }
                else{
                    
                    res.json({
                        status: 'ok',
                    });
                }
            });
        }
        else{
            res.json({
                status: 'error',
                error: 'Update fields cannot be empty!'
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}

// add new vehicle - change application status/send notification to user with a generated liscense
const add_vehicle = async (req, res) => {

    let data = req.body;
    let ownerNIC = data.ownerNIC;

    let requestID = data.requestID;
    delete data.requestID

    const owner = await Owner.findOne({nic: ownerNIC})

    if(owner !== null){

        const vehicle = new Vehicle(data);

        vehicle.save(async (err) => {
            
            if(err){

                res.json({
                    status: 'error',
                    error: 'Registration number already exists!',
                });
            }
            else{

                try {

                    let request = await Request.findByIdAndUpdate(requestID, {state: 'approved'});
                
                    let doc_name = pdfGenerator.makePdf(data);
                    let files = [doc_name];

                    let notification_data = {
                        type: request.type,
                        regNo: vehicle.regNo,
                        state: 'approved',
                        message: `A new vehicle is registered under registration No. ${vehicle.regNo}`,
                        receiverID: owner._id,
                        requestID: requestID,
                        files: files
                    };
                    let notification = new Notification(notification_data);

                    notification.save((err) => {

                        if(err){

                            res.json({
                                status: 'error',
                                error: err.message
                            })
                        }
                        else{

                            res.json({
                                status: 'ok',
                                message: `A new vehicle is registered under registration No. ${vehicle.regNo}`
                            });
                        }
                    })
                } 
                catch (err) {
                    console.log(err);
                }
            }
        })
    }
    else{

        res.json({
            status: 'error',
            error: 'Invalid owner!'
        });
    }
}

//update vehicle - change application status/send notification to user with a generated liscense
const update_vehicle = async (req, res) => {

    let data = req.body;
    let vehicleID = req.params.id;

    let requestID = data.requestID;
    delete data.requestID

    let new_data = {};

    for(let key in data){
        if(data[key] !== ''){
            new_data[key] = data[key];
        }
    }

    try {

        if(Object.keys(new_data).length > 0){
        
            Vehicle.findOneAndUpdate({_id: mongoose.Types.ObjectId(vehicleID)}, data, {new: true}, async (err, updated_vehicle) => {
    
                if (err){
                    res.json({
                        status: 'error',
                        error: err
                    });
                }
                else if(updated_vehicle === null){

                    res.json({
                        status: 'error',
                        error: 'unregistered vehicle!'
                    })
                }
                else{
                    
                    try {

                        let owner = await Owner.findOne({nic: updated_vehicle.ownerNIC});

                        if(owner !== null){

                            let request = await Request.findByIdAndUpdate(requestID, {state: 'approved'});
                        
                            let doc_name = pdfGenerator.makePdf(updated_vehicle);
                            let files = [doc_name];
        
                            let notification_data = {
                                type: request.type,
                                regNo: updated_vehicle.regNo,
                                state: 'approved',
                                message: `${request.type} - registration No. ${updated_vehicle.regNo}`,
                                receiverID: owner._id,
                                requestID: requestID,
                                files: files
                            };
                            let notification = new Notification(notification_data);

                            notification.save((err) => {
        
                                if(err){
        
                                    res.json({
                                        status: 'error',
                                        error: err.message
                                    })
                                }
                                else{
        
                                    res.json({
                                        status: 'ok',
                                        message: `The vehicle ${updated_vehicle.regNo} is successfully updated!`
                                    });
                                }
                            })
                        }
                        else{

                            res.json({
                                status: 'error',
                                error: 'Invalid Owner!'
                            });
                        }
                    } 
                    catch (err) {
                        console.log(err);
                    }
                }
            });
        }
        else{
            res.json({
                status: 'error',
                error: 'Update fields cannot be empty!'
            });
        }
    }
    catch (err) {
        console.log(err);
    }
}

// download documents of an application
const download_documents = async (req, res) => {

    let request_id = req.params.request_id;
    
    try {

        let request_data = await Request.findById(mongoose.Types.ObjectId(request_id));
        
        if(request_data){

            if(request_data.state === 'new'){
                await Request.findByIdAndUpdate(mongoose.Types.ObjectId(request_id), {state: 'pending'});
            }

            let fileNames = request_data.files;
            console.log(fileNames);

            const archive = archiver('zip');
            archive.on('error', function(err) {
                res.status(500).send({error: err.message});
            });

            //on stream closed we can end the request
            archive.on('end', function() {
                console.log('Archive wrote %d bytes', archive.pointer());
            });

            res.attachment('documents.zip');
            let files = [];

            for(let i = 0; i < fileNames.length; i++){
                
                files.push('uploads/' + fileNames[i]);

            }

            archive.pipe(res);

            for(const i in files) {
                archive.file(files[i], { name: path.basename(files[i]) });
            }

            archive.finalize();
        }
        else{
            res.json({
                status: 'error',
                error: 'Unable to find the request!'
            })
        }
    } 
    catch (err) {
        console.log(err);
    }
}

//reject request
const reject_request = async (req, res) => {

    let requestID = req.body.requestID;
    let reason = req.body.reason;
        
    Request.findOneAndUpdate({_id: mongoose.Types.ObjectId(requestID)}, {state: 'rejected'}, {new: true}, async (err, request) => {

        if(err){

            res.json({
                status: 'error',
                error: err
            })
        }
        else{

            let notification_data;

            if(request.type === 'Vehicle Registration'){
                notification_data = {
                    type: request.type,
                    state: 'rejected',
                    message: `Your request for ${request.type} has rejected - ${reason}`,
                    receiverID: request.ownerID,
                    requestID: request._id,
                }
            }
            else{
                notification_data = {
                    type: request.type,
                    regNo: request.regNo,
                    state: 'rejected',
                    message: `Your request for ${request.type} of ${request.regNo} has rejected - ${reason}`,
                    receiverID: request.ownerID,
                    requestID: request._id,
                }
            }

            let notification = new Notification(notification_data);

            notification.save((err) => {

                if(err){

                    res.json({
                        status: 'error',
                        error: err.message
                    })
                }
                else{

                    res.json({
                        status: 'ok',
                        message: `The request from ${request.ownerName} is rejected!`
                    });
                }
            })
        }
    });
}

module.exports = {
    login_post,
    get_dashboard,
    get_officer_requests,
    get_vehicles,
    edit_officer,
    add_vehicle,
    update_vehicle,
    reject_request,
    download_documents,
}