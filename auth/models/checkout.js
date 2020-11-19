const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CheckoutSchema = mongoose.Schema({
    // userid : String,
    userid  : String,
    orders : [{}]
});

// const OrdersSchema = mongoose.Schema({
//     orders : [CheckoutSchema]
// });

module.exports = mongoose.model('Checkout', CheckoutSchema);
// module.exports = {
//     orders: mongoose.model('Orders', OrdersSchema),
//     Checkout: mongoose.model('checkout', CheckoutSchema)
// };