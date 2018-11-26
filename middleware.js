let jwt = require('jsonwebtoken');
const config = require('./config');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];    

    if(token) {

        if (token.startsWith('Bearer ')){
            token = token.slice(7, token.length);
        }
        
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'Token revalidation required'
                });
            }

            res.decoded = decoded;
            next();
        });
    } else {

        res.json({
            success: false,
            message: 'Auth token required.'
        });
    }    
}

module.exports = { checkToken: checkToken };