const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const user = require("./model");
const userRecord = require("./userRecord/index");

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://ytprogamer1213:immortalNS1213@healthcare.aamnh.mongodb.net/?retryWrites=true&w=majority&appName=HealthCare")
.then((res)=>{console.log("connected");})
.catch((err)=>{ console.log("error in connecting Mongo DB") })

bcrypt.genSalt(10, (err, salt) => {
    if (err) 
    {
        res.send("Error hashing password");
    } 
    else 
    {
        //API to push user into DB after encrypting the password
        app.post("/user/setUser", (req, res) => {
            const user_data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender:req.body.gender,
                dob:req.body.dob,
                age:req.body.age,
                bloodGroup:req.body.bloodGroup,
                height:req.body.height,
                weight:req.body.weight,
            };
            bcrypt.hash(user_data.password, salt, (err, hash) => {
                if (err) 
                {
                    res.send("Error hashing password");
                } 
                else 
                {
                    user_data.password = hash;
                    user.findOne({$or: [{ name: req.body.name },{ email: req.body.email }]})
                    .then((response) => {
                        if (response) res.send("User Already Exists");
                        else {
                            user.create(user_data)
                                .then((response) => {
                                    res.send(response);
                                    console.log("Signup successfull");
                                })
                                .catch(() => {
                                    res.send("Error in Creating User");
                                });
                        }
                    })
                    .catch((err) => {
                        res.send("Error finding user");
                    });
                }
            });
        });
    }
});

// Define the /getUser/:username API endpoint
//API to get username and password to login
app.get("/user/:username", (req, res) => {
    user.findOne({ name: req.params.username })
    .then((response) => {
        if (response) {
            const hash = response.password;
            bcrypt.compare(req.query.password, hash, (err, result) => {
                if (result) {
                    console.log(true);
                    res.send(true);
                } else {
                    res.send(false);
                    console.log(false);
                }
            });
        } else {
            res.send("No User Found");
        }
    })
    .catch(() => {
        console.log("no");
    });
});

//API to retrive User's data
app.get("/user_data/getUser/:username", (req, res) => {
    user.findOne({ name: req.params.username })
    .then((response) => {
        res.send(response);
    })
    .catch((err) => res.send(err));
});

//API to update User's data
app.put("/user_data/updateUser/:username", (req,res)=>{
    user.findOne({name:req.params.username})
    .then((response)=>{
        if(response)
        {
            response.gender = req.body.gender;
            response.age = req.body.age;
            response.dob = req.body.dob;
            response.weight = req.body.weight;
            response.height = req.body.height;
            response.dob = req.body.dob;

            response.save()
            .then((updatedUser)=>{
                console.log(updatedUser);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
        else{
            res.send("User Not Found");
        }
    })
    .catch(()=>{console.log("Error in finding User");})
})

//API to test server is running is or not
app.get("/",(req,res)=>{
    res.send("Server is running");    
})

app.use("/userRecord",userRecord);

app.listen(3030);

module.exports=app;
