const mongoose = require("mongoose");
const user = require("./model.js");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.URI)
.then((res)=>{
    console.log("connected");

    bcrypt.genSalt(10,(err,salt)=>{
        if(err){res.send("Error hashing password");}
        else{
            app.post("/setUser",(req,res)=>{
                const user_data={
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                }
                bcrypt.hash(user_data.password,salt,(err,hash)=>{
                    if(err){res.send("Error hashing password");}
                    else{
                        user_data.password=hash;
                        user.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] })
                        .then((response)=>{
                            if(response)res.send("User Already Exists")
                            else
                            {
                                user.create(user_data)
                                .then((response)=>{res.send(response);console.log("Signup successfull")})
                                .catch(()=>{res.send("Error in Creating User")});
                            }
                        })
                        .catch((err)=>{res.send("Error finding user");});
                    }
                })
            })
            app.get("/getUser/:username",(req,res)=>{
                user.findOne({name:req.params.username})
                .then((response)=>{
                    if(response)
                    {
                        const hash = response.password;
                        bcrypt.compare(req.query.password, hash, (err, result)=>{
                            if(result){console.log(true);res.send(true)}
                            else{res.send(false);console.log(false)}
                        });
                    }
                    else
                    {
                        res.send("No User Found");
                    }
                })
                .catch(()=>{console.log("no")})
            })
        }
    })    
})
.catch((err)=>{console.log("error")})

app.listen(3030);
