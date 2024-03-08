


import React, { ReactElement } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protection from '../components/protection/Protection';
import Register from '../pages/0regLog/Register';
import Login from '../pages/0regLog/Login';
import Home from '../pages/1home/Home';
import Splash from '../components/0splash/Splash';
import About from '../pages/2about/About';

import Login2 from '../pages/0regLog/Login2'
import Sorry from '../components/protection/Sorry';
import NotFoundPage from '../pages/3notFound/NotFoundPage';


const Main = ():ReactElement => {
  return (
    <>
     <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/splash" element={<Splash />} />
          <Route path="/sorry" element={<Sorry />} />
          <Route path="*" element={<NotFoundPage />}
            />



          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/login2" element={<Login2/>} />

         
          <Route path="/home" element={<Protection />}>
          <Route path="/home" element={<Home />} />
          </Route>
          
          <Route path="/about" element={<Protection />}>
            <Route path="/about" element={<About/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Main