var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');

const Trip = require('../models/trips');
const { log } = require('console');

// Route qui affiche la date bute dans la base
router.get('/trips', (req, res) => {
    const { departure, arrival, date } = req.body;
    const formattedDate = moment.utc(date, 'DDMMYYYY');
    const startOfDay = formattedDate.startOf('day').toDate();
    const endOfDay = formattedDate.endOf('day').toDate();
    Trip.find({
        departure,
        arrival,
        date: { $gte: startOfDay, $lte: endOfDay },
    })
    .then((data) => {console.log(data)
        if(data.length>0){
            res.json({ result: true, trips: data })
        }else {
            res.json({ result : false, error: "No trip found" })
        }
    })
})


//route pour afficher l'heure extraite de la date de l'objet initiale
// router.get('/tripsh', (req, res) => {
//     const { departure, arrival, date } = req.body;
//     const formattedDate = moment.utc(date, 'DDMMYYYY');
//     const startOfDay = formattedDate.startOf('day').toDate();
//     const endOfDay = formattedDate.endOf('day').toDate();

//     Trip.find({
//         departure,
//         arrival,
//         date: { $gte: startOfDay, $lte: endOfDay },
//     })
//     .then((data) =>{ 
//         if(data.length===0){ res.json({ result : false, error: "No trip found" })
        
//     }else {
//         const datehour = data.map((trip) => { 
//             return {
//                 ...trip.toObject(),
//                 time: moment(trip.date).format('HH:mm') // Format HH:MM de date
//             }   
                
            
//         });
        
//         res.json({ result: true, trips: datehour });
//     }
// }
// )
    
// });

router.get('/tripsh', (req, res) => {
    const { departure, arrival, date } = req.query;
    const formattedDate = moment(date, 'DDMMYYYY');
    const startOfDay = formattedDate.startOf('day').toDate();
    const endOfDay = formattedDate.endOf('day').toDate();
if( !departure || !arrival || !date){res.json({ result : false, error: "No trip found" })}
else{
    Trip.find({
        departure,
        arrival,
        date: { $gte: startOfDay, $lte: endOfDay },
    })
    .then((data) =>{ // afficher l'heure presente dans la date retourné dans dathour
         for (let i = 0; i < data.length; i++) {
            let dathour = data[i].date.$date; 
            data[i].date = dathour.slice(11, 16); 
          }
        
        
        
                res.json({result : true ,  Cart : dathour})
            })
        
        
    
}
} 
);



module.exports = router;