const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    trip: { type : mongoose.schema.Types.ObjectId, ref :'trips'}
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;