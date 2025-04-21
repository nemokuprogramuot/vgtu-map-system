const express = require('express')
const mongoose = require('mongoose')
const Data = require('./models/data') 
const Visit = require('./models/visit')
const AllVisits = require('./models/allVisits')
require('dotenv').config();


const app = express()
const dbURI = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.dbURI;


//connect to mongodb
if(process.env.NODE_ENV !==  'test'){
    
    mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((result)=> app.listen(5000, ()=> {console.log("Server started on port 5000")}))
        .catch((err)=> console.log(err))
}

const cors = require("cors"); // laikinai
app.use(cors());
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

function sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/['"`;\-\\/*]/g, '');
}

    
app.post("/add-comment", (req,res) => {
   try{ 

    const data = new Data({
        title: sanitizeInput(req.body.title),
        description: sanitizeInput(req.body.description),
        email: sanitizeInput(req.body.email)
    });
    
    if (req.body.title.length > 100 || req.body.description.length > 500 || req.body.email.length > 100) {
        return res.status(400).send("Title, description, or email is too long.");
    }
    if (req.body.title.length < 1 || req.body.description.length < 1) {
        return res.status(400).send("Title or description can't be empty.");
    
    }

   else{
    data.save()
        .then((result) =>{
            console.log("issiusta")
            res.status(200).send("Comment submitted successfully!")
        })
        .catch((err) => {
            console.error("Save error:", err); 
            res.status(400).send("Failed to save comment."); 
        });
   }}
   catch(err){
    console.error("Error:", err); 
    res.status(500).send("Internal server error"); 
   }

})

app.post("/visit", async(req,res) => {
    
    data = sanitizeInput(req.body.building)
    const visitEntry = new Visit({
        building: data, 

    });
    await visitEntry.save();
    console.log("Building visit recorded in Visit table");

    let visits = await AllVisits.findOne({ path: data });

    if (visits) {
        visits.count += 1;
      } 
      
      await visits.save();
      console.log("Visit recorded in Visits table");

         
})
module.exports = app;
