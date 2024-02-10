import React from "react";
import Rating from "./Rating";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const addToCartHandler = async (e) => {
    e.stopPropagation();
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <>
      <div
        onClick={()=> {navigate(`/product/${product._id}`)}}
        className="w-[19%] aspect-[4/5] border rounded border-gray-300 shadow-md p-2 hover:scale-[103%] duration-300"
      >
        <div className="border rounded w-full aspect-square">
          <img
            src={product.image}
            alt="image"
            className="object-contain w-full h-full rounded"
          />
        </div>
        <div className="h-[50%] relative">
          <strong className="overflow-hidden break-words text-slate-700">
            {product.name.substring(0, Math.min(30, product.name.length))}
            {product.name.length > 25 && "..."}
          </strong>
          <div className="absolute bottom-0 w-full">
            <div className='flex gap-1 items-center text-slate-600'>
              <span className="font-bold text-xs">&#8377;</span> 
              <span>{product.price.toLocaleString("en-IN")}</span>
            </div>
            <Rating rating={product.rating} reviewCount={product.numReviews} />
            <button
              className={`${
                product.countInStock >= 1
                  ? "bg-yellow-300 hover:bg-yellow-400"
                  : "bg-gray-300 opacity-70"
              } border rounded px-2 block mx-auto mt-1`}
              onClick={ addToCartHandler }
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
