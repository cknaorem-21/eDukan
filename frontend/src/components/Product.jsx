import React from "react";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { toast, Flip } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = async (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Item added to cart !", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      transition: Flip,
      theme: "colored",
    });
  };

  return (
    <>
      <div
        onClick={() => {
          navigate(`/product/${product._id}`);
        }}
        className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] w-full flex items-center gap-2 h-fit sm:w-[48%] md:w-[32%] sm:block lg:w-[19%] lg:aspect-[4/5] border rounded border-gray-300 shadow-md p-2 hover:scale-[103%] duration-300"
      >
        <div className="border rounded max-w-[40%] sm:max-w-full aspect-square">
          <img
            src={product.image}
            alt="image"
            className="object-contain w-full h-full rounded"
          />
        </div>
        <div className="w-[60%] flex flex-col items-center sm:w-full lg:h-max">
          <div className="sm:min-h-[4rem] md:min-h-[4rem] lg:min-h-[3rem] w-full text-center">
            <strong className="flex-1 overflow-hidden break-words text-slate-700 line-clamp-4 sm:line-clamp-3 lg:line-clamp-2">
              {product.name}
            </strong>
          </div>

          <div className="flex gap-1 items-center text-slate-600">
            <span className="font-bold text-[0.75em]">&#8377;</span>
            <span>{product.price.toLocaleString("en-IN")}</span>
          </div>
          <Rating rating={product.rating} reviewCount={product.numReviews} />
          <button
            className={`${
              product.countInStock >= 1
                ? "bg-yellow-300 hover:bg-yellow-400"
                : "bg-gray-300 opacity-70"
            } border rounded px-2 block mx-auto mt-1`}
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
