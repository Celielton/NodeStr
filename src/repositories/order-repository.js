const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.get = async() => {
    await Order.find({});
}

exports.create = async(data) => {
    let order = new Order(data);
    await order.save();
    return order;
}