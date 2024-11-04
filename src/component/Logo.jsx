import React from 'react'
import logo from '../assets/572.png'

const Logo = ({width= "65px" }) => {
  return (
    <div ><img style={{width:`${width}`}} className=' rounded-xl w-full' src= {logo} alt="" /></div>
  )
}

export default Logo