/**
 * Created by Alex on 28/4/16.
 */
'use strict';

//Cargo módulos y el archivo advertisementJson.json
var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/nodepop';
var json = require('../advertisementsJson.json');

//Creo la conexión con la base de datos
mongoClient.connect(url, function(err, db) {

    //Compruebo si hay error
    if (err) {
        return console.log('Error: ', err);
    }

    //Elimino las tablas de la base de datos
    db.collection('advertisements').deleteMany({}, function(err,  results) {

        //Compruebo si hay error
        if (err) {
            return console.log('Error al eliminar las tablas de anuncios');
        }

        console.log('Tablas de anuncios eliminadas con éxito');

    });

    db.collection('users').deleteMany({}, function(err,  results) {

        //Compruebo si hay error
        if (err) {
            return console.log('Error al eliminar las tablas de usuarios');
        }

        console.log('Tablas de usuarios eliminadas con éxito:');

    });

    //Cargo el archivo advertisementJson.json en la base de datos
    db.collection('advertisements').insertMany(json.advertisements, function(err, results) {

        //Compruebo si hay error al insertar los anuncios
        if (err) {
            return console.log('Error al añadir el JSON');
        }

        console.log('Se han guardo los siguiente anuncios: ', results.ops);

    });

    db.collection('users').insertMany(json.users, function(err, results) {

        //Compruebo si hay error al insertar los anuncios
        if (err) {
            return console.log('Error al añadir el JSON');
        }

        console.log('Se han guardo los siguiente usuarios: ', results.ops);

    });

});

