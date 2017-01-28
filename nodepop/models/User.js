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
        index: true
    },
    email: {
        type: String,
        index: true
    },
    pass: String,
    platform: {type: String, enum: ['ios', 'android']},
    token: String
});

//Cargo el modelo
mongoose.model('User', userSchema);
