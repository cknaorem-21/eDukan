import React from 'react'
import { FaRegStar } from "react-icons/fa"; // empty star
import { FaStar } from "react-icons/fa"; // full star

const Rating = ({rating, setRating}) => {
  const ratingHandler = (e) => {
    const value = e.currentTarget.dataset.value;
    setRating(Number(value))

  }

  return (
    <>
        <div>
            <span data-value='1' onClick={ ratingHandler }> {rating >= 1 ? <FaStar className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
            <span data-value='2' onClick={ ratingHandler }> {rating >= 2 ? <FaStar className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
            <span data-value='3' onClick={ ratingHandler }> {rating >= 3 ? <FaStar className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
            <span data-value='4' onClick={ ratingHandler }> {rating >= 4 ? <FaStar className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
            <span data-value='5' onClick={ ratingHandler }> {rating >= 5 ? <FaStar className='inline text-yellow-500'/> : <FaRegStar className='inline text-gray-400'/>} </span>
        </div>
    </>
  )
}

export default Rating