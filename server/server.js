const express = require('express')
const app = express()

const cors = require("cors"); // laikinai
app.use(cors());

app.get("/api", (req,res) => {
    
    res.json({'data':['dataOne', 'dataTwo', 'dataThree']});
})

app.listen(5000, ()=> {console.log("Server started on port 5000")})