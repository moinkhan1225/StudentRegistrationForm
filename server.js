const mongoose = require("mongoose");
const express  = require("express");
const bodyparser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://admin:moinkhan456@cluster0.dxjcj.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("MongoDB Connect"))
.catch((e)=>console.log(`MongoDB not Connected Reason:${e}`))

const studentSchema = mongoose.Schema({
    student_name:{
        type:String,
        required:true
    },
    student_semester:{
        type:String,
        required:true
    },
    student_contact:{
        type:Number,
        required:true
    },
    student_rollNumber:{
        type:Number,
        required:true
    }
})

let studentModel = mongoose.Model('studentModel',studentSchema);

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