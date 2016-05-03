/**
 * Created by Alex on 27/4/16.
 */
"use strict";

//Cargo los módulos necesarios
var mongoose = require('mongoose');

//Creo el Schema del modelo
var advertisementSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

//Creo el modelo
var advertisement = mongoose.model('Advertisement', advertisementSchema);

