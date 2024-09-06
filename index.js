const mongoose = require("mongoose");
const userSchema = require("./model.js");
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://ytprogamer1213:immortalNS1213@healthcare.aamnh.mongodb.net/?retryWrites=true&w=majority&appName=HealthCare')
.then((res)=>{console.log("connected")})
.catch((err)=>{console.log("error")})

app.get("/",(req,res)=>{
    res.send("connected DB");
})

app.listen(3030);
