import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='flex justify-between items-center w-full h-[4rem] bg-gray-800 p-8'>
        <Link to='/' className='text-white h-fit w-fit'>
            <FiShoppingBag className='inline text-[2rem]'/>
            <span className='p-2'>eDUKAN</span>
        </Link>
        <nav className='text-white flex gap-4'>
            <NavLink to='/cart' activeClassName='text-red-500'>
                <FaShoppingCart className='inline'/>
                <span className='p-1'>Cart</span>
            </NavLink>
            <NavLink to='/signin' activeClassName='text-red-500'>
                <FaUser className='inline'/>
                <span className='p-1'>Sign in</span>
            </NavLink>
        </nav>
    </header>
  )
}

export default Header