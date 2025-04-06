const express = require('express')
const mongoose = require('mongoose')
const Data = require('./models/data') 
require('dotenv').config();


const app = express()

//connect to mongodb
const dbURI = process.env.dbURI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(5000, ()=> {console.log("Server started on port 5000")}))
.catch((err)=> console.log(err))


const cors = require("cors"); // laikinai
app.use(cors());
app.use(express.urlencoded({extended: true})); 

function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/['";\-\\/*]/g, '');
}

//tesnig purpose

    
app.post("/add-comment", (req,res) => {
    const data = new Data({
        title: sanitizeInput(req.body.title),
        description: sanitizeInput(req.body.description),
        email: sanitizeInput(req.body.email)
    });

    data.save()
        .then((result) =>{
            console.log("issiusta")
            res.redirect("/")
        })
        .catch((err) => {
            console.log(err)
        })

})

