var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');
const Trip = require('../models/trips');
const Cart = require('../models/carts');


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Route pour ajouter un trajet dans le panier
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
router.post('/add/:id', (req,res) =>{

    const{ id }= req.params.id
    Trip.findOne({ id })
    .then(data =>{const newcartTrip = new Cart({
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
    .then(data => {
        const datehour = data.map((trip) => { 
                return {
                    ...trip.toObject(),
                    date: moment(trip.date).utc().format('HH:mm') // Format complet
                };
            });
        res.json({result : true ,  Cart : datehour})
    })
    
    
})



module.exports = router;