const express =   require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');

class HandleGenerator {


    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;

        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if(username && password){
            if(username === mockedUsername && password === mockedPassword){
                let token = jwt.sign({ username: username }, config.secret, { expiresIn: '24h' });

                res.json({
                    success: true,
                    message: 'Authentication succesfull',
                    token: token
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }

    index(req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}

function main(){
    let app = express();
    let handlers = new HandleGenerator();
    const port = process.env.PORT ||  8000;
    
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(bodyParser.json());

    app.post('/login', handlers.login);
    app.get('/', middleware.checkToken, handlers.index);
    app.listen(port, () => console.log(`Server is listening to port: ${port}`));
}

main();