const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const userRecord = require('./model');

app.use(bodyParser.json());

//API to upload User Health Record
app.post("/",(req,res)=>{
    const userData = {
        name:req.body.name,
        user:req.body.user,
    }
    //Search for User If exists
    userRecord.findOne({name:userData.name})
    .then((response)=>{
        if(response)//If exists
        {
            if(response.user.some((item) => item.date=== userData.user.date)){
                res.send("Already Entered");//User Health Record Already Entered
            }
            else{
                response.user.push(userData.user);
                response.save();
                res.send("Uploaded Record");//User Record Uploaded
            }
        }
        else//If not, create User Health Record
        {
            userRecord.create(userData)
            .then(()=>{res.send("Uploaded Record");})
            .catch(()=>{res.send("Error in entering a record")});
        }
    })
    .catch(()=>{res.send("Error in entering a record");})
})

//API to GET user Health Record
app.get("/data/:userName",(req,res)=>{
    const userName = req.params.userName;
    userRecord.findOne({name:userName})
    .then((data)=>{
        if(data)
        {
            res.send(data.user)
        }
        else{res.send([]);}
    })
    .catch((err)=>{res.send("Error")});
})

app.get("/",(req,res)=>{
    res.send("Server is running");
})

module.exports = app;