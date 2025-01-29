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
router.get('/', async (req, res) => {
    try {
        // Récupérer tous les éléments du panier avec les trips associés
        const data = await Booking.find().populate('trip');

        if (!data || data.length === 0) {
            return res.json({ result: false, error: "No trips found in Booking" });
        }

        
        

        let totalPrice = 0;

        
        const formattedTrips = data.map(trip => {
            if (!trip.trip || !trip.trip.date) {
                return null; 
            }
            
            let dateObj = new Date(trip.trip.date);
            console.log(moment(trip.trip.date).fromNow());
            let time = dateObj.toISOString().slice(11, 16); // Extrait HH:MM

            totalPrice += trip.trip.price || 0; // Ajoute le prix au total, évite les valeurs undefined
            
            const depart = moment(trip.trip.date).fromNow(true) //Ajout du temps restant avant le départ
            return {
                id: trip.id,
                departure: trip.trip.departure,
                arrival: trip.trip.arrival,
                time: time, // Ajoute l'heure formatée
                price: trip.trip.price,
                depart :"departure in " + depart,
            };
        }).filter(trip => trip !== null); // Supprime les valeurs null (au cas où certaines trips sont invalides)

        return res.json({ result: true, trips: formattedTrips, totalPrice: totalPrice });

    } catch (error) {
        console.error("Error:", error);
        return res.json({ result: false, error: error.message });
    }
});

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