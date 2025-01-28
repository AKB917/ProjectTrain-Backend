var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');
const Trip = require('../models/trips');
const Cart = require('../models/carts');

router.post('/add/:id', (req,res) =>{

    const{ id }= req.params.id
    Trip.findOne({ id })
    // .populate('trips')
    .then(data =>{console.log(data)
        
        const newcartTrip = new Cart({
            trip: data
        })
        
        newcartTrip.save()
        res.json({ result: true, trips: newcartTrip })
    })
    })

router.get('/cart', (req,res) =>{
    Cart.find()
    .then(data => data)
    .populate(data)
    
})

module.exports = router;