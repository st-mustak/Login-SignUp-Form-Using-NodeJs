const mongoose=require('mongoose');
const connectDatabase=async()=>{
    try {
        const con=await mongoose.connect('mongodb://localhost:27017/nodejstutorial');
        console.log("DATABASE CONNECTED");
    } catch (er) {
        console.log(er);
    }
}
module.exports=connectDatabase;