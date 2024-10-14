const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
// convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Use ejs as the view engine
app.set('view engine','ejs');
// static folder path
app.use(express.static("public"));

app.get("/", (req,res)=>{
    res.render("login");
})


app.get("/signup", (req,res)=>{
    res.render("signup");
})


// Register 
app.post("/signup", async (req,res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    // check if the user already exists in the database
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser){
        res.send("User already exist, Please choose a different username");
    }
    else{
        const saltRounds = 10; // Number of salt round for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the hash password with original password

        const userData = await collection.insertMany(data);
        console.log(userData);
    }

});

// Login user
app.post("/login", async (req,res)=>{
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check){
            res.send("user name cannot found");
        }
        //compare the hash password from the database
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            res.render("home");
        }
        else{
            res.send("wrong password");
        }
    }catch{
        res.send("Wrong Details");
    }
})


const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is reunning on Port ${port}`);
})