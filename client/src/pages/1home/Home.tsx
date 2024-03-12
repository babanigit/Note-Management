

import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {

  function change() {
    localStorage.removeItem("token")
  }
  return (
    <>
    <div className=' h-screen grid place-items-center place-content-center '>

   
    <div>hello</div>
    <button 
    className=' border-2 rounded-md border-black p-2 bg-red-100'
    onClick={change} > <NavLink to={"/register"} >
    logout
      </NavLink> </button>
   
      </div>
    </>
  )
}

export default Home