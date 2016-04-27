/**
 * Created by Alex on 27/4/16.
 */
"use strict";

var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
    platform: {type: String, enum: ['ios', 'android']},
    token: String,
    user: String
});

var token = mongoose.model('Token', tokenSchema);