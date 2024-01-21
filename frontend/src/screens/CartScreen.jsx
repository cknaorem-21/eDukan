import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrashCan } from "react-icons/fa6";
import { addToCart } from '../slices/cartSlice';
import QuantityPicker from '../components/QuantityPicker';

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart;

  const handleInputOnBlur = (e, product) => {
    const quantity = e.target.value
    const newQuantity = "" || e.target.value <= 0 ? 1 : Number(quantity)
    dispatch(addToCart({...product, quantity: newQuantity}))
  }

  const handleQuantity = (e, product) => {
    const name = e.target.name
    const quantity = Number(e.target.value)
    console.log("qqq", quantity, typeof quantity)
    
    if(name === 'input') {
      if(e.target.value === '') {
        dispatch(addToCart({...product, quantity:0}))
      } else {
        dispatch(addToCart({...product, quantity}))
        e.target.value = quantity
      }
    }
    // decrement button
    else if(name === 'decrement') { 
      if(product.quantity > 1)
        dispatch(addToCart({...product, quantity:product.quantity-1}))
      else
        console.log('Minimum order quantity is 1 unit');
    }
    // increment button
    else {
        console.log(product)
      if(product.quantity < product.countInStock)
        dispatch(addToCart({...product, quantity:product.quantity+1}))
      else 
        console.log("maximum stock limit excedded");
    }
  }

  return (
    <>
        <div>
            <h1 className='text-2xl font-bold pb-4'>Shopping Cart</h1>
        </div>

        {
            cartItems.length === 0 ? (
                <>
                    <div className='text-lg text-blue-800 bg-blue-200 border rounded my-3 border-blue-400 p-4'>
                        Your cart is empty
                    </div>
                    <Link to='/'>
                        <button className='bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3'>Go Back</button>
                    </Link>
                    
                </>
            ):(
                <>
                    <div className='flex space-x-3'>
                        <div className='w-3/4'>
                            {console.log("cartitems ", cartItems)}
                            {/* Product tile */}
                            {
                                cartItems.map((item) => (
                                    <div key={item._id} className='flex gap-4 border h-fit w-full border-gray-300 rounded-md m-1'>
                                        <img src={item.image} alt={item.name} className='rounded h-[100px] m-1'/>
                                        <div className='flex items-center w-60'>
                                            <Link to={`/product/${item._id}`} className='underline'>{item.name}</Link>
                                        </div>
                                        <div className='flex items-center font-medium min-w-28'>
                                        &#8377; {item.price}
                                        </div>
                                        <div className='flex items-center'>
                                            {/* Quantity picker */}
                                            <div className="px-2 inline">
                                                <button name="decrement" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={(e) => handleQuantity(e, item)}>-</button>
                                                <input name="input" className="w-10 border text-center" type="text" min="1" value={isNaN(item.quantity) || item.quantity <= 0 ? '' : item.quantity} onChange={(e) => handleQuantity(e, item)} onBlur={(e) => handleInputOnBlur(e, item)}/>
                                                <button name="increment" className="w-8 bg-gray-100 border active:bg-gray-200" onClick={(e) => handleQuantity(e, item)}>+</button>
                                            </div>    
                                        </div>
                                        <div className='flex items-center'>
                                            <button className='flex gap-1 items-center border border-gray-300 bg-gray-200 rounded p-1 hover:bg-gray-300'>
                                                <span className='text-sm'>Delete</span>
                                                <FaTrashCan className='text-[15px] text-gray-700 border'/> 
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex flex-col gap-2 w-1/4 h-fit shadow-lg border border-gray-400 rounded-md m-1 p-4'>
                            <div className='text-center text-xl font-semibold'>Subtotal</div>
                            <hr className='border-1-2 border-gray-300'/>
                            <div className=''>
                                Total items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
                            </div>
                            <div className=''>
                                Total Price: &#8377; {cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                            </div>
                            <hr className='border-1-2 border-gray-300'/>
                            <div className='mt-1'>
                                <button className='border rounded bg-gray-800 px-3 py-1 text-gray-100 hover:bg-gray-900' disabled={cartItems.length === '0'}>
                                    Proceed to checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        
    </>
  )
}

export default CartScreen