import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import Loader from "../components/Loader";

import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <h1 className="text-lg font-bold my-3">Products</h1>

          {/* tiles container */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {/* tiles */}
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
