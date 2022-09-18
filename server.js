const express=require('express');
const connectDatabase=require('./database');
const User=require('./model/user');
const bcryptJs=require('bcryptjs');
var bodyParser = require('body-parser')
const app=express();
const PORT=5000;
connectDatabase();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send("HI I AM MUSTAK FROM EXPRESS");

})
app.post('/signup',async(req,res)=>{
    try {
    const hashedPassword=await bcryptJs.hash(req.body.password,10);
    const newUser=await User.create({...req.body,password:hashedPassword});
    
    res.json(newUser);
    } catch (error) {
        console.log(error);
    }
})
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.send("Invalid email or password");
    }
    const isMatch=await bcryptJs.compare(password,user.password);
    if(!isMatch){
       return  res.send("Invalid email or password");
    }
    res.send("Log in Successfull");
})

app.listen(PORT);
