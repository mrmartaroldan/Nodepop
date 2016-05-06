/**
 * Created by Alex on 27/4/16.
 */
'use strict';

//Cargo los módulos necesarios
var mongoose = require('mongoose');

//Creo el Schema del modelo
var advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    sale: Boolean,
    price: Number,
    photo: String,
    tags: [String]
});

//Creo un método list que muestra una lista de los anuncios que hay en la base de datos filtrándolos por lo que q
advertisementSchema.statics.list = function (filter, start, limit, sort, cb) {
    
        var query = advertisement.find(filter);
        query.skip(start);
        query.limit(limit);
        query.sort(sort);
        return query.exec(cb);
};

//Creo el modelo
var advertisement = mongoose.model('Advertisement', advertisementSchema);

