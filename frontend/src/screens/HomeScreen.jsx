import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Product from '../components/Product'

import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try{
  //       const response = await axios.get('/api/products')
  //       setProducts(response.data);  
  //     } catch(error) {
  //       console.log(error)
  //     }
  //   }
    
  //   fetchProducts();
  // }, [])

  // console.log(products);

  const { data: products, isLoading, error} = useGetProductsQuery();

  return (
    <>

      { isLoading ? (
        <h2 className='text-lg font-bold'>Loading.....</h2>
      ) : error ? (
        <div>
          {error?.data?.message || error.error}
        </div>
      ) : (
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
      )}
        
    </>
  )
}

export default HomeScreen