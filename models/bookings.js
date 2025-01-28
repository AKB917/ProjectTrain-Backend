const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    trip: { type : mongoose.schema.Types.ObjectId, ref :'trips'}
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;