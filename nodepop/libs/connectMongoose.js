/**
 * Created by Alex on 28/4/16.
 */
'use strict';

var mongoose = require('mongoose');
var conn = mongoose.connection;

//handlers de eventos de conexion
conn.on('error', console.log.bind(console, 'connection error'));

conn.once('open', function() {

    console.log('Connected');

});

//conectar base de datos

mongoose.connect('mongodb://localhost:27017/nodepop');
