import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <>
      <div className='flex flex-col justify-center items-center w-full bg-gray-300 p-2'>
        <p>eDUKAN &copy; {currentYear}</p>
        <p className='italic text-sm text-gray-800'>All rights reserved</p>
      </div>
      </>
    )
}

export default Footer