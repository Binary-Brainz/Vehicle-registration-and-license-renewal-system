const jwt = require('jsonwebtoken');

let requireAuth = (req, res, next) => {

    const token = req.headers['token'].replace(/['"]+/g, '');

    //check whether jwt exists and it is verified
    if(token){
        jwt.verify(token, process.env.JWT_ENV, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.json({
                    status: 'error',
                    error: "token verification failed!"
                });
            }
            else{
                next();
            }
        });
    }
    else{
        console.log('not token');
        res.json({
            status: 'error',
            error: "unidentified token!"
        });
    }

};

const maxAge = 1 * 24 * 60 * 60;
const createToken = () => {
    return jwt.sign({value: Date.now()}, process.env.JWT_ENV, {
        expiresIn: maxAge
    });
};

module.exports = {
    requireAuth,
    createToken,
};