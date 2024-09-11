const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("../Authentication/model");

const user_router = express.Router();
user_router.use(cors());
user_router.use(bodyParser.json());

user_router.get("/getUser/:username",(req,res)=>{
    user.findOne({name:req.params.username})
    .then((response)=>{res.send(response);})
    .catch((err)=>res.send(err));
})

module.exports = user_router;
