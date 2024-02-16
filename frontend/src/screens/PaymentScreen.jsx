import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state => state.cart));
  const { shippingAddress } = cart;

  useEffect(()=>{
    if(!shippingAddress) {
        navigate('/shipping');
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')
  }

  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] space-y-6">
        <CheckoutSteps step1 step2 step3 />
        <div className="flex justify-center">
          <div className="space-y-4 w-full md:w-[70%] lg:w-[50%] border border-gray-300 shadow-md rounded p-3">
            <h1 className="text-center text-[1.5em] font-extrabold">Payment</h1>

            <h1>Choose Payment Method</h1>

            <form onSubmit={ submitHandler }>
              <div className="flex flex-col gap-3">
                <div>
                  <input
                    name="paymentMethod"
                    id="paypal"
                    type="radio"
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor="paypal">PayPal or Credit Card</label>
                </div>

                <button
                  type="submit"
                  className="bg-gray-800 rounded text-white font-bold p-2 w-full"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
