const mongoose = require("mongoose");
const express  = require("express");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(cors());

app.get('/',((req,res)=>{
    res.sendFile(process.cwd() + "/index.html")
}))

app.post('/id/home',(req,res)=>{
    res.json({
        name:req.body.student,
        semester:req.body.semester,
        email:req.body.email,
        contact:req.body.contact,
        rollNo:req.body.rollNo
    })
})
app.listen(port,()=>{
    console.log(`Listening from ${port}`)
})