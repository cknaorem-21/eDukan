import React from 'react'
import { FiShoppingBag } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const { cartItems } = useSelector((state) => state.cart)
    // console.log(cartItems)
  return (
    <header className='flex justify-between items-center w-full h-[4rem] bg-gray-800 p-8'>
        <Link to='/' className='text-white h-fit w-fit'>
            <FiShoppingBag className='inline text-[2rem]'/>
            <span className='p-2'>eDUKAN</span>
        </Link>
        <nav className='text-white flex gap-4'>
            <NavLink to='/cart' className='relative pr-4'>
                <FaShoppingCart className='inline'/>
                <span className='p-1'>Cart</span>
                {
                    // console.log('cartItems.length ', cartItems.length)
                    cartItems.length > 0 &&
                    // Cart items badge
                    <div className='flex justify-center items-center absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full text-xs p-2'>
                        <div>
                            { cartItems.reduce((a, item) => a + item.quantity, 0)}
                        </div>
                    </div>
                }
            </NavLink>
            <NavLink to='/signin'>
                <FaUser className='inline'/>
                <span className='p-1'>Sign in</span>
            </NavLink>
        </nav>
    </header>
  )
}

export default Header