let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SuperUser = require('../models/superuser');
const Officer = require('../models/officer');
const Owner = require('../models/owner');
const Notification = require('../models/notification');
const Vehicle = require('../models/vehicle');
const Request = require('../models/request');
const Workday = require('../models/workday');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//register
const register_post = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let nic = data.nic;

    data.password = await encHandler.encryptCredential(password);

    const owner = new Owner(data);

    owner.save(async (err) => {

        if(err){
            let errField = (err.keyValue.email) ? 'email' : 'nic';
            res.json({
                status: 'error',
                error: errField + ' already exists!',
            });
        }
        else{

            let user = await Owner.findOne({nic});
            let token = auth.createToken();

            res.json({
                status: 'ok',
                token: token,
                data: {
                    nic: nic,
                    id: user._id
                }
            });
            
            // try {
                
            //     let user = await Owner.findOne({nic});

            //     let vehicles = await Vehicle.find({ownerNIC: user.nic});
            //     let notifications = await Notification.find({receiverID: user._id})

            //     let return_data = {};
                
            //     return_data['owner'] = user;
            //     return_data['vehicles'] = vehicles;
            //     return_data['notifications'] = notifications;

            //     let token = auth.createToken(user._id);

            //     res.json({
            //         status: 'ok',
            //         token: token,
            //         data: user
            //     });
            // } 
            // catch (err) {
            //     console.log(err);
            // }
        }
    })
}

//login - get all owner vehicles/notifications(optional)
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await Owner.findOne({nic});

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
                        fullName: fullName
                    }
                });

                // try {
                    
                //     let vehicles = await Vehicle.find({ownerNIC: nic});
                //     let notifications = await Notification.find({receiverID: user._id})

                //     let return_data = {};
                    
                //     return_data['owner'] = user;
                //     return_data['vehicles'] = vehicles;
                //     return_data['notifications'] = notifications;

                //     let token = auth.createToken(user._id);

                //     res.json({
                //         status: 'ok',
                //         token: token,
                //         data: return_data
                //     });
                // } 
                // catch (err) {
                //     console.log(err);
                // }
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

