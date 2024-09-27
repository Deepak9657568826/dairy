import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './page/Homepage'
import Signpage from './page/SignupPage'
import Loginpage from './page/LoginPage'
import Order from './page/Order'
import ParticularOrder from './page/ParticularOrder'
import UserProfile from './page/UserProfile'
import AddProduct from './page/AddProduct'
import ParticularProduct from './page/ParticularProduct'


function Allroutes() {

  const ScrollToTop = () => {
    const { pathname } = useLocation();  
  
    useEffect(() => {
      window.scrollTo(0, 0);  
    }, [pathname]);
  
    return null;  
  };
  
  return (
    <div>
        <ScrollToTop/> 
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signpage/>} />
        <Route path="/login" element={<Loginpage/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/particularOrder" element={<ParticularOrder/>} />
        <Route path="/Profile" element={<UserProfile/>} />
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/product/:id" element={<ParticularProduct/>} />
      </Routes>
    </div>
  )
}

export default Allroutes
