import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image.replace('..\\backend', ''));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Link to="/admin/productlist">
          <button className="bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3">
            Go Back
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-[50%] border border-gray-300 shadow-md rounded p-3">
          <h1 className="text-center text-2xl font-extrabold">Edit product</h1>

          {loadingUpdate && <p>Loading</p>}

          {isLoading ? (
            <p>Loading</p>
          ) : error ? (
            <Message color="red">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <label htmlFor="image" className="text-gray-700 ">
                    Image
                  </label>
                  <div className="border border-gray-400 rounded divide-y">
                    {/* <input
                      id="image"
                      type="text"
                      placeholder="Enter image url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="w-full p-2 rounded"
                    /> */}
                    {image}
                    {/* \uploads\image-1707249792154.jpg */}
                    <img src={image} alt={image} className='h-[10rem] m-auto border border-gray-400'/>
                    <input
                      id="img"
                      type="file"
                      onChange={uploadFileHandler}
                      className="w-full p-2 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-700 ">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="price" className="text-gray-700 ">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="brand" className="text-gray-700 ">
                    Brand
                  </label>
                  <input
                    id="brand"
                    type="text"
                    placeholder="Enter product brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="countInStock" className="text-gray-700 ">
                    Count in stock
                  </label>
                  <input
                    id="countInStock"
                    type="number"
                    placeholder="Enter stock count"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="category" className="text-gray-700 ">
                    Category
                  </label>
                  <input
                    id="category"
                    type="text"
                    placeholder="Enter product category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="description" className="text-gray-700 ">
                    Description
                  </label>
                  {/* <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                /> */}
                  <textarea
                    name="description"
                    id="description"
                    rows="5"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-gray-800 rounded text-white font-bold p-2"
                >
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductEditScreen;
