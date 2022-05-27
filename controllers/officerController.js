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

//login - get all applications(requests by officerID)
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await Officer.findOne({nic});

        if(user !== null){

            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                try {
                    
                    let applications = await Request.find({officerID: mongoose.Types.ObjectId(user._id)});

                    let return_data = {};
                    
                    return_data['user'] = user;
                    return_data['applications'] = applications;
                    
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

// add new vehicle
const add_vehicle = async (req, res) => {

    let data = req.body;
    let ownerNIC = req.body.ownerNIC;

    const owner = await Owner.findOne({nic: ownerNIC})

    if(owner !== null){

        const vehicle = new Vehicle(data);

        vehicle.save((err) => {
            
            if(err){

                let errmsg = "Registration number already exists!";

                res.json({
                    status: 'error',
                    error: errmsg,
                });
            }
            else{
                // send notification to user with a generated liscense
                res.json({
                    status: 'ok',
                    vehicle: vehicle
                });
            }
        })
    }
    else{

        res.json({
            status: 'error',
            error: 'Invalid owner!',
        });
    }
}

//update vehicle
const update_vehicle = async (req, res) => {

    data = req.body;
    id = req.params.id;
    new_data = {};

    for(let key in req.body){
        if(data[key] !== ''){
            new_data[key] = data[key];
        }
    }

    try {
        if(Object.keys(new_data).length > 0){
        
            Vehicle.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, data, {returnOriginal: false}, (err, doc) => {
    
                if (err){
                    res.json({
                        status: 'error',
                        error: err
                    });
                }
                else if(doc === null){

                    res.json({
                        status: 'error',
                        error: 'unregistered vehicle!'
                    })
                }
                else{
                    // send updated liscence as a notification
                    res.json({
                        status: 'ok',
                        vehicle: doc
                    });
                }
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

module.exports = {
    login_post,
    add_vehicle,
    update_vehicle,
    get_vehicles,
}