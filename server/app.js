const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:"./config.env"});

require("./db/conn");

// const User = require("./model/userSchema");

app.use(express.json());

app.use(require("./router/auth"));

const PORT = process.env.PORT;



//Middleware

// const middleware = (req, res, next) => {
//     next();
// }

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.get("/about", middleware, (req, res) => {
//     res.send("Hello about World!");
// });

app.get("/contact", (req, res) => {
    res.send("Hello contact World!");
});

app.get("/signin", (req, res) => {
    res.send("Hello login World!");
});

app.get("/signup", (req, res) => {
    res.send("Hello registreation World!");
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
});