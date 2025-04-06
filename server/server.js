const express = require('express')
const mongoose = require('mongoose')
const Data = require('./models/data') 

const app = express()

//connect to mongodb
const dbURI = "mongodb+srv://testas:testas123@tasker.rnrbv.mongodb.net/user-comments?retryWrites=true&w=majority&appName=Tasker" //data pridejau, gal istrint
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> app.listen(5000, ()=> {console.log("Server started on port 5000")}))
.catch((err)=> console.log(err))


const cors = require("cors"); // laikinai
app.use(cors());
app.use(express.urlencoded({extended: true})); 

//tesnig purpose
app.get("/add-data", (req,res) => {
    
    const data = new Data({
        title: "S1",
        description: "SRA-I",
        email:"pedro"
    });
    data.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })

})

app.post("/add-comment", (req,res) => {
    const data = new Data({
        title: req.body.title,
        description: req.body.description,
        email: req.body.email
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

