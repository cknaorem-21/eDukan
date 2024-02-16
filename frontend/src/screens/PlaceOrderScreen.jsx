import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast, Flip } from "react-toastify"; 
import Loader from "../components/Loader";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        transition: Flip,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] flex flex-col gap-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="flex flex-wrap justify-between gap-2">
          <div className="w-full md:w-[69%] space-y-2">
            {/* Shipping details */}
            <div className="space-y-3 border border-gray-300 p-2 rounded">
              <h2 className="text-[1.5em] font-bold">Shipping</h2>
              <div>
                <span className="font-semibold">Address: </span>
                <span>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city},
                  PIN: {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </span>
              </div>
            </div>

            {/* Payment method */}
            <div className="space-y-3 border border-gray-300 p-2 rounded">
              <h2 className="text-[1.5em] font-bold">Payment</h2>
              <div>
                <span className="font-semibold">Method: </span>
                <span>{cart.paymentMethod}</span>
              </div>
            </div>

            {/* Order items */}
            <div className="space-y-3 border border-gray-300 p-2 rounded">
              <h2 className="text-[1.5em] font-bold">Order items</h2>

              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 justify-between border border-gray-300 rounded"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded h-[100px] aspect-square object-contain m-1"
                      />
                      <div>
                        <Link to={`/product/${item._id}`} className="underline">
                          {item.name}
                        </Link>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <table className="w-full md:w-[10rem]">
                        <tbody className="whitespace-nowrap">
                          <tr className="odd:bg-gray-100 even:bg-gray-200">
                            <th className="text-left px-1">Price: </th>
                            <td className="text-right px-1">&#8377; {Number(item.price).toLocaleString('en-IN')}</td>
                          </tr>
                          <tr className="odd:bg-gray-100 even:bg-gray-200">
                            <th className="text-left px-1">Qty: </th>
                            <td className="text-right px-1">{item.quantity}</td>
                          </tr>
                          <tr className="odd:bg-gray-100 even:bg-gray-200">
                            <th className="text-left px-1">Total: </th>
                            <td className="text-right px-1">&#8377; {Number(item.quantity * item.price).toLocaleString('en-IN')}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full md:w-[28%] lg:w-[29%] h-fit shadow-lg border border-gray-400 rounded-md p-4">
            <div className="text-center text-[1.25em] font-semibold">
              Order Summary
            </div>
            
            <hr className="border-1-2 border-gray-300" />

            <table className="w-full">
              <tbody>
              <tr className="odd:bg-gray-100 even:bg-gray-200">
                <td className="text-left px-1">Total item(s): </td>
                <td className="text-right font-semibold px-1">{cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}</td>
              </tr>

              <tr className="odd:bg-gray-100 even:bg-gray-200">
                <td className="text-left px-1">Total price: </td>
                <td className="text-right font-semibold whitespace-nowrap px-1">&#8377; {Number(cart.itemsPrice).toLocaleString('en-IN')}</td>
              </tr>

              <tr className="odd:bg-gray-100 even:bg-gray-200">
                <td className="text-left px-1">Shipping price: </td>
                <td className="text-right font-semibold whitespace-nowrap px-1">&#8377; {Number(cart.shippingPrice).toLocaleString('en-IN')}</td>
              </tr>

              <tr className="odd:bg-gray-100 even:bg-gray-200">
                <td className="text-left px-1">Tax: </td>
                <td className="text-right font-semibold whitespace-nowrap px-1">&#8377; {Number(cart.taxPrice).toLocaleString('en-IN')}</td>
              </tr>

              <tr className="odd:bg-gray-100 even:bg-gray-200">
                <td className="text-left px-1">Grand total: </td>
                <td className="text-right font-semibold whitespace-nowrap px-1">&#8377; {Number(cart.totalPrice).toLocaleString('en-IN')}</td>
              </tr>
              </tbody>
              
            </table>


            <hr className="border-1-2 border-gray-300" />
            <div className="mt-1">
              <button
                className="flex justify-center gap-2 w-full bg-gray-800 rounded text-white font-bold p-2"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
                {isLoading && (
                  <div className="h-5 w-5">
                    <Loader />
                  </div>
                )}
              </button>
              {error && <p>Error: {error.data.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
