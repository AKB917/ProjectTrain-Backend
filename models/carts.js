const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    trip: { type : mongoose.Schema.Types.ObjectId, ref :'trips'}
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;