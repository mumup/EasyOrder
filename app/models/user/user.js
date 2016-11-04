var mongoose = require("mongoose"),
    UserSchema = require("../../schemas/user/user");

var User = mongoose.model("User",UserSchema);

module.exports = User;
