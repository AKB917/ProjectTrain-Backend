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