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
    db.collection('advertisements').deleteMany({}, function(err) {

        //Compruebo si hay error
        if (err) {
            return console.log('Failed to remove ads');
        }

        console.log('Successfully remove ads');

    });

    db.collection('users').deleteMany({}, function(err) {

        //Compruebo si hay error
        if (err) {
            return console.log('Failed to remove users');
        }

        console.log('Successfully remove users');

    });

    //Cargo el archivo advertisementJson.json en la base de datos
    db.collection('advertisements').insertMany(json.advertisements, function(err, results) {

        //Compruebo si hay error al insertar los anuncios
        if (err) {
            return console.log('Failed to add ads');
        }

        console.log('The following advertisements have been saved: ', results.ops);

    });

    db.collection('users').insertMany(json.users, function(err, results) {

        //Compruebo si hay error al insertar los anuncios
        if (err) {
            return console.log('Failed to add users');
        }

        console.log('The following users have been saved: ', results.ops);

    });

});

