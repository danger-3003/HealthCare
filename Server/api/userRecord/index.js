const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const userRecord = require('./model');

app.use(bodyParser.json());

app.post("/",(req,res)=>{
    const userData = {
        name:req.body.name,
        user:req.body.user,
    }
    userRecord.findOne({name:userData.name})
    .then((response)=>{
        if(response)
        {
            if(response.user.some((item) => item.date=== userData.user.date)){
                res.send("Already Entered");
            }
            else{
                response.user.push(userData.user);
                response.save();
                res.send("Uploaded Record");
            }
        }
        else
        {
            userRecord.create(userData)
            .then(()=>{res.send("Uploaded Record");})
            .catch(()=>{res.send("Error in entering a record")});
        }
    })
    .catch(()=>{res.send("Error in entering a record");})
})

app.get("/data/:userName",(req,res)=>{
    const userName = req.params.userName;
    userRecord.findOne({name:userName})
    .then((data)=>{res.send(data.user)})
    .catch((err)=>{console.log(err)});
})

app.get("/",(req,res)=>{
    res.send("Server is running");
})

module.exports = app;
