const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const userRecord = require('./model');

app.post("/",(req,res)=>{
    const userData = {
        name:req.body.name,
        user:req.body.user,
    }
    userRecord.findOne({name:userData.name})
    .then((response)=>{
        if(response)
        {
            response.user.push(userData.user);
            response.save();
        }
        else
        {
            userRecord.create(userData)
            .then((response)=>{res.send(response);})
            .catch((err)=>{console.log(err);})
        }
    })
    .catch((err)=>{console.log(err)})
})

module.exports = app;
