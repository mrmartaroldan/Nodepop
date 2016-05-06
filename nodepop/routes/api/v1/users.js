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
var translate = require('google-translate')(config.api.key);

router.post('/', function(req, res, next) {

    //Obtengo los parámetros de la Query
    var name = req.query.name;
    var pass;
    var email = req.query.email;
    var platform = req.query.platform;
    var token = req.query.token;
    var language = req.query.language || 'en';

    if (!platform) {
        translate.translate('Platform is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }

    if (!email) {
        translate.translate('Email is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }

    if (typeof req.query.pass === 'undefined') {
        translate.translate('Password is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }else {
        pass = sha(req.query.pass);
    }

    if (!name) {
        translate.translate('Name is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
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
    console.log(email);

    if (typeof email === 'undefined') {
        translate.translate('Email is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }

    if (typeof req.query.pass === 'undefined') {
        translate.translate('Password is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }else {
        pass = sha(req.query.pass);
    }

    User.findOne({email: email}).exec(function(err, user) {
        if (err) {
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {
            translate.translate('Authentication failed. User not found.', language, function(err, translated) {
                return res.status(401).json({success: false, error: translated.translatedText});
            });

            return;
        }

        if (user.pass !== pass) {
            translate.translate('Authentication failed. Invalid password.', language, function(err, translated) {
                return res.status(401).json({success: false, error: translated.translatedText});
            });

            return;
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {expiresIn: '2 days'});

        res.json({success: true, token: token});
    });

});

module.exports = router;
