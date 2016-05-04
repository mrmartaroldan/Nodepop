/**
 * Created by Alex on 27/4/16.
 */
'use strict';

//Cargo los módulos
var mongoose = require('mongoose');

//Creo el Schema del modelo
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    platform: {type: String, enum: ['ios', 'android']},
    token: String
});

//Cargo el modelo
var user = mongoose.model('User', userSchema);
