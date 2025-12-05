import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  let [username,setusername]=useState("")
  let [password,setpassword]=useState("")
  let Navigate=useNavigate()
  async function SignUp(e) {
    e.preventDefault()
    try{
        let Signusers=await Axios.post('http://localhost:8000/signupUsers',{username,password})
        alert(Signusers.data.message)
        setusername("")
        setpassword("")
        Navigate('/')
    }
    catch(err){
        console.log(err.response?.data?.message||err.message);
        
    }
  }
  return (
   <>
   <form onSubmit={(e)=>SignUp(e)}>
   <input type="text" onChange={(e)=>setusername(e.target.value)} value={username}/> <br /><br />
   <input type="password" onChange={(e)=>setpassword(e.target.value)} value={password}/> <br /><br />
   <input type="submit" /> <br /><br />
   </form>
   </>
  )
}

export default Signup 