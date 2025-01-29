var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');
const Trip = require('../models/trips');
const Booking = require("../models/bookings")


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour afficher le panier
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.get('/', (req,res) =>{
    Cart.find()
    .populate('trip')
    .then(data => {console.log(data)
        let totalPrice = 0;
        
        const formattedTrips = data.map(trip => {
            let dateObj = new Date(trip.trip.date);
            let time = dateObj.toISOString().slice(11, 16); // Extrait HH:MM

            totalPrice += trip.trip.price; // Ajoute le prix au total
            
            return {
                departure: trip.trip.departure,
                arrival: trip.trip.arrival,
                time: time, // Ajoute l'heure formatée
                price: trip.trip.price
            };
        });

        res.json({ result: true, trips: formattedTrips, totalPrice: totalPrice });
    
    
})
})

module.exports = router;