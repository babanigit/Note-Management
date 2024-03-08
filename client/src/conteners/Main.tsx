


import React, { ReactElement } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protection from '../components/protection/Protection';
import Register from '../pages/0regLog/Register';
import Login from '../pages/0regLog/Login';
import Home from '../pages/1home/Home';
import Splash from '../components/0splash/Splash';
import About from '../pages/2about/About';

const Main = ():ReactElement => {
  return (
    <>
     <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/splash" element={<Splash />} />

          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/about" element={<About/>} />

          {/* <Route path="/aboutUs" element={<AboutUs/>}/> */}

          <Route path="/aboutUs" element={<Protection />}>
            <Route path="/aboutUs" element={<About/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Main