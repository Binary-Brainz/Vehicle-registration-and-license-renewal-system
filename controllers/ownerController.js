let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const SuperUser = require('../models/superuser');
const Officer = require('../models/officer');
const Owner = require('../models/owner');
const Notification = require('../models/notification');
const Workday = require('../models/workday');

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

//login
const login_post = async (req, res) => {

    const nic = req.body.nic;
    const password = req.body.password;

    try {

        const user = await Owner.findOne({nic});

        if(user != null){
            
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
        console.log(error.message);
    }
}
//reserve date
const reserve_post = async (req, res) => {

    const id = req.body.id;
    const date = req.body.date;

    try{
        const dateObj = new Date(date); 

        var year = dateObj.getFullYear();
        var month = dateObj.getMonth()+1;
        var day= dateObj.getDate()+1;

        var dateStr = year.toString()+"-"+month.toString()+"-"+day.toString();
        const daytt = new Date(dateStr);

        const newWorkday = await Workday.findOne({day:daytt});

        if(newWorkday !== null){

            const ownersList = newWorkday.owners;

            if(ownersList.length < 10){

                Workday.updateOne({day:daytt},{$push: {owners:id}},function(err,response){

                    if(err){
                        res.json({
                            status: 'error',
                            error: err,
                        });
                    }
                    else{
                        res.json({
                            status: 'ok',
                            workday: response
                        });
                    }
                });
            }else{

                res.status(500).send({message:"The date you picked is already booked"});

            }
        }else{

            let newWorkday1 = new Workday({

                day: new Date(dateStr),
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
                        workday: newWorkday1
                    });
                }
            })

        }
    }
    catch (err){
        console.log(error.message);
    }
}

module.exports = {
    register_post,
    login_post,
    reserve_post,
}