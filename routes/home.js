var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');

const Trip = require('../models/trips');
const { log } = require('console');

router.get('/trips', (req, res) => {
    const { departure, arrival, date } = req.body;
    const formattedDate = moment(date, 'DDMMYYYY');
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

// router.get('/trips', (req, res) => {
// const departvalue = req.body.departure;
// const arrivalvalue = req.body.arrival;
// const datevalue = req.body.date;


//     Trip.find()    
//     .then(data => {
//         const trips = data.filter((trip)=> 
//             trip.departure === departvalue && 
//             trip.arrival === arrivalvalue && 
//             moment(trip.date).format('L') === datevalue
//         ) ; 
//         console.log('coucou',moment(data[0].date).format('L'))

//             res.json({ result: true , trips })
    
//             }
// )
//    });
//   ;
// function date(){
//    const  datea=new Date("2025-01-28T09:53:30.443Z").getFullYear().getMonth().getMonth().getMonth()
// }


//   router.post('/newtrip', (req,res) => {
//     const newTrip = new Trip({
//         departure: req.body.departure,
// 	arrival: req.body.arrival,
// 	date: req.body.date,
// 	price: req.body.price,
//     })
//     newTrip.save()
//         res.json({ result: true, allTrips });
//   })




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;