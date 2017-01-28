/**
 * Created by Alex on 4/5/16.
 */
'use strict';

//Cargo los módulos de Express, el modelo y el google-translate
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var config = require('../../../local_config');
var translate = require('../../../translate.json');

router.post('/', function(req, res, next) {

    //Recojo los parámetros que me pasan en la query
    var email = req.query.email;
    var token = req.query.token;
    var platform = req.query.platform;
    var language = req.query.language || 'en';

    //Compruebo los parámetros que me han pasado
    if (!platform) {
        var message = translate.PLATFORM_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }

        return res.status(401).json({success: false, error: message});
    }

    if (!token) {
        message = translate.TOKEN_IS_NEEDED;
        if (language == 'es'){
            message = message.es
        }else if (language == 'en'){
            message = message.en
        }
        return res.status(401).json({success: false, error: message});
    }

    //Compruebo si hay email para actualizar usuario o no
    if (!email) {
        let user = new User({platform: platform, token: token});

        user.save(function(err, saved) {
            if (err) {
                return next(err);
            }

            return res.json({success: true, results: saved});

        });
        return;
    }

    //En caso de que haya usuario los busco por email y lo actualizo con los datos que me han pasado
    User.find({email: email}, function(err, row) {
        if (err) {
            return next(err);
        }

        var userId = row[0]._id;
        User.findByIdAndUpdate(userId, { $set: {platform: platform, token: token}}, function(err, result) {
            if (err) {
                return next(err);
            }

            res.json({success: true, results: result});
        });
    });

});

module.exports = router;
