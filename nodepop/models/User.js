/**
 * Created by Alex on 27/4/16.
 */
'use strict';

//Cargo los módulos
var mongoose = require('mongoose');

//Creo el Schema del modelo
var userSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true,
        index: true
    },
    email: { 
        type: String,
        required: true,
        index: true
    },
    pass: {
        type: String,
        required: true
    },
    platform: {type: String, enum: ['ios', 'android']},
    token: String
});

//Cargo el modelo
var user = mongoose.model('User', userSchema);
