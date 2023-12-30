import React from 'react'
import products from '../assets/products'
import Product from '../components/Product'

const HomeScreen = () => {
  return (
    <>
        <h1 className='text-lg font-bold my-3'>Latest products</h1>

        {/* tiles container */}
        <div className='flex flex-wrap justify-center gap-3 w-full'>
            {products.map((product) => (
                <Product key={product._id} product={product}/>
            ))}
            {/* tiles */}
        </div>
    </>
  )
}

export default HomeScreen