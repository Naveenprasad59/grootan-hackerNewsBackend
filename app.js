const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
mongoose.connect("mongodb+srv://admin-naveen:naveen123@cluster0.xqcak.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/hackerNewsDB",{ useNewUrlParser: true ,useUnifiedTopology: true})
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

const userModel = mongoose.model("user",userSchema);

app.get("/",function(req,res){
  res.send("Hii");
})

app.post("/login",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  userModel.findOne({username: username},function(err,user) {
    if(err){
      console.log(err);
      res.send({success: false})
    }else{
       console.log(user);
       if(user.password === password && user.username === username){
         res.send({success: true})
       }else{
         res.send({success: false})
       }
    }
  })
})

app.post("/register",(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  const newUser = userModel({
    username: username,
    password: password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
      res.send({success: false})
    }else{
      console.log("registered");
      res.send({success: true})
    }
  });

})




const PORT_NUM = process.env.PORT|| 8000;
app.listen(PORT_NUM,()=>{
    console.log(`Server started at port ${PORT_NUM}`);
})
