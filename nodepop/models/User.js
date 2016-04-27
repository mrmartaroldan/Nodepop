/**
 * Created by Alex on 27/4/16.
 */
"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({ 
    name: String,
    email: String,
    pass: String 
});

var user = mongoose.model('User', userSchema);