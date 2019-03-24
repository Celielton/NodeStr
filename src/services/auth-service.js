'use strict';
const jwt = require('jsonwebtoken');

exports.generate = async(data) => {
    return await jwt.sign(data, global.SALT_KEY, { expiresIn: '1d'});
};

exports.decode = async(token) => {
    const data = await jwt.verify(token, global.SALT_KEY);
    return data;
};

exports.authorize = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token){
        res.status(401).send("Invalid token!");
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).send("Invalid token!");
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = async(req, res, next) => {
    const token = req.headers['x-access-token'];

    if(!token){
        res.status(401).send("Invalid token!");
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).send("Invalid token!");
            } else {
                if(decoded.roles.includes('admin')){
                    next();
                } else {
                    res.status(403).send("Acesso restrito!");
                }
            }
        });
    }
};