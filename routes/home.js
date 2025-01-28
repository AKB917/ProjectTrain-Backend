var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
require('../models/connection');
const moment = require("moment");
moment.locale('fr');

const Trip = require('../models/trips');
const { log } = require('console');

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
    .then((data) => {console.log(data)
        if(data.length>0){
            res.json({ result: true, trips: data })
        }else {
            res.json({ result : false, error: "No trip found" })
        }
    })
})



module.exports = router;