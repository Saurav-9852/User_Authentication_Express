const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://prakashsaurav932004:Saurav123@cluster0.yn27c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

// check database connected or not
connect.then(()=>{
    console.log("Database Connected");
})
.catch(()=>{
    console.log("Database cannot be connected");
});




// create Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;


