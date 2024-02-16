import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashCan } from "react-icons/fa6";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleInputOnBlur = (e, product) => {
    const quantity = e.target.value;
    const newQuantity = "" || e.target.value <= 0 ? 1 : Number(quantity);
    dispatch(addToCart({ ...product, quantity: newQuantity }));
  };

  const handleQuantity = (e, product) => {
    const name = e.target.name;
    const quantity = Number(e.target.value);

    if (name === "input") {
      if (e.target.value === "") {
        dispatch(addToCart({ ...product, quantity: 0 }));
      } else {
        dispatch(addToCart({ ...product, quantity }));
        e.target.value = quantity;
      }
    }
    // decrement button
    else if (name === "decrement") {
      if (product.quantity > 1)
        dispatch(addToCart({ ...product, quantity: product.quantity - 1 }));
      else console.log("Minimum order quantity is 1 unit");
    }
    // increment button
    else {
      console.log(product);
      if (product.quantity < product.countInStock)
        dispatch(addToCart({ ...product, quantity: product.quantity + 1 }));
      else console.log("maximum stock limit excedded");
    }
  };

  const handleRemoveFromCart = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]">
        <div>
          <h1 className="text-[1.5em] font-bold pb-4">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <>
            <div className="my-3">
              <Message color="blue">Your cart is empty</Message>
            </div>

            <Link to="/">
              <button className="bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3">
                Go Back
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="space-y-3 md:space-y-0 md:flex md:space-x-3">
              <div className="md:w-3/4 space-y-2">
                {/* Product tile */}
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-wrap gap-4 border h-fit w-full border-gray-300 rounded-md p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded h-[70px] md:h-[100px] object-contain aspect-square m-1 my-auto"
                    />

                    <div className="flex grow justify-between w-[50%]">
                      <div className="flex items-center">
                        <Link
                          to={`/product/${item._id}`}
                          className="underline p-3"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-between grow">
                      <div className="flex flex-nowrap p-2 justify-center items-center font-medium">
                        <p className="whitespace-nowrap">
                          {" "}
                          &#8377; {item.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="flex items-center">
                        {/* Quantity picker */}
                        <div className="px-2 w-max">
                          <button
                            name="decrement"
                            className="w-8 bg-gray-100 border active:bg-gray-200"
                            onClick={(e) => handleQuantity(e, item)}
                          >
                            -
                          </button>
                          <input
                            name="input"
                            className="w-10 border text-center"
                            type="text"
                            min="1"
                            value={
                              isNaN(item.quantity) || item.quantity <= 0
                                ? ""
                                : item.quantity
                            }
                            onChange={(e) => handleQuantity(e, item)}
                            onBlur={(e) => handleInputOnBlur(e, item)}
                          />
                          <button
                            name="increment"
                            className="w-8 bg-gray-100 border active:bg-gray-200"
                            onClick={(e) => handleQuantity(e, item)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {/* Delete button */}
                        <button
                          onClick={(e) => handleRemoveFromCart(item._id)}
                          className="flex gap-1 items-center border border-gray-300 bg-gray-200 rounded p-1 hover:bg-gray-300"
                        >
                          <span className="text-[0.875em]">Delete</span>
                          <FaTrashCan className="text-[1em] text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 md:w-1/4 h-fit shadow-lg border border-gray-400 rounded-md p-4">
                <div className="text-center text-[1.5em] font-semibold">
                  Subtotal
                </div>
                <hr className="border-1-2 border-gray-300" />
                <div className="">
                  <span className="font-semibold">Total items: </span>
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </div>
                <div className="">
                  <span className="font-semibold">Total Price: </span>
                  <span className="whitespace-nowrap">
                    &#8377;{" "}
                    {Number(
                      cartItems
                        .reduce(
                          (acc, item) => acc + item.quantity * item.price,
                          0
                        )
                        .toFixed(2)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
                <hr className="border-1-2 border-gray-300" />
                <div className="mt-1">
                  <button
                    className="border rounded bg-gray-800 px-3 py-1 text-gray-100 hover:bg-gray-900 w-full"
                    disabled={cartItems.length === "0"}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
