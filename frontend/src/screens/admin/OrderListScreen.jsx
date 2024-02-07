import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders);

  return (
    <>
      <h1 className="text-2xl font-bold pb-4">All Orders</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <Message color="red">{error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-500 bg-blue-300">
              <th>ID</th>
              <th>USER</th>
              <th>ORDER DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="text-center">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-b border-gray-500 h-10 hover:bg-gray-300 odd:bg-gray-200 select-none"
              >
                <td>{ order._id }</td>
                <td>{ order.user && order.user.name }</td>
                <td>{ order.createdAt.substring(0, 10) }</td>
                <td>&#8377; {order.totalPrice}</td>
                <td>
                  <div className="flex justify-center">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </div>
                </td>
                <td>
                  <Link to={`/order/${order._id}`} className="text-blue-700">
                    More...
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListScreen;
