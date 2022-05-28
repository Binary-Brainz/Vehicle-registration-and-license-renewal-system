let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SuperUser = require('../models/superuser');
const Officer = require('../models/officer');
const Owner = require('../models/owner');
const Notification = require('../models/notification');
const Vehicle = require('../models/vehicle');
const Request = require('../models/request');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//register
const register_post = async (req, res) => {

    let data = req.body;
    let password = data.password;
    let nic = data.nic;

    data.password = await encHandler.encryptCredential(password);
    // data.nic = encHandler.encryptCredential(data.nic); //if applied change the login check

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
            
            try {
                
                let user = await Owner.findOne({nic});

                let vehicles = await Vehicle.find({ownerNIC: user.nic});
                let notifications = await Notification.find({receiverID: user._id})

                let return_data = {};
                
                return_data['owner'] = user;
                return_data['vehicles'] = vehicles;
                return_data['notifications'] = notifications;

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
    })
}

//login - get all owner vehicles/notifications
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await Owner.findOne({nic});

        if(user !== null){
            
            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                try {
                    
                    let vehicles = await Vehicle.find({ownerNIC: nic});
                    let notifications = await Notification.find({receiverID: user._id})

                    let return_data = {};
                    
                    return_data['owner'] = user;
                    return_data['vehicles'] = vehicles;
                    return_data['notifications'] = notifications;

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

//owner request
const send_request = async (req, res) => {

    let data = req.body
    let type = data.type

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

module.exports = {
    register_post,
    login_post,
    send_request,
    download_file,
}

// optional //
// get all requests
// get all notifications
// get all vehicles
// get one request
// get one notification
// get one vehicle