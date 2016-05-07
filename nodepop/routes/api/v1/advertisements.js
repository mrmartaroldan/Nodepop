/**
 * Created by Alex on 3/5/16.
 */
'use strict';

//Cargo los módulos de Express, el modelo y la autenticación
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

var jwtAuth = require('../../../libs/jwtAuth');

//Incluyo la autenticación
router.use(jwtAuth());

router.get('/', function(req, res) {

    //Recojo los parámetros de la query string
    var name = req.query.name;
    var price = req.query.price;
    var tags = req.query.tag;
    var sale = req.query.sale;
    var start = parseInt(req.query.start) || 0;
    var limit = parseInt(req.query.limit) || null;
    var sort = req.query.sort || null;

    var filter = {};

    //Compruebo los datos que me han pasado y cuáles no, para hacer el filtro
    if (name) {

        var $regex = new RegExp('^' + name, 'i');
        filter.name = {$regex};
    }

    if (price) {

        var number = price.search('-');

        if (number !== -1) {
            var regexName = price.split('-');
            var $gte = parseFloat(regexName[0]);
            var $lte = parseFloat(regexName[1]);

            if (isNaN($lte)) {
                filter.price = {$gte};

            } else if (isNaN($gte)) {
                filter.price = {$lte};
            } else {
                filter.price = {$gte, $lte};
            }
        }
    }

    if (sale) {
        filter.sale = sale;
    }

    if (typeof tags === 'string') {

        filter.tags = tags;

    }else if (typeof tags === 'object') {
        var $all = tags;
        filter.tags = {$all};
    }

    //Realizo la búsqueda con el filtro que me han pasado
    Advertisement.list(filter, start, limit, sort, function(err, results) {

        //Compruebo si hay error
        if (err) {
            return res.json({success: false, error: err});
        }

        res.json({success: true, results: results});
    });
});

module.exports = router;
