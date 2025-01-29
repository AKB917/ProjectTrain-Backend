const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    trip: { type : mongoose.Schema.Types.ObjectId, ref :'trips'},
    cart : { type : mongoose.Schema.Types.ObjectId, ref :'carts'}
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;