/**
 * Created by Alex on 3/5/16.
 */
'use strict';

//Cargo los módulos de Express, Mongoose,Sha256 y JSONWebToken
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var sha = require('sha256');

var jwt = require('jsonwebtoken');
var config = require('../../../local_config');
var translate = require('../../../translate.json');

router.post('/', function(req, res, next) {

    //Obtengo los parámetros de la Query
    var name = req.query.name;
    var pass;
    var email = req.query.email;
    var platform = req.query.platform;
    var token = req.query.token;
    var language = req.query.language || 'en';

    if (!platform) {
        var message = translate.PLATFORM_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }

        return res.status(401).json({success: false, error: message});

    }

    if (!email) {
            message = translate.EMAIL_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }


        return res.status(401).json({success: false, error: message});
    }

    if (typeof req.query.pass === 'undefined') {
            message = translate.PASSWORD_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }
        return res.status(401).json({success: false, error: message});

    }else {
        pass = sha(req.query.pass);
    }

    if (!name) {
        message = translate.NAME_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }

        return res.status(401).json({success: false, error: message});

    }

    //Creo el usuario
    var userModel = new User({name: name, email: email, pass: pass, platform: platform, token: token});

    //Valido el usuario
    try {
        userModel.validateSync();
    }catch (errors) {
        next(errors);
    }

    //Guardo el usuario en la base de datos
    userModel.save(function(err, saved) {

        //Compruebo si hay error
        if (err) {
            return next(err);
        }

        res.json({ success: true, saved: saved});
    });
});

router.post('/authenticate', function(req, res) {

    var email = req.query.email;
    var pass;
    var language = req.query.language || 'en';

    if (typeof email === 'undefined') {

        var message = translate.EMAIL_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }
        return res.status(401).json({success: false, error: message});
    }

    if (typeof req.query.pass === 'undefined') {

        message = translate.PASSWORD_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }
        return res.status(401).json({success: false, error: message});
    }else {
        pass = sha(req.query.pass);
    }

    User.findOne({email: email}).exec(function(err, user) {
        if (err) {
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {

            message = translate.AUTHENTICATION_FAILED_USER_NOT_FOUND;
            if (language == 'es'){
                message = message.es
            }else if (language == 'en'){
                message = message.en
            }
                return res.status(401).json({success: false, error: message});

        }

        if (user.pass !== pass) {
            message = translate.AUTHENTICATION_FAILED_INVALID_PASSWORD;
            if (language == 'es'){
                message = message.es
            }else if (language == 'en'){
                message = message.en
            }

            return res.status(401).json({success: false, error: message});

        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {expiresIn: '2 days'});

        res.json({success: true, token: token});
    });

});

module.exports = router;
