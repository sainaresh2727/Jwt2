require("dotenv").config()

let Express=require("express")
let Cors=require('cors')

let App=Express()
App.use(Express.json())
App.use(Cors())

let Db=require('./db')
Db()

let Model=require('./model')
let Bcrypt=require("bcrypt")

App.post('/signupUsers',async (req,res)=>{
    let {username,password}=req.body
    try{

        let SaltRound=10
        let Gensalt=await Bcrypt.genSalt(SaltRound)
        let HashPassword=await Bcrypt.hash(password,Gensalt)

        let NewUsers=new Model({username,password:HashPassword})
        await NewUsers.save()
        res.status(201).json({
            success:true,
            message:"Data Added Successfully"
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
})

let Jwt=require("jsonwebtoken")

App.post("/LoginData",async (req,res)=>{
    let {Signname,SignPass}=req.body
    try{
        let UsersFind=await Model.findOne({username:Signname})
        if(!UsersFind){
            return res.status(404).json({
                success:false,
                message:"Invalid User"
            })
        }

        let PasswordCompare=await Bcrypt.compare(SignPass,UsersFind.password)

        if(!PasswordCompare){
            return res.status(404).json({
                success:false,
                message:"Invalid Password"
            })
        }

        let GenerateToken=Jwt.sign( { username: UsersFind.username, id: UsersFind._id },
        process.env.SECRETKEY,
        { expiresIn: "1h" })

        res.status(200).json({
            success:true,
            message:"Login Successfull",
            Token:GenerateToken
        })
    }
    catch(err){
        res.status(404).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
})

function AuthMiddleware(req, res, next) {
  let authHeader = req.headers["authorization"];

   let token = authHeader.split(" ")[1];

    if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }

  try {
    const decoded = Jwt.verify(token, process.env.SECRETKEY);

    req.user = decoded; // 🔥 next route ku send panrom
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}


App.get("/acccessRoute", AuthMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

App.listen(process.env.PORT,()=>{
    console.log("Server Running Successfully");
    
})