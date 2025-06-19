import React, { useContext } from 'react'
import freshlogo from '../../assets/images/freshcart-logo.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import Login from './../Login/Login';
import { AuthContextObj } from '../../context/AuthContext';
import Categories from './../Categories/Categories';
import Home from './../Home/Home';
import { cartContext } from '../../context/CartContext';




export default function Navbar() {

  const {userToken,setuserToken}=useContext(AuthContextObj)

  const {numOfCartItems}=useContext(cartContext)
  const navigate=useNavigate()

  function hundleLogout(){
    console.log('logged out');
    localStorage.removeItem('tkn')
    setuserToken(null)
    navigate('/Login')
    
  }




  return (
    <nav className=' bg-emerald-500 shadow-md'>
      <div className='flex justify-between p-3 items-center  container mx-auto'>
        
      <div className=' flex space-x-4'>
        <Link to='/Home'>
        <img src={freshlogo} alt="fresh cart" />
        </Link>

        {userToken?<ul className='flex items-center space-x-4'>
          <li>
            <NavLink to='/Home' className="hover:text-gray-200">Home</NavLink>
          </li>
          <li>
            <NavLink to='/Products' className="hover:text-gray-200">Products</NavLink>
          </li>
          <li>
            <NavLink to='/Categories' className="hover:text-gray-200">Categories</NavLink>
          </li>
          <li>
            <NavLink to='/' className="hover:text-gray-200">Brands</NavLink>
          </li>
        </ul>:''}


        
      </div>

      <div className='flex gap-3 '>
        <ul className=' flex items-center gap-3'>
          {userToken?
           <li>
         <Link to='/Cart' className='relative flex items-center justify-center p-2 transition-transform transform hover:scale-110'>
          <i className="fa-solid fa-cart-shopping text-2xl text-gray-800 "></i>
          <span className='absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md'>{numOfCartItems}</span>
          </Link>
          </li>:''}
        
          <li>
          <i className="fa-brands cursor-pointer fa-facebook hover:text-gray-200"></i>
          </li>
          <li>
          <i className="fa-brands cursor-pointer fa-twitter hover:text-gray-200"></i>
          </li>
          <li>
          <i className="fa-brands cursor-pointer fa-instagram hover:text-gray-200"></i>
          </li>
          <li>
          <i className="fa-brands cursor-pointer fa-tiktok hover:text-gray-200"></i>
          </li>
          <li>
          <i className="fa-brands cursor-pointer fa-linkedin hover:text-gray-200"></i>
          </li>
          
         
          
        </ul>
        <ul className='flex items-center gap-2' > 
          {userToken?<li>
            <span className='cursor-pointer bg-white text-emerald-500 px-3 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors' onClick={hundleLogout}>Logout</span>
          </li>:
          <><li>
            <NavLink to='/Register' className="text-white hover:text-gray-200">Register</NavLink>
          </li>
          <li>
            <NavLink to='/Login' className="text-white hover:text-gray-200">Login</NavLink>
          </li>
          </>}
          
          
        </ul>
       

      </div>
      </div>
    
    
    </nav>
  )
}
