const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require("./models/User");
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

// Load environment variables from .env file
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    method: ['GET', 'POST'],
    credentials:true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Failed to connect to MongoDB', err));


app.post('/register',(req, res)=>{
    const {name, email, password}=req.body;
    bcrypt.hash(password, 10)
    .then(hash =>{
        UserModel.create({name, email, password:hash})
        .then(user => {res.json("Success")
           console.log("Register Successfully!")})
        .catch(err => res.json(err))
    }).catch(error => res.json(error))
});


const verifyUser=(req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json("Token is missing");
    }else{
        jwt.verify(token, 'jwt-secret-key', (err, decoded)=>{
            if(err){
                return res.json("Error with token")
            }else{
                if(decoded.role === 'admin'){
                    next();
                }else{
                    return res.json("Not Admin");
                }
            }
        })
    }
}


app.get("/dashboard", verifyUser, (req, res)=>{
    res.json("Success");
})



app.post("/login", (req, res)=>{
    const {email, password}=req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, (err, response)=>{
                if(response){
                    const token = jwt.sign({email: user.email, role: user.role}, "jwt-secret-key", {expiresIn:'1d'})
                    res.cookie('token', token);
                    return res.json({Status:"Success", role : user.role});
                }else{
                    return res.json({message:"The Password is incorrect"})
                }
            })
        }else {
            return res.json({message:"No Record Existed!"})
        }
    })
})






app.post("/forgot-password", (req, res)=>{
    const {email}=req.body;
    UserModel.findOne({email: email})
   .then(user => {
    if(!user){
        return res.send({Status:"User NOT Existed"});
    }

    const token = jwt.sign({id: user._id}, 'jwt_secret_key', {expiresIn:'1d'});
    let transportmail = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.email_username,
            pass:process.env.email_password
        }
    })
    
    
    let mailOption = {
        from:process.env.email_username,
        to:email,
        subject:"Sending Email for Reset Password",
        text:`http://localhost:5173/reset-password/${user._id}/${token}`
    };
    
    transportmail.sendMail(mailOption, (err, val)=>{
        if(err){
            console.log("Error", err);
        }else{
            return res.send({Status:"Success"})
        }
    })
   }).catch(err => console.error(err))
})


app.post('/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).send({ Status: "Password is required" });
    }

    try {
        const decoded = jwt.verify(token, "jwt_secret_key");

        if (decoded.id !== id) {
            return res.status(401).send({ Status: "Invalid token or user ID" });
        }

        const hash = await bcrypt.hash(password, 10);
        await UserModel.findOneAndUpdate({ _id: id }, { password: hash });
        res.send({ Status: "Success" });
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).send({ Status: "Invalid token" });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send({ Status: "Token expired" });
        }
        res.status(500).send({ Status: "Server error", Error: err.message });
    }
});


app.post("/logout", (req, res)=>{
    res.clearCookie('token');
    return res.send({Status:"Success"})
})

app.listen(5000, ()=>{
    console.log("Server is Running");
})