import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"
import Rating from "../components/Rating"
import { useGetProductDetailsQuery } from "../slices/productsApiSlice"
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import QuantityPicker from "../components/QuantityPicker";

const ProductScreen = () => {
  const { id: productId } = useParams()
  
  const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);

  const [quantity, setQuantity] = useState(1)
  
  // quantity - input field out-of-focus handling
  const handleInputOnBlur = () => {
    const newQuantity = isNaN(quantity) || quantity <= 0 ? 1 : quantity 
    setQuantity(newQuantity);
  }

  // handling quantity
  const handleQuantity = (e) => {
    const name = e.target.name

    
    if(name === 'input') {
      if(e.target.value === '') {
        setQuantity('')
      } else {
        setQuantity(Number(e.target.value))
      }
    }
    // decrement button
    else if(name === 'decrement') { 
      if(quantity > 1)
        setQuantity((prev) => Number(prev-1))
      else {
        console.log('Minimum order quantity is 1 unit');
      }
    }
    // increment button
    else {
      if(quantity < product.countInStock)
        setQuantity((prev) => Number(prev+1))
      else {
        console.log("maximum stock limit excedded");
      }
    }
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const addToCartHandler = () => {
    console.log("add to cart button clicked")
    dispatch(addToCart({...product, quantity}))
    navigate('/cart')
  }

  return (
    <>
        <div className='w-full'>
          <Link to='/'>
            <button className='bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3'>Go Back</button>
          </Link>
        </div>

        { isLoading ? (
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

          {/* Price, Status, Quantity, Add to cart */}
          <div className='w-[33%] h-fit border border-gray-200 rounded'>
            <div className='w-full border-b border-gray-200 p-2'>
              Price : <span className='font-medium'>&#8377; {product.price}</span>
            </div>
            <div className='w-full border-b border-gray-200 p-2'>
              Status : <span className='font-medium'>{product.countInStock >=1 ? 'In Stock': 'Out of Stock'}</span>
            </div>
            <div className='w-full border-b border-gray-200 p-2'>
              Quantity :
              {/* Quantity picker */} 
              <div className="px-2 inline">
                <button name="decrement" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={handleQuantity}>-</button>
                <input name="input" className="w-10 border text-center" type="text" min="1" value={isNaN(quantity) || quantity <= 0 ? '' : quantity} onChange={handleQuantity} onBlur={handleInputOnBlur}/>
                <button name="increment" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={handleQuantity}>+</button>
              </div>  
            </div>
            <div className='p-2 text-center'>
              <button 
              className={`${product.countInStock>=1? 'bg-yellow-400 hover:bg-yellow-300': 'bg-gray-300 opacity-70'} border rounded p-2`}
              onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>

          </div>
      </div>
        ) }

        
        
        
    </>
  )
}

export default ProductScreen