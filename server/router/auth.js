const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("Hello World! router js");
});

//using promises

// router.post("/register",(req, res) => {
    
//     const {name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({error: "pls fill the field properly"});
//     }

//     User.findOne({email:email}).then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});
//         user.save().then(() => {
//             res.status(201).json({message:"user registerd successfully"});
//         }).catch((err) => res.status(500).json({error:"failed to register"}));
//     }).catch(err => {console.log(err);});
// });

//using async-await

router.post("/register", async (req, res) => {
    
    const {name, email, phone, work, password, cpassword } = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "pls fill the field properly"});
    }

    try{
        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(422).json({error: "Email already exist"});
        } else if(password != cpassword) {
            return res.status(422).json({error: "password doesnot match"});
        } else {
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(201).json({message:"user registerd successfully"});
        }
    } catch(err) {
        console.log(err);
    }
});

//login route

router.post("/signin", async (req, res) => {
    try {
        let token;
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({error:"invaild credentials"});
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000), //token will expire in 30 days
                httpOnly: true
            });

        if(!isMatch) {
            res.status(400).json({error:"invalid credentials worng password"});
        } else {
            res.json({message:"user singin successfull"});
        }
        } else {
            res.status(400).json({error:"invalid credentials"});
        }

        
        

    }catch(err) {
        console.log(err);
    }
});

// about page
router.get("/about", authenticate, (req, res) => {
    res.send(req.rootUser);
});

module.exports = router;
