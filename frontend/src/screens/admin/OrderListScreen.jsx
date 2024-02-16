import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import Loader from "../../components/Loader";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]">
        <h1 className="text-[1.5em] font-bold pb-4">All Orders</h1>

        {isLoading ? (
          <div className="w-full h-[50vh] my-auto">
            <Loader />
          </div>
        ) : error ? (
          <Message color="red">{error}</Message>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-500 bg-blue-300">
                <th className="hidden md:table-cell">ID</th>
                <th className="hidden md:table-cell">USER</th>
                <th className="hidden md:table-cell">ORDER DATE</th>
                <th className="hidden md:table-cell">TOTAL</th>
                <th className="hidden md:table-cell">PAID</th>
                <th className="hidden md:table-cell">DELIVERED</th>
                <th className="hidden md:table-cell"></th>
              </tr>
            </thead>

            <tbody className="md:text-center">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="md:h-10 hover:bg-gray-300 odd:bg-gray-100 even:bg-gray-200 select-none"
                >
                  <td className='block py-1 px-2 before:content-["ID\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    {order._id}
                  </td>
                  <td className='block py-1 px-2 before:content-["USER\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    {order.user && order.user.name}
                  </td>
                  <td className='block py-1 px-2 before:content-["ORDER_DATE\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className='block py-1 px-2 before:content-["TOTAL\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell whitespace-nowrap'>
                    &#8377; {order.totalPrice}
                  </td>
                  <td className='block py-1 px-2 before:content-["PAID\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    <div className="inline md:flex justify-center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500 inline" />
                      )}
                    </div>
                  </td>
                  <td className='block py-1 px-2 before:content-["DELIVERED\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>
                    <div className="inline md:flex justify-center">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500 inline" />
                      )}
                    </div>
                  </td>
                  <td className="block py-1 px-2 md:table-cell">
                    <Link to={`/order/${order._id}`} className="text-blue-700">
                      More...
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default OrderListScreen;
