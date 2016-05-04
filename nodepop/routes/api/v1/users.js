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

router.post('/', function(req, res, next) {

    //Obtengo los parámetros de la Query
    var name = req.query.name;
    var pass = sha(req.query.pass);
    var email = req.query.email;
    var platform = req.query.platform;
    var token = req.query.token;

    if (!platform) {
        return res.status(400).send('Error: Es necesario especificar una plataforma');
    }

    //Creo el usuario
    var userModel = new User({name: name, email: email, pass: pass, platform: platform, token: token});

    //Valido el usuario
    try {
        var errors = userModel.validateSync();
    }catch (errors) {
        console.log(errors);
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
    var pass = sha(req.query.pass);
    console.log(pass);

    User.findOne({email: email}).exec(function(err, user) {
        if (err) {
            return res.status(500).json({success: false, error: err});
        }

        if (!user) {
            return res.status(401).json({success: false, error: 'Auth failed. User not found.'});
        }

        if (user.pass !== pass) {
            return res.status(401).json({success: false, error: 'Auth failed. Invalid password.'});
        }

        var token = jwt.sign({ id: user._id}, config.jwt.secret, {expiresIn: '2 days'});

        res.json({success: true, token: token});
    });

});

module.exports = router;
