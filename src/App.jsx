import { useState } from 'react'
import conf from './conf/conf.js';
import { Header } from './component/index.js';
import {Footer} from './component/index.js';
import { useDispatch } from 'react-redux';
import {login,logout} from './store/authSlice'
import './App.css'
import { useEffect } from 'react';
import authService from './AppWrite/Auth.js';
import {Outlet} from 'react-router-dom'

function App() {
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else
      dispatch(logout())

    })
    .finally(()=>{
      setLoading(false)

    })
  },[])
  
  return !loading ?  ( 
  <div className=' min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
    <Header></Header>
    <main>
      <Outlet></Outlet>
    </main>
    <Footer></Footer>
    </div>
    
  </div> )
  : <h1>Loading.....</h1>;
}

export default App