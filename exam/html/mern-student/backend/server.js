const express=require("express")
const mongoose = require("mongoose")
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb");


const Student=mongoose.mongoose.model("Student",
    {
        name:String,
        email:String
    }
);
//create
app.post("/add",async(req,res)=>{
    res.json(await Student.create(req.body));
});

//read
app.get("/get",async(req,res)=>{
    res.json(await Student.find());
});

//delete
app.delete("/delete/:id",async(req,res)=>{
    res.json(await Student.findByIdAndDelete(req.params.id));
});

app.listen(5000);