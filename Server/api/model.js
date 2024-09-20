const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob:String,
    height:String,
    age:String,
    weight:String,
    gender:String,
    bloodGroup:String
})


module.exports = mongoose.model("Users",userSchema);