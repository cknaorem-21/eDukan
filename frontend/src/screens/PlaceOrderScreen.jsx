import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";
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
      toast.error(error.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="flex justify-between gap-3">
          <div className="w-[70%] space-y-2">
            {/* Shipping details */}
            <div className="space-y-3 border border-gray-300 p-2 rounded">
              <h2 className="text-2xl font-bold">Shipping</h2>
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
              <h2 className="text-2xl font-bold">Payment</h2>
              <div>
                <span className="font-semibold">Method: </span>
                <span>{cart.paymentMethod}</span>
              </div>
            </div>

            {/* Order items */}
            <div className="space-y-3 border border-gray-300 p-2 rounded">
              <h2 className="text-2xl font-bold">Order items</h2>

              {cart.cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 justify-between border border-gray-300 rounded pr-1"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded h-[100px] m-1"
                      />
                      <div>
                        <Link to={`/product/${item._id}`} className="underline">
                          {item.name}
                        </Link>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="text-center divide-y">
                        <p className="font-semibold p-1">Unit Price</p>
                        <p className="p-1">&#8377; {item.price}</p>
                      </div>

                      <div className="text-center divide-y divide-gray-300">
                        <p className="font-semibold p-1">Quantity</p>
                        <p className="p-1">{item.quantity}</p>
                      </div>

                      <div className="text-center divide-y">
                        <p className="font-semibold p-1">Total</p>
                        <p className="p-1">{item.quantity * item.price}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[30%] h-fit shadow-lg border border-gray-400 rounded-md m-1 p-4">
            <div className="text-center text-xl font-semibold">
              Order Summary
            </div>
            <hr className="border-1-2 border-gray-300" />
            <div className="">
              <span className="font-semibold">Total items: </span>
              {cart.cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>

            <div className="">
              <span className="font-semibold">Total Price: </span>
              &#8377;{cart.itemsPrice}
            </div>

            <div className="">
              <span className="font-semibold">Shipping Price: </span>
              &#8377;{cart.shippingPrice}
            </div>

            <div className="">
              <span className="font-semibold">Tax: </span>
              &#8377;{cart.taxPrice}
            </div>

            <div className="">
              <span className="font-semibold">Grand total: </span>
              &#8377;{cart.totalPrice}
            </div>

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
