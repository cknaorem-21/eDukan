import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    console.log("submit");
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <div className='space-y-6'>
      <CheckoutSteps step1 step2/>
      <div className="flex justify-center">
        <div className="w-[40%] border border-gray-300 shadow-md rounded p-3">
          <h1 className="text-center text-2xl font-extrabold">Shipping</h1>

          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="address" className="text-gray-700 ">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="city" className="text-gray-700 ">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="postalCode" className="text-gray-700 ">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  type="text"
                  placeholder="Enter postal code / PIN code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="country" className="text-gray-700 ">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gray-800 rounded text-white font-bold p-2"
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

export default ShippingScreen;
