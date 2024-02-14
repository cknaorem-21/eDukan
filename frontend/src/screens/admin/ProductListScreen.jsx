import { Link } from "react-router-dom";
import { FaTimes, FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Message from "../../components/Message";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast, Flip } from "react-toastify"; 
import Loader from "../../components/Loader";

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete this product: \n${product.name}?`
      )
    )
      try {
        await deleteProduct(product._id);
        toast.success("Product deleted", {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
      }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-bold pb-4">Products</h1>
          <button
            className="flex gap-2 items-center text-white bg-gray-800 rounded p-1 hover:bg-gray-700 px-2 py-1"
            onClick={createProductHandler}
          >
            <span className="text-sm">Create new product</span>
            <FaEdit className="text-[15px] text-white" />

            {loadingCreate && (
              <div className="h-5 w-5">
                <Loader />
              </div>
            )}
          </button>
        </div>

        {isLoading || loadingDelete ? (
          <div className="w-full h-[50vh] my-auto">
            <Loader />
          </div>
        ) : error ? (
          <Message color="red">{error}</Message>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-500 bg-blue-300">
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="text-center">
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-500 h-10 hover:bg-gray-300 odd:bg-gray-200 select-none"
                  >
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button className="flex gap-1 items-center border border-gray-300 bg-gray-200 rounded p-1 hover:bg-gray-300">
                          <span className="text-sm">Edit</span>
                          <FaEdit className="text-[15px] text-gray-700 border" />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="flex gap-1 items-center border border-gray-300 bg-gray-200 rounded p-1 hover:bg-gray-300"
                        onClick={() => deleteHandler(product)}
                      >
                        <span className="text-sm">Delete</span>
                        <FaTrashCan className="text-[15px] text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default ProductListScreen;
