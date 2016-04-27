/**
 * Created by Alex on 27/4/16.
 */
"use strict";

var mongoose = require('mongoose');


var advertisementSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

var advertisement = mongoose.model('Advertisement', advertisementSchema);