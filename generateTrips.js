// This program generate trips in trips.json file. Feel free to modify or improve it!

const moment = require('moment');
const momentRandom = require('moment-random');
const fs = require('fs');

const NB_TRIPS = 2000;
const CITIES = ['Paris', 'Lyon', 'Marseille', 'Bruxelles'];
const MIN_PRICE = 25;
const MAX_PRICE = 150;

function randomElement(array, nb) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, nb);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const trips = [];
for (let i = 0; i < NB_TRIPS; i++) {
  const [departure, arrival] = randomElement(CITIES, 2);
  const date = momentRandom(moment().add(2, 'weeks'), moment());
  trips.push({ departure, arrival, date: { $date: date.toDate() }, price: randomNumber(MIN_PRICE, MAX_PRICE) });
}

const sortedTrips = trips.sort((a, b) => a.date.$date - b.date.$date);
fs.writeFile('./trips.json', JSON.stringify(sortedTrips), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`${NB_TRIPS} trips have been generated in trips.json file. Happy hackathon!`);
  }
});