//get owner dashboard info
const get_dashboard = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await Owner.findById(mongoose.Types.ObjectId(id));

        if(user !== null){

            let vehicles = await Vehicle.find({ownerNIC: user.nic});

            // let return_vehicles = [];

            // for(let i = 0; i < vehicles.length; i++){

            //     let sample_vehicle = {};

            //     for(const key in vehicles[i]._doc){

            //         if(key === 'registeredDate'){

            //             let dt = new Date(vehicles[i]._doc[key]);
            //             let registeredDate = dt.getFullYear().toString() + '/' + dt.getMonth().toString() + '/' + dt.getDate().toString();

            //             sample_vehicle[key] = registeredDate;
            //         }
            //         else{
            //             sample_vehicle[key] = vehicles[i]._doc[key];
            //         }
            //     }
            //     return_vehicles.push(sample_vehicle);
            // }

            for(let i = 0; i < vehicles.length; i++){

                if(vehicles[i].expireDate <= Date.now()){

                    await Vehicle.findOneAndUpdate({_id: mongoose.Types.ObjectId(vehicles[i]._id)}, {isExpired: true});
                }
            }

            let return_vehicles = await Vehicle.find({ownerNIC: user.nic});

            res.json({
                status: 'ok',
                user: user,
                vehicles: return_vehicles,
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

const expired_vehicles = async (req, res) => {

    let id = req.params.id;

    try{

        let user = await Owner.findById(mongoose.Types.ObjectId(id));

        if(user !== null){

            let expired_vehicles = await Vehicle.find({ownerNIC: user.nic, isExpired: true});

            // let expired_vehicles = [];
            // for(let i = 0; i < vehicles.length; i++){

            //     let exDate = new Date(vehicles[i].expireDate);

            //     if(Date.now() >= exDate){

            //         // let sample_vehicle = {};

            //         // for(const key in vehicles[i]){

            //         //     if(key === 'registeredDate'){

            //         //         let registeredDate = regDate.getFullYear().toString() + '.' + regDate.getMonth().toString() + '.' + regDate.getDate().toString();

            //         //         sample_vehicle[key] = registeredDate;
            //         //     }
            //         //     else{
            //         //         sample_vehicle[key] = vehicles[i][key];
            //         //     }
            //         // }
            //         // expired_vehicles.push(sample_vehicle);

            //         expired_vehicles.push(vehicles[i]);
            //     }
            // }

            res.json({
                status: 'ok',
                user: user,
                vehicles: expired_vehicles,
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

//get all the vehicles of the owner
const get_owner_vehicles = async (req, res) => {

    let nic = req.body.nic;

    try{

        let vehicles = await Vehicle.find({ownerNIC: nic});

        if(vehicles !== null){

            res.json({
                status: 'ok',
                data: {vehicles: vehicles}
            });
        }
        else{
            res.json({
                status: 'error',
                error: 'Invalid nic!'
            });
        }
    }
    catch(err){
        console.log(err)
    }
} 

//get unread notification count
const unread_notification_count = async (req, res) => {

    let id = req.params.id;

    try{

        let notifications = await Notification.find({receiverID: id, isViewed: false});

        res.json({
            status: 'ok',
            notificationCount: notifications.length,
        });  
    }
    catch(err){
        console.log(err)
    }
}

const get_owner_reservedDates = async (req, res) => {

    let id = req.params.id;

    try{

        let workdays = await Workday.find({ owners: { $all: [id] } });
        
        let ownerReservedDates = []
        for(let i = 0; i < workdays.length; i++){
            ownerReservedDates.push(workdays[i].day);
        }

        res.json({
            status: 'ok',
            ownerReservedDates: ownerReservedDates,
        });  
    }
    catch(err){
        console.log(err)
    }
}

//get all the notifications of the owner
const get_owner_notifications = async (req, res) => {

    let id = req.body.id;

    try{

        let notifications = await Notification.find({receiverID: id});

        res.json({
            status: 'ok',
            data: {notifications: notifications}
        });
    }
    catch(err){
        console.log(err)
    }
}

//get all the requests of the owner
const get_owner_requests = async (req, res) => {

    let id = req.body.id;

    try{

        let requests = await Request.find({ownerID: id});

        res.json({
            status: 'ok',
            data: {requests: requests}
        });
    }
    catch(err){
        console.log(err)
    }
}

//edit owner profile
const edit_owner = async (req, res) => {

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
        
            Owner.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, data, {new: true}, async (err, new_owner) => {
    
                if (err){
                    res.json({
                        status: 'error',
                        error: err
                    });
                }
                else if(new_owner === null){

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

//owner request
const send_request = async (req, res) => {

    let data = req.body;
    let type = data.type;

    if(data.files){

        let obj = await Officer.findOne({type: type}, '_id');
        let officerID = obj._id.toString();

        if(officerID){

            data['officerID'] = officerID;
            const request = new Request(data);

            request.save((err) => {

                if(err){
                    res.json({
                        status: 'error',
                        error: err,
                    });
                }
                else{
                    res.json({
                        status: 'ok',
                        request: request
                    });
                }
            })
        }
        else{
            res.json({
                status: 'error',
                error: 'Invalid request type!'
            });
        }
    }
    else{
        res.json({
            status: 'error',
            error: 'Required documents must be uploaded!'
        });
    }
}

//download pdf
const download_file = async (req, res) => {

    let notificationID = req.params.notificationID;

    try {
        
        let notification = await Notification.findById(mongoose.Types.ObjectId(notificationID));

        if(notification !== null){

            if(notification.files.length > 0){

                let fileName = notification.files[0];

                res.download('generated/' + fileName);
            }
            else{
                res.json({
                    status: 'error',
                    error: 'No attachments!'
                })
            }
        }
        else{
            res.json({
                status: 'error',
                error: 'Invalid notification id!'
            })
        }
    } 
    catch (err) {
        
    }
}

//reserve date
const reserve_post = async (req, res) => {

    const id = req.body.id;
    const date = req.body.date;

    try{
        const dateObj = new Date(date);

        const newWorkday = await Workday.findOne({day: dateObj});

        if(newWorkday !== null){

            const ownersList = newWorkday.owners;

            if(ownersList.length < 10){

                if(ownersList.includes(id)){
                    res.json({
                        status: 'error',
                        error: 'You have already reserved this date!'
                    });
                }
                else{

                    Workday.findByIdAndUpdate(mongoose.Types.ObjectId(newWorkday._id),{$push: {owners:id}},function(err,response){

                        if(err){
                            res.json({
                                status: 'error',
                                error: err,
                            });
                        }
                        else{
                            res.json({
                                status: 'ok',
                                workday: dateObj
                            });
                        }
                    });
                }
            }
            else{

                res.json({
                    status: 'error',
                    error: 'Requested date is not available!'
                });
            }
        }
        else{

            let newWorkday1 = new Workday({

                day: dateObj,
                owners: [id]

            });
            newWorkday1.save((err)=>{

                if(err){
                    res.json({
                        status: 'error',
                        error: err,
                    });
                }
                else{
                    res.json({
                        status: 'ok',
                        workday: dateObj
                    });
                }
            })

        }
    }
    catch (err){
        console.log(err.message);
    }
}


module.exports = {
    register_post,
    login_post,
    get_dashboard,
    expired_vehicles,
    get_owner_vehicles,
    unread_notification_count,
    get_owner_reservedDates,
    get_owner_notifications,
    get_owner_requests,
    edit_owner,
    send_request,
    download_file,
    reserve_post,
}

// optional //
// get one request
// get one notification
// get one vehicle