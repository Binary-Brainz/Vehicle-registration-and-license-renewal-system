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

    data.password = await encHandler.encryptCredential(password);
    // data.nic = encHandler.encryptCredential(data.nic); //if applied change the login check

    const owner = new Owner(data);

    owner.save((err) => {
        if(err){
            let errField = (err.keyValue.email) ? 'email' : 'nic';
            res.json({
                status: 'error',
                error: errField + ' already exists!',
            });
        }
        else{
            res.json({
                status: 'ok',
                user: owner
            });
        }
    })
}

//login - get all owner vehicles/notifications(test)
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

                    let return_data = {};
                    
                    return_data['user'] = user;
                    return_data['vehicles'] = vehicles;

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

module.exports = {
    register_post,
    login_post,
    send_request,
}