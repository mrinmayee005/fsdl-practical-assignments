const e=require("express");
const m=require("mongoose");

const app=e();
app.use(e.json());
app.use(e.static("public"));

m.connect("mongodb://127.0.0.1:27017/test")
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err));

const U=m.model("U",{name:String,email:String});

app.post("/s", async(req,res)=>{
    await U.create(req.body);
    res.send("ok");
});

app.get("/g", async(req,res)=>{
    res.json(await U.find());
});

app.listen(3000);