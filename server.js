const mongoose = require("mongoose");
const express  = require("express");
const bodyparser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect("mongodb+srv://admin:moinkhan456@cluster0.dxjcj.mongodb.net/Students-Database?retryWrites=true&w=majority")
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
    student_email:{
        type:String,
        required:true
    },
    student_contact:{
        type:Number,
        required:true
    },
    student_rollNumber:{
        type:Number,
        required:true,
        default:0
    }
})

let studentModel = mongoose.model('studentModel',studentSchema);

app.get('/',((req,res)=>{
    res.sendFile(process.cwd() + "/index.html")
}))

app.post('/id/home',(req,res)=>{
   const studentReg = new studentModel({
    student_name    :   req.body.student,
    student_semester:   req.body.semester,
    student_email   :   req.body.email,
    student_contact :   req.body.contact,
    student_rollNumber:    req.body.rollNumber
   })

   studentReg.save()
        .then(() => {
            console.log("Data saved successfully");
            res.send("Registration Successful!");
        })
        .catch((error) => {
            console.log(`Error saving data: ${error}`);
            res.status(500).send("Internal Server Error");
        });
})

app.post('/adminpanel',(req,res)=>{
if(req.body.username=="admin" && req.body.password=="admin"){
      res.sendFile(process.cwd() + '/form.html')
}else{
    res.send("Invalid username or password")
}
})
app.get('/adminpanel',((req,res)=>{
    const searchName = req.query.search;
/*
    if (!searchName) {
        return res.status(400).json({ error: 'Search parameter is required' });
    }*/

    studentModel.find({student_name: searchName})
        .then((foundStudents) => {
            if(!foundStudents){
                res.send("Student Name Does not exist in our Database")
            }else{
                res.json(foundStudents);
            }
        })
        .catch((error) => {
            console.log(`Error searching for students: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}))
app.listen(port,()=>{
    console.log(`Listening from ${port}`)
})
