var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');
const Trip = require('../models/trips');
const Cart = require('../models/carts');


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour ajouter un trajet dans le panier "BOOK" depuis la liste
//  dans home
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.post('/add/:id', (req,res) =>{

console.log("un truc",req.params)
console.log("un truc",req.params.id)
    const id = req.params.id
    console.log("deux truc",id)
    Trip.findById(id) 
    .then(data =>{console.log("data=",data)
        const newcartTrip = new Cart({
            trip: data
        })
    
        
        newcartTrip.save()
        res.json({ result: true, trips: newcartTrip })
    })
    })

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route delete pour suppression dans le panier
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    router.delete('/del/:id', (req,res) =>{

        const{ id }= req.params.id
        Cart.deleteOne({ id })
        .then(data =>{console.log(data)
            
            
            res.json({ result: true,  })
        })
        })


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour afficher le panier
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.get('/', async (req, res) => {
    try {
        // Récupérer tous les éléments du panier avec les trips associés
        const data = await Cart.find().populate('trip');

        if (!data || data.length === 0) {
            return res.json({ result: false, error: "No trips found in cart" });
        }

        console.log(data);

        let totalPrice = 0;

        
        const formattedTrips = data.map(trip => {
            if (!trip.trip || !trip.trip.date) {
                return null; 
            }

            let dateObj = new Date(trip.trip.date);
            let time = dateObj.toISOString().slice(11, 16); // Extrait HH:MM

            totalPrice += trip.trip.price || 0; // Ajoute le prix au total, évite les valeurs undefined
            
            return {
                id: trip.trip.id,
                departure: trip.departure,
                arrival: trip.trip.arrival,
                time: time, // Ajoute l'heure formatée
                price: trip.trip.price
            };
        }).filter(trip => trip !== null); // Supprime les valeurs null (au cas où certaines trips sont invalides)

        return res.json({ result: true, trips: formattedTrips, totalPrice: totalPrice });

    } catch (error) {
        console.error("Error:", error);
        return res.json({ result: false, error: error.message });
    }
});



module.exports = router;