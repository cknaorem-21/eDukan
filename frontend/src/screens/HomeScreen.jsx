import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await axios.get('/api/products')
        setProducts(response.data);  
      } catch(error) {
        console.log(error)
      }
    }
    
    fetchProducts();
  }, [])

  console.log(products);
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