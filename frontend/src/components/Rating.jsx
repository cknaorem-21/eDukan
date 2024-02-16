import React from 'react'
import { FaRegStar } from "react-icons/fa"; // empty star
import { FaStar } from "react-icons/fa"; // full star
import { FaStarHalfAlt } from "react-icons/fa"; // half star

const Rating = ({rating, reviewCount}) => {
  return (
    <>
        <div className='text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]'>
                <span> {rating >= 1 ? <FaStar className='inline text-yellow-500'/> : rating >= 0.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 2 ? <FaStar className='inline text-yellow-500'/> : rating >= 1.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 3 ? <FaStar className='inline text-yellow-500'/> : rating >= 2.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 4 ? <FaStar className='inline text-yellow-500'/> : rating >= 3.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                <span> {rating >= 5 ? <FaStar className='inline text-yellow-500'/> : rating >= 4.5 ? <FaStarHalfAlt className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
                
                { reviewCount>=0 && (
                  <div className='italic text-[0.8em] text-center'>
                    {reviewCount>1 ? (`(${reviewCount} reviews)`) : (`(${reviewCount} review)`)}
                  </div>
                )}
        </div>
    </>
  )
}

export default Rating