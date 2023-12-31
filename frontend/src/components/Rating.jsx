import React from 'react'
import { FaRegStar } from "react-icons/fa"; // empty star
import { FaStar } from "react-icons/fa"; // full star
import { FaStarHalfAlt } from "react-icons/fa"; // half star

const Rating = ({rating, reviewCount}) => {
  return (
    <>
        <div>
                <span> {rating >= 1 ? <FaStar className='inline text-yellow-500'/> : rating >= 0.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 2 ? <FaStar className='inline text-yellow-500'/> : rating >= 1.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 3 ? <FaStar className='inline text-yellow-500'/> : rating >= 2.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 4 ? <FaStar className='inline text-yellow-500'/> : rating >= 3.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 5 ? <FaStar className='inline text-yellow-500'/> : rating >= 4.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                
                <span className='italic text-sm'>
                    {`(${reviewCount} reviews)`}
                </span>
        </div>
    </>
  )
}

export default Rating