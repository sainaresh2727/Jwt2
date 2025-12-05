import React, { useEffect, useState } from 'react'
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

  let [data,setdata]=useState([])
  async function GetUsers() {
    try{
      let Data=await Axios.get('http://localhost:8000/getUsers/')
      setdata(Data.data.data)
    }
    catch(err){
      
    }
  }
  async function DeleteFun(id) {
    try{
      let DeleteData=await Axios.delete(`http://localhost:8000/delete/${id}`)
      alert(DeleteData.data.message)
    }
    catch(err){

    }
  } 
  
  useEffect(()=>{
    GetUsers()
  },[])

  useEffect(()=>{
    HomeAccess()
  },[])
  return (
    <>

    <h1>WELCOME TO HOME PAGE</h1>
    {
      data.map((x,y)=>{
        return(
          <>
          <div key={y}>
          <h5>{x.username}</h5>
          <button onClick={()=>DeleteFun(x._id)}>DELETE</button>
          </div>
          </>
        )
      })
    }
    </>
  )
}

export default Home