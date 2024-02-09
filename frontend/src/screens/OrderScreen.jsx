import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import Message from "../components/Message";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Loader from "../components/Loader";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });

        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful");
  };

  const onError = (error) => {
    toast.error(error.message);
  };

  const createOrder = (data, actions) => {
    const conversionRate = 73;
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: Number((order.totalPrice / conversionRate).toFixed(2)),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <>
      <div className="w-screen h-screen">
        <Loader />
      </div>
    </>
  ) : error ? (
    <>
      <p>error</p>
    </>
  ) : (
    <>
      <div className="flex justify-between gap-3">
        <div className="w-[70%] space-y-2">
          <h1 className="text-2xl font-bold">Order {order._id}</h1>

          {/* Shipping details */}
          <div className="space-y-3 border border-gray-300 p-2 rounded">
            <h2 className="text-2xl font-bold">Shipping</h2>

            <div>
              <span className="font-semibold">Name: </span>
              <span>{order.user.name}</span>
            </div>

            <div>
              <span className="font-semibold">email: </span>
              <span>{order.user.email}</span>
            </div>

            <div>
              <span className="font-semibold">Address: </span>
              <span>
                {order.shippingAddress.address}, {order.shippingAddress.city},
                PIN: {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </span>
            </div>

            <div>
              {order.isDelivered ? (
                <Message color="green">
                  Delivered on : {order.deliveredAt}
                </Message>
              ) : (
                <Message color="red">Not delivered</Message>
              )}
            </div>
          </div>

          {/* Payment method */}
          <div className="space-y-3 border border-gray-300 p-2 rounded">
            <h2 className="text-2xl font-bold">Payment</h2>
            <div>
              <span className="font-semibold">Method: </span>
              <span>{order.paymentMethod}</span>
            </div>

            <div>
              {order.isPaid ? (
                <Message color="green">Paid on : {order.paidAt}</Message>
              ) : (
                <Message color="red">Not paid</Message>
              )}
            </div>
          </div>

          {/* Order items */}
          <div className="space-y-3 border border-gray-300 p-2 rounded">
            <h2 className="text-2xl font-bold">Order items</h2>

            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 justify-between border border-gray-300 rounded pr-1"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded h-[100px] m-1"
                  />
                  <div>
                    <Link to={`/product/${item.product}`} className="underline">
                      {item.name}
                    </Link>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="text-center divide-y">
                    <p className="font-semibold p-1">Unit Price</p>
                    <p className="p-1">&#8377; {item.price}</p>
                  </div>

                  <div className="text-center divide-y divide-gray-300">
                    <p className="font-semibold p-1">Quantity</p>
                    <p className="p-1">{item.quantity}</p>
                  </div>

                  <div className="text-center divide-y">
                    <p className="font-semibold p-1">Total</p>
                    <p className="p-1">{item.quantity * item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="flex flex-col gap-2 w-[30%] h-fit shadow-lg border border-gray-400 rounded-md m-1 p-4">
          <div className="text-center text-xl font-semibold">Order Summary</div>
          <hr className="border-1-2 border-gray-300" />
          <div className="">
            <span className="font-semibold">Total items: </span>
            {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}
          </div>

          <div className="">
            <span className="font-semibold">Total Price: </span>
            &#8377;{order.itemsPrice}
          </div>

          <div className="">
            <span className="font-semibold">Shipping Price: </span>
            &#8377;{order.shippingPrice}
          </div>

          <div className="">
            <span className="font-semibold">Tax: </span>
            &#8377;{order.taxPrice}
          </div>

          <div className="">
            <span className="font-semibold">Grand total: </span>
            &#8377;{order.totalPrice}
          </div>

          <hr className="border-1-2 border-gray-300" />
          <div className="mt-1">
            {!order.isPaid && (
              <div>
                {loadingPay && (
                  <div className="w-screen h-screen">
                    <Loader />
                  </div>
                )}

                {isPending ? (
                  <div className="w-screen h-screen">
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <button
                      className="border rounded bg-gray-800 px-3 py-1 text-gray-100 hover:bg-gray-900 w-full my-2"
                      onClick={onApproveTest}
                    >
                      Test Payment
                    </button>

                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                    ></PayPalButtons>
                  </div>
                )}
              </div>
            )}

            {loadingDeliver && (
              <div className="w-screen h-screen">
                <Loader />
              </div>
            )}
            {userInfo &&
              userInfo.isAdmin &&
              order.isPaid &&
              !order.isDelivered && (
                <button
                  className="border rounded bg-gray-800 px-3 py-1 text-gray-100 hover:bg-gray-900 w-full"
                  onClick={deliverOrderHandler}
                >
                  Mark as delivered
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
