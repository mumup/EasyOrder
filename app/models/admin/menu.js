var mongoose = require("mongoose"),
    MenuSchema = require("../../schemas/admin/menu");

var Menu = mongoose.model("Menu",MenuSchema);

module.exports = Menu;
