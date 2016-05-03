/**
 * Created by Alex on 3/5/16.
 */
'use strict';

//Cargo los módulos de Express, Mongoose y Sha256
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var sha = require('sha256');

router.post('/', function (req, res, next) {

    //Obtengo los parámetros de la Query
    var name = req.query.name;
    var pass = sha(req.query.pass);
    var email = req.query.email.toString();

    //Creo el usuario
    var userModel = new User({name: name, email: email, pass: pass});

    //Valido el usuario
    try {
        var errors = userModel.validateSync();
    }catch (errors) {
        console.log(errors);
        next(errors);
    }

    //Guardo el usuario en la base de datos
    userModel.save(function (err, saved) {

        //Compruebo si hay error
        if (err){
            next(err);
            return;
        }

        res.json({ success: true, saved: saved});
    });
});

module.exports = router;