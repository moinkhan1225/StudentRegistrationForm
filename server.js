const mongoose = require("mongoose");
const express  = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get('/',((req,res)=>{
    res.sendFile(process.cwd() + "/index.html")
}))

app.post('/id/home',(req,res)=>{
    res.json({
        name:req.body.student
        /*name:req.body.student,
        semester:req.body.semester,
        email:req.body.email,
        contact:req.body.contact,
        rollNo:req.body.rollNo*/
    })
})
app.listen(port,()=>{
    console.log(`Listening from ${port}`)
})