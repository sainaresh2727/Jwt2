require('dotenv').config()
let Mongoose=require("mongoose")

function Db(){
    Mongoose.connect(process.env.URI)
    .then(()=>{
        console.log("Db Connected");
    }).catch(()=>{
        console.log("Db Not Connected");
        
    })
}

module.exports=Db