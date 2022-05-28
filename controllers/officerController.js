let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const archiver = require('archiver');
const path = require('path');

const SuperUser = require('../models/superuser');
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

                try {
                    
                    let requests = await Request.find({officerID: mongoose.Types.ObjectId(user._id)});

                    let return_data = {};
                    
                    return_data['officer'] = user;
                    return_data['requests'] = requests;
                    
                    let token = auth.createToken(user._id);

                    res.json({
                        status: 'ok',
                        token: token,
                        data: return_data
                    });
                } 
                catch (err) {
                    console.log(err);
                }
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

                    let request = await Request.findByIdAndUpdate(requestID, {status: 'approved'});
                
                    let doc_name = pdfGenerator.makePdf(data);
                    let files = [doc_name];

                    let notification_data = {
                        type: request.type,
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
                                error: err
                            })
                        }
                        else{

                            res.json({
                                status: 'ok',
                                vehicle: vehicle
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

                            let request = await Request.findByIdAndUpdate(requestID, {status: 'approved'});
                        
                            let doc_name = pdfGenerator.makePdf(updated_vehicle);
                            let files = [doc_name];
        
                            let notification_data = {
                                type: request.type,
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
                                        error: err
                                    })
                                }
                                else{
        
                                    res.json({
                                        status: 'ok',
                                        vehicle: updated_vehicle
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
                status: 'ok'
            });
        }
    }
    catch (err) {
        console.log(err);
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

// download documents of an application
const download_documents = async (req, res) => {

    let request_id = req.params.request_id;
    
    try {

        let request_data = await Request.findByIdAndUpdate(mongoose.Types.ObjectId(request_id), {status: 'pending'}, {new: true});
        
        if(request_data){

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

    let requestID = req.params.requestID;
    let reason = req.body.reason;
        
    Request.findOneAndUpdate({_id: mongoose.Types.ObjectId(requestID)}, {status: 'rejected'}, {new: true}, async (err, request) => {

        if(err){

            res.json({
                status: 'error',
                error: err
            })
        }
        else{
            
            let notification_data = {
                type: request.type,
                message: `Your request for ${request.type} has rejected - ${reason}`,
                receiverID: request.ownerID,
                requestID: request._id,
            }

            let notification = new Notification(notification_data);

            notification.save((err) => {

                if(err){

                    res.json({
                        status: 'error',
                        error: err
                    })
                }
                else{

                    res.json({
                        status: 'ok',
                    });
                }
            })
        }
    });
}

module.exports = {
    login_post,
    add_vehicle,
    update_vehicle,
    reject_request,
    get_vehicles,
    download_documents,
}

//###optional
// get one vehicle
// get one request
// get all requests after any status update
// get vehicles after any vehicle change