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
import { toast, Flip } from "react-toastify";
import { useSelector } from "react-redux";
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
        toast.success("Payment successful", {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
      } catch (error) {
        toast.error(error?.data?.message || error.error, {
          position: "bottom-center",
          autoClose: 500,
          hideProgressBar: true,
          transition: Flip,
          theme: "colored",
        });
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment successful", {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      transition: Flip,
      theme: "colored",
    });
  };

  const onError = (error) => {
    toast.error(error?.data?.message || error.error, {
      position: "bottom-center",
      autoClose: 500,
      hideProgressBar: true,
      transition: Flip,
      theme: "colored",
    });
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
      toast.success("Order delivered", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        transition: Flip,
        theme: "colored",
      });
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

  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem]">
        {
          isLoading ? (
            <>
              <div className="w-full h-[70vh]">
                <Loader />
              </div>
            </>
          ) : error ? (
            <>
              <p>error</p>
            </>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between gap-3">
                <div className="grow w-full md:w-[55%] lg:w-[69%] space-y-2">
                  <h1 className="text-[1.5em] font-bold">Order {order._id}</h1>
        
                  {/* Shipping details */}
                  <div className="space-y-3 border border-gray-300 p-2 rounded">
                    <h2 className="text-[1.5em] font-bold">Shipping</h2>
        
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
                    <h2 className="text-[1.5em] font-bold">Payment</h2>
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
                    <h2 className="text-[1.5em] font-bold">Order items</h2>
        
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row gap-4 justify-between border border-gray-300 rounded"
                      >
                        <div className="flex gap-4 items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="rounded h-[100px] aspect-square object-contain m-1"
                          />
                          <div>
                            <Link to={`/product/${item.product}`} className="underline">
                              {item.name}
                            </Link>
                          </div>
                        </div>
        
                        <div className="flex gap-2">
                          <table className="w-full md:w-[10rem]">
                            <tbody className="whitespace-nowrap">
                              <tr className="odd:bg-gray-100 even:bg-gray-200">
                                <th className="text-left px-1">Price: </th>
                                <td className="text-right px-1">
                                  &#8377; {Number(item.price).toLocaleString("en-IN")}
                                </td>
                              </tr>
                              <tr className="odd:bg-gray-100 even:bg-gray-200">
                                <th className="text-left px-1">Qty: </th>
                                <td className="text-right px-1">{item.quantity}</td>
                              </tr>
                              <tr className="odd:bg-gray-100 even:bg-gray-200">
                                <th className="text-left px-1">Total: </th>
                                <td className="text-right px-1">
                                  &#8377;{" "}
                                  {Number(item.quantity * item.price).toLocaleString(
                                    "en-IN"
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
        
                {/* Card */}
                <div className="grow flex flex-col gap-2 w-full md:w-[29%] h-fit shadow-lg border border-gray-400 rounded-md m-1 p-4">
                  <div className="text-center text-[1.25em] font-semibold">Order Summary</div>
                  <hr className="border-1-2 border-gray-300" />
                  <div>
                    <table className="w-full">
                      <tbody>
                        <tr className="odd:bg-gray-100 even:bg-gray-200">
                          <td className="text-left px-1">Total item(s): </td>
                          <td className="text-right font-semibold px-1">
                            {order.orderItems.reduce(
                              (acc, item) => acc + item.quantity,
                              0
                            )}
                          </td>
                        </tr>
        
                        <tr className="odd:bg-gray-100 even:bg-gray-200">
                          <td className="text-left px-1">Total price: </td>
                          <td className="text-right font-semibold whitespace-nowrap px-1">
                            &#8377; {order.itemsPrice.toLocaleString("en-IN")}
                          </td>
                        </tr>
        
                        <tr className="odd:bg-gray-100 even:bg-gray-200">
                          <td className="text-left px-1">Shipping price: </td>
                          <td className="text-right font-semibold whitespace-nowrap px-1">
                            &#8377; {order.shippingPrice.toLocaleString("en-IN")}
                          </td>
                        </tr>
        
                        <tr className="odd:bg-gray-100 even:bg-gray-200">
                          <td className="text-left px-1">Tax: </td>
                          <td className="text-right font-semibold whitespace-nowrap px-1">
                            &#8377; {order.taxPrice.toLocaleString("en-IN")}
                          </td>
                        </tr>
        
                        <tr className="odd:bg-gray-100 even:bg-gray-200">
                          <td className="text-left px-1">Grand total: </td>
                          <td className="text-right font-semibold whitespace-nowrap px-1">
                            &#8377; {order.totalPrice.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
        
                  <hr className="border-1-2 border-gray-300" />
                  <div className="mt-1">
                    {!order.isPaid && (
                      <div>
                        {loadingPay && (
                          <div className="w-full h-fit">
                            <Loader />
                          </div>
                        )}
        
                        {isPending ? (
                          <div className="w-full h-fit">
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
                      <div className="w-full h-fit">
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
          )
        }
      </div>
    </>
  );
};

export default OrderScreen;
