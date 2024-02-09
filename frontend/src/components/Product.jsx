import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <>
      <Link
        to={`/product/${product._id}`}
        className="w-[19%] aspect-[4/5] border rounded border-gray-200 p-2"
      >
        <div className="border rounded w-full aspect-square">
          <img src={product.image} alt="image" className="object-contain w-full h-full rounded"/>
        </div>
        <div>
          <strong className="overflow-hidden break-words">{product.name.substring(0, Math.min(30, product.name.length))}{product.name.length>25 && '...'}</strong>
          <h3>&#8377; {product.price.toLocaleString('en-IN')}</h3>
          <Rating rating={product.rating} reviewCount={product.numReviews} />
        </div>
      </Link>
    </>
  );
};

export default Product;
