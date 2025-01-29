var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');
const Trip = require('../models/trips');
const Booking = require("../models/bookings");
const Cart = require('../models/carts');


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour afficher le booking
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.get('/', (req,res) =>{
    Booking.find()
    .populate('trip')
    .then(data => {
        let totalPrice = 0;
        
        const formattedTrips = data.map(trip => {
            let dateObj = new Date(trip.date);
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour ajouter un trajet dans du panier vers le booking
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.post('/add/:id', (req,res) =>{


        const id = req.params.id
        console.log("ccccc",data)
        Cart.findById(id)
        .then(data =>{
            const newbookingTrip = new Booking({
                trip: Cart.data
            })
            newbookingTrip.save()
            res.json({ result: true, trips: newbookingTrip })
        })
        

        })

module.exports = router;