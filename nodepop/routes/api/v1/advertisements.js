/**
 * Created by Alex on 3/5/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Advertisement = mongoose.model('Advertisement');

var jwtAuth = require('../../../libs/jwtAuth');

router.get('/', function (req, res, next) {

    
});





module.exports = router;