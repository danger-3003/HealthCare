const mongoose = require("mongoose");
const userSchema = require("./model.js");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://ytprogamer1213:immortalNS1213@healthcare.aamnh.mongodb.net/?retryWrites=true&w=majority&appName=HealthCare')
.then((res)=>{console.log("connected")})
.catch((err)=>{console.log("error")})

app.post("/setUser",(req,res)=>{
    const user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    }
    userSchema.create(user)
    .then(()=>{console.log("user created")})
    .catch(()=>{console.log("error in creating user")})
    res.send("connected DB");
})

app.listen(3030);
