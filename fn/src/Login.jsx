import React from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  let [Signname,setSignname]=useState("")
  let [SignPass,setSignPass]=useState("")
  let Navigate=useNavigate()
  
  async function Login(e) {
    e.preventDefault()
    try{
      let Logindata=await Axios.post('http://localhost:8000/LoginData',{Signname,SignPass})
      alert(Logindata.data.message)
      Navigate('/Home')
      localStorage.setItem("token",Logindata.data.Token)
      console.log(Logindata.data.Token);
      
    }
    catch(err){
      console.log(err.response?.data?.message||err.message);
      
    }
  }
  return (
   <>
    <form onSubmit={(e)=>Login(e)}>
    <input type="text"  onChange={(e)=>setSignname(e.target.value)} value={Signname}/>  <br /> <br />
    <input type="passsword" onChange={(e)=>setSignPass(e.target.value)} value={SignPass}  /> <br /> <br />
    <input type="submit" />
   </form>
   </>
  )
}

export default Login