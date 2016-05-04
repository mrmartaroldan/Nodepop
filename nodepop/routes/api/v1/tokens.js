/**
 * Created by Alex on 4/5/16.
 */
'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
    var email = req.query.email;
    var token = req.query.token;
    var platform = req.query.platform;

    if (!platform) {
        return res.status(400).send('Error: Es necesario especificar una plataforma');
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
