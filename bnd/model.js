let Mongoose=require("mongoose")

let Schema=new Mongoose.Schema({
    username:{
        type:String,
        required:true
    },
     password:{
        type:String,
        required:true
    },
})

let Model=Mongoose.model("Users",Schema)

module.exports=Model