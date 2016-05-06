/**
 * Created by Alex on 4/5/16.
 */
'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

var config = require('../../../local_config');
var translate = require('google-translate')(config.api.key);

router.post('/', function(req, res, next) {
    var email = req.query.email;
    var token = req.query.token;
    var platform = req.query.platform;
    var language = req.query.language || 'en';

    if (!platform) {
        translate.translate('Platform is needed', language, function(err, translated) {
            return res.status(401).json({success: false, error: translated.translatedText});
        });

        return;
    }

    if (!email) {
        var user = new User({platform: platform, token: token});

        user.save(function(err, saved) {
            if (err) {
                return next(err);
            }

            res.json({success: true, results: saved});

        });
    }

    User.find({email: email}, function(err, row) {
        if (err) {
            return next(err);
        }

        var userId = row[0]._id;
        console.log(userId);
        User.findByIdAndUpdate(userId, { $set: {platform: platform, token: token}}, function(err, result) {
            if (err) {
                return next(err);
            }

            res.json({success: true, results: result});
        });
    });

});

module.exports = router;
