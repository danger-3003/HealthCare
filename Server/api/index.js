const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
require('dotenv').config();
const user = require("./model");

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
        app.post("/user/setUser", (req, res) => {
            const user_data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
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

app.get("/user_data/getUser/:username", (req, res) => {
    user.findOne({ name: req.params.username })
    .then((response) => {
        res.send(response);
    })
    .catch((err) => res.send(err));
});

app.get("/",(req,res)=>{
    res.send("Server is running");    
})

app.listen(3030);

module.exports=app;
