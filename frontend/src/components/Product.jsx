import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <>
      <Link to={`/product/${product._id}`}>
        <div className='w-[300px] h-[350px] border rounded border-gray-200 p-2'>
            <div className='border rounded'>
                <img src={product.image} alt="image" />
            </div>
            <div>
                <strong>{product.name}</strong>
                <h3>&#8377; {product.price}</h3>
                <Rating rating={product.rating} reviewCount={product.numReviews}/>
            </div>
        </div>
      </Link>
    </>
  )
}

export default Product