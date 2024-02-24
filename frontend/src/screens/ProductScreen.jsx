import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
  productsApiSlice,
} from "../slices/productsApiSlice";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, Flip } from "react-toastify";
import RatingSelect from "../components/RatingSelect";
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  let itemInCart = cartItems.find((item) => item._id === productId);

  // quantity - input field out-of-focus handling
  const handleInputOnBlur = () => {
    const newQuantity = isNaN(quantity) || quantity <= 0 ? 1 : quantity;
    setQuantity(newQuantity);
  };

  // handling quantity
  const handleQuantity = (e) => {
    const name = e.target.name;

    if (name === "input") {
      if (e.target.value === "") {
        setQuantity("");
      } else {
        setQuantity(Number(e.target.value));
      }
    }
    // decrement button
    else if (name === "decrement") {
      if (quantity > 1) setQuantity((prev) => Number(prev - 1));
      else {
        console.log("Minimum order quantity is 1 unit");
      }
    }
    // increment button
    else {
      if (quantity < product.countInStock)
        setQuantity((prev) => Number(prev + 1));
      else {
        console.log("maximum stock limit excedded");
      }
    }
  };

  const dispatch = useDispatch();

  const cartButtonHandler = async () => {
    if(itemInCart) {
      dispatch(removeFromCart(productId));
      toast.success("Item removed from cart !", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      transition: Flip,
      theme: "colored",
      });
      itemInCart = null;
    } else {
      dispatch(addToCart({ ...product, quantity }));
      toast.success("Item added to cart !", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      transition: Flip,
      theme: "colored",
      });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted.");
      setRating(0);
      setComment("");
    } catch (error) {
      console.log(product.reviews);
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
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]">
        <div className="w-full">
          <Link to="/">
            <button className="bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3">
              Go Back
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="w-full h-[70vh]">
            <Loader />
          </div>
        ) : error ? (
          <div>{error?.data?.message || error.error}</div>
        ) : (
          <>
            <div className="space-y-3">
              <div className="space-y-3 md:space-y-0 md:flex justify-between w-full">
                {/* Image */}
                <div className="md:order-1 md:w-[33%] border border-gray-200 rounded">
                  <img src={product.image} alt="image" loading="lazy" />
                </div>

                {/* Title, Rating, Description */}
                <div className="order-3 md:order-2 md:w-[33%] p-3 border border-gray-200 rounded">
                  {/* Title */}
                  <h2 className="text-[1.125em] font-medium">{product.name}</h2>
                  <div className="my-2 w-fit">
                    <Rating
                      rating={product.rating}
                      reviewCount={product.numReviews}
                    />
                  </div>

                  <div className="md:h-[170px] lg:h-[300px] overflow-y-auto">
                    <p>{product.description}</p>
                  </div>
                </div>

                {/* Price, Status, Quantity, Add to cart */}
                <div className="order-2 md:order-3 md:w-[33%] h-fit border border-gray-200 rounded">
                  <div className="w-full border-b border-gray-200 p-2">
                    Price :{" "}
                    <span className="font-medium">
                      &#8377; {product.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="w-full border-b border-gray-200 p-2">
                    Status :{" "}
                    <span className="font-medium">
                      {product.countInStock >= 1 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="w-full border-b border-gray-200 p-2">
                    Quantity :{/* Quantity picker */}
                    <div className="px-2 inline">
                      <button
                        name="decrement"
                        className="w-8 bg-gray-100 border active:bg-gray-200"
                        onClick={handleQuantity}
                      >
                        -
                      </button>
                      <input
                        name="input"
                        className="w-10 border text-center"
                        type="text"
                        min="1"
                        value={isNaN(quantity) || quantity <= 0 ? "" : quantity}
                        onChange={handleQuantity}
                        onBlur={handleInputOnBlur}
                      />
                      <button
                        name="increment"
                        className="w-8 bg-gray-100 border active:bg-gray-200"
                        onClick={handleQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <button
                      className={`${
                        product.countInStock >= 1 && !itemInCart 
                          ? "bg-yellow-400 hover:bg-yellow-300"
                          : product.countInStock < 1 ? "bg-gray-300 opacity-70" :"bg-gray-300"
                      } border rounded p-2`}
                      onClick={cartButtonHandler}
                      disabled={ product.countInStock < 1 }
                    >
                      {itemInCart ? "Remove from cart" : "Add to cart"}
                    </button> 
                  </div>
                </div>
              </div>

              {/* Reviews & rating */}
              <div className="md:flex gap-2">
                {/* Write review */}
                <div className="md:w-1/2 space-y-2">
                  <div className="bg-gray-300 py-2 px-4 rounded">
                    <h2 className="text-[1.125em] font-semibold">
                      Write a review
                    </h2>
                  </div>

                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="border border-gray-300 rounded p-2 space-y-2">
                        <div className="border-b pb-2 border-gray-300">
                          <span className="text-gray-700 ">Rating:</span>
                          {/* Poor Fair Good VeryGood Excellent */}
                          <RatingSelect rating={rating} setRating={setRating} />
                        </div>
                        <div className="flex flex-col">
                          <label htmlFor="review" className="text-gray-700 ">
                            Comment:
                          </label>

                          <textarea
                            name="review"
                            id="review"
                            rows="5"
                            placeholder="Write your review here."
                            className="w-full p-2 border border-gray-400 rounded"
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          className="bg-gray-800 rounded text-white font-bold p-2"
                          disabled={loadingProductReview}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <Message color="blue">
                      Please{" "}
                      <Link to="/login" className="text-blue-500 underline">
                        log in
                      </Link>{" "}
                      to write a review
                    </Message>
                  )}
                </div>

                {/* Reviews */}
                <div className="md:w-1/2 space-y-2">
                  <div className="bg-gray-300 py-2 px-4 rounded">
                    <h2 className="text-[1.125em] font-semibold">Reviews</h2>
                  </div>

                  {loadingProductReview && (
                    <div className="w-full h-fit">
                      <Loader />
                    </div>
                  )}

                  {product.reviews.length === 0 && (
                    <Message color="blue">No reviews yet</Message>
                  )}

                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border border-gray-300 rounded p-2"
                    >
                      <h4 className="font-semibold">{review.name}</h4>
                      <Rating rating={review.rating} />
                      <p className="italic text-[0.875em]">
                        Reviewed on: {review.createdAt.substring(0, 10)}
                      </p>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
