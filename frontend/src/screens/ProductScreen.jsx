import { Link, useParams } from "react-router-dom"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from "../slices/productsApiSlice"

const ProductScreen = () => {
  const { id: productId } = useParams()
  
  const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);

  return (
    <>
        <div className='w-full'>
          <Link to='/'>
            <button className='bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3'>Go Back</button>
          </Link>
        </div>

        {isLoading ? (
          <h2>Loading......</h2>
        ) : error ? (
          <div>
            {error?.data?.message || error.error}
          </div>
        ) : (
          <div className='flex justify-between w-full '>
          {/* Image */}
          <div className='w-[33%] h-fit border border-gray-200 rounded p-2'>
            <img src={product.image} alt="image" />
          </div>

          {/* Title, Rating, Description */}
          <div className='w-[33%] p-3 border border-gray-200 rounded'>
            {/* Title */}
            <h2 className='text-lg font-medium'>
              {product.name}
            </h2>
            <div className="my-2">
              <Rating rating={product.rating} reviewCount={product.numReviews}/>
            </div>
            <p>
              {product.description}
            </p>
            {}
          </div>

          {/* Price, Status, Add to cart */}
          <div className='w-[33%] h-fit border border-gray-200 rounded'>
            <div className='w-full border-b border-gray-200 p-2'>
              Price : <span className='font-medium'>&#8377; {product.price}</span>
            </div>
            <div className='w-full border-b border-gray-200 p-2'>
              Status : <span className='font-medium'>{product.countInStock >=1 ? 'In Stock': 'Out of Stock'}</span>
            </div>
            <div className='p-2 text-center'>
              <button className={`${product.countInStock>=1? 'bg-yellow-400 hover:bg-yellow-300': 'bg-gray-300 opacity-70'} border rounded p-2`}>Add to cart</button>
            </div>

          </div>
      </div>
        ) }

        
        
        
    </>
  )
}

export default ProductScreen