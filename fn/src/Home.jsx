import React, { useEffect } from 'react'
import Axios from 'axios'

function Home() {


  async function HomeAccess() {

    let Token=localStorage.getItem("token")

    try{
      let GetAccess=await Axios.get('http://localhost:8000/acccessRoute',{
        headers:{
          Authorization:`Bearer ${Token}`

        }
      })
      console.log(GetAccess.data.message);
      
    }
    catch(err){
      console.log(err.response?.data?.message||err.message);
      
    }
  }

  useEffect(()=>{
    HomeAccess()
  },[])
  return (
    <>
    <h1>WELCOME TO HOME PAGE</h1>
    </>
  )
}

export default Home