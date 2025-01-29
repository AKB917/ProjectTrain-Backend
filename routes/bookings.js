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
    const data = Booking.find().populate('trip')
    .then(data => {console.log(data)
        let totalPrice = 0;
        
        // const formattedTrips = data.map(trip => {
        //     let dateObj = new Date(trip.date);
        //     let time = dateObj.toISOString().slice(11, 16); // Extrait HH:MM

        //     totalPrice += trip.trip.price; // Ajoute le prix au total
            
        //     return {
        //         departure: trip.trip.departure,
        //         arrival: trip.trip.arrival,
        //         time: time, // Ajoute l'heure formatée
        //         price: trip.trip.price
            // };
        });

        res.json({ result: true, trips: data });
    
    
})
// })

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour ajouter un trajet dans du panier vers le booking
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.post('/add', (req,res) =>{

  
        const id = req.params.id
       
        Cart.find() 
        .then(data =>{
            for (const trip of data) {
                const newBooking = new Booking({ trip: trip.trip })
                newBooking.save()
            }
        })
        .then(() => Cart.deleteMany().then(() =>res.json({ result: true }) ))
        })

module.exports = router;