import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/SignUp' element={<Signup/>} />
    <Route path='/Home' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App