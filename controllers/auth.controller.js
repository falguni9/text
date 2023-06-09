const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');
require('dotenv').config();

exports.signup = async(req ,res) =>{
    try {
        const result = await userService.createUser(req.body);
        let status , response;
        if(result.error){
            status = 403 ;
            response = result.error;
        }else{
            status = 201 ;
            response = result.user;
        }
        res.status(status).send(response)
        
    } catch (error) {
         res.status(500).send({
            response:error
        })
    }
}

exports.signin = async(req, res) =>{
    try{
        const result = await userService.verifyUser(req.body);
        let statusCode;
        let response;
        if(result.error){
            statusCode = 401;
            response = result.error;
        }else{
            statusCode = 201;
            const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET_KEY);
            response = {
                message: "user validated",
                token: token
            };

        }
        res.status(statusCode).send(response);
    }catch(err){
        res.status(500).send(err)
    }
}