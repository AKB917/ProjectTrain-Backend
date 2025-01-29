var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");
const moment = require("moment");
moment.locale("fr");

const Trip = require("../models/trips");
const { log } = require("console");




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// route pour afficher l'heure extraite de la date de l'objet initiale dans la valeur de la clé time
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

router.get('/trips', (req, res) => {
    const { departure, arrival, date } = req.query;
    const formattedDate = moment.utc(date, 'DDMMYYYY');
    const startOfDay = formattedDate.startOf('day').toDate();
    const endOfDay = formattedDate.endOf('day').toDate();

    Trip.find({
        departure,
        arrival,
        date: { $gte: startOfDay, $lte: endOfDay },
    })
    .then((data) =>{ //Si pas de données alors result false
        if(data.length===0){ res.json({ result : false, error: "No trip found" })
        
    }else { // Envois des données et ajout d'une clé time pour avoir l'heure du train
        const datehour = data.map((trip) => { 
            console.log(trip.date)
            console.log(moment(new Date(trip.date)))
            return {
                ...trip.toObject(),
                time: moment.utc(new Date(trip.date)).format('HH:mm') // Format HH:MM de date
            }               
        });
        
        res.json({ result: true, trips: datehour }); //retourne l'objet avec l'heure dans time
    }})    
});




module.exports = router;
