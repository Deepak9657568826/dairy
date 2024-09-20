import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './page/Homepage'
import Signpage from './page/SignupPage'
import Loginpage from './page/LoginPage'
import Order from './page/Order'
import ParticularOrder from './page/ParticularOrder'


function Allroutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signpage/>} />
        <Route path="/login" element={<Loginpage/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/particularOrder" element={<ParticularOrder/>} />
      </Routes>
    </div>
  )
}

export default Allroutes
