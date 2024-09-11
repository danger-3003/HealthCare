const user = require("./model");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const Authentication_router = express.Router();
Authentication_router.use(cors());
Authentication_router.use(bodyParser.json());

bcrypt.genSalt(10, (err, salt)=>{
    if(err){ res.send("Error hashing password"); }
    else {
        Authentication_router.post("/setUser", (req, res)=>{
            const user_data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            }
            bcrypt.hash(user_data.password, salt, (err, hash)=>{
                if(err){ res.send("Error hashing password"); }
                else {
                    user_data.password = hash;
                    user.findOne({ $or: [{ name: req.body.name }, { email: req.body.email }] })
                    .then((response)=>{
                        if(response) res.send("User Already Exists")
                        else {
                            user.create(user_data)
                            .then((response)=>{ res.send(response); console.log("Signup successfull") })
                            .catch(()=>{ res.send("Error in Creating User") });
                        }
                    })
                    .catch((err)=>{ res.send("Error finding user"); });
                }
            })
        })
    }
})

// Define the /getUser/:username API endpoint
Authentication_router.get("/:username", (req, res)=>{
    user.findOne({ name: req.params.username })
    .then((response)=>{
        if(response) {
            const hash = response.password;
            bcrypt.compare(req.query.password, hash, (err, result)=>{
                if(result){ console.log(true); res.send(true) }
                else { res.send(false); console.log(false) }
            });
        } else {
            res.send("No User Found");
        }
    })
    .catch(()=>{ console.log("no") })
})

module.exports = Authentication_router;