const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const Authentication_router = require("./Authentication/index");
const User_router = require("./User/index");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://ytprogamer1213:immortalNS1213@healthcare.aamnh.mongodb.net/?retryWrites=true&w=majority&appName=HealthCare")
.then((res)=>{
    console.log("connected");
    app.use("/user", Authentication_router);   
    app.use("/user_data", User_router); 
    app.get("/data/",(req,res)=>{
        res.send("Server is running");
    })
})
.catch((err)=>{ console.log("error in connecting Mongo DB") })

app.listen(3030);