var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
var Trip = require('../models/trips')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
