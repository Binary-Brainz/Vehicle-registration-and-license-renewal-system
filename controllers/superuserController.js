let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SuperUser = require('../models/superuser');
const Officer = require('../models/officer');
const Owner = require('../models/owner');
const Notification = require('../models/notification');

const auth = require('../middleware/auth');
const encHandler = require('../middleware/encryptionHandler');

//login
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await SuperUser.findOne({nic: nic});

        if(user !== null){
            
            let password_check = await encHandler.checkEncryptedCredential(password, user.password);

            if(password_check){

                let token = auth.createToken(user._id);

                res.json({
                    status: 'ok',
                    token: token,
                    user: user
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
        console.log(error);
    }
}

//add officer - check
const addOfficer_post = async (req, res) => {

    let data = req.body;
    let password = data.password;

    data.password = await encHandler.encryptCredential(password);
    // data.nic = encHandler.encryptCredential(data.nic); //if applied change the login check

    const officer = new Officer(data);

    officer.save((err) => {
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
                user: officer
            });
        }
    })
}

//edit account - officer
const editOfficer = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    // if email is requested to be changed, check uniqueness

    try {

        Owner.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, data, {returnOriginal: false}, (err, doc) => {

            if (err){
                res.json({
                    status: 'error',
                    error: err
                });
            }
            else{
                res.json({
                    status: 'ok',
                    user: doc
                });
            }
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

//edit account - owner
const editOwner = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    // if email is requested to be changed, check uniqueness

    try {

        Owner.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, data, {returnOriginal: false}, (err, doc) => {

            if (err){
                res.json({
                    status: 'error',
                    error: err
                });
            }
            else{
                res.json({
                    status: 'ok',
                    user: doc
                });
            }
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

//get all notifications
const getNotifications = async (req, res) => {

    try {

        let notifications = await Notification.find();
        res.json({
            status: 'ok',
            notifications: notifications
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

//send notification
const sendNotifications = (req, res) => {

    
}

// temp
const register_post = async (req, res) => {

    let data = req.body

    data.password = await encHandler.encryptCredential(data.password);
    // data.nic = encHandler.encryptCredential(data.nic); //if applied change the login check

    let superuser = new SuperUser(req.body);
    superuser.save((err) => {
        if(err){
            res.json({
                status: 'error',
                error: err.message
            });
        }
        else{
            res.json({
                status: 'ok',
                user: superuser
            });
        }
    })
}

module.exports = {
    login_post,
    addOfficer_post,
    editOfficer,
    editOwner,
    getNotifications,
    sendNotifications,
    register_post,
  }