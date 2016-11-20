var mongoose = require("mongoose"),
    OrderSchema = require("../../schemas/admin/order");

var Order = mongoose.model("Order",OrderSchema);

module.exports = Order;
