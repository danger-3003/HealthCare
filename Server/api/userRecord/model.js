const mongoose = require('mongoose');
const userRecord = mongoose.Schema({
    name:String,
    user:[
        {
            date:String,
            bp:String,
            sugar:Number,
            pulse:Number,
        }
    ]
})

module.exports = mongoose.model("userRecord",userRecord);