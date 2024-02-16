import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { toast, Flip } from "react-toastify"; 
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateMode, setUpdateMode] = useState(false);
  const [passwordUpdateMode, setPasswordUpdateMode] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    console.log("Submit Handler");
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and comfirm password do not match", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        transition: Flip,
        theme: "colored",
      });
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully", {
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
    }
  };

  const keepOldPasswordHandler = () => {
    setPassword("");
    setConfirmPassword("");
    setPasswordUpdateMode(false);
  };

  const keepOldDataHandler = () => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
    setConfirmPassword("");
    setUpdateMode(false);
  };

  return (
    <>
      <div className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] flex flex-col lg:flex-row gap-2">
        {/* Profile details and update part */}
        <div className="w-full lg:w-1/4 border rounded border-gray-300 p-2 h-max">
          <h1 className="text-[1.5em] font-bold mb-2">Profile</h1>

          {updateMode === true ? (
            <>
              <form onSubmit={submitHandler}>
                <div className="space-y-3">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-gray-700 ">
                      Name
                    </label>
                    <input
                      id="name"
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2 border border-gray-400 rounded"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700 ">
                      email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-gray-400 rounded"
                    />
                  </div>

                  {passwordUpdateMode ? (
                    <>
                      <div className="flex flex-col">
                        <label htmlFor="newPassword" className="text-gray-700 ">
                          Password
                        </label>
                        <input
                          id="newPassword"
                          type="newPassword"
                          placeholder="Enter new password"
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-2 border border-gray-400 rounded"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="confirmNewPassword"
                          className="text-gray-700 "
                        >
                          Confirm password
                        </label>
                        <input
                          id="confirmNewPassword"
                          type="confirmNewPassword"
                          placeholder="Confirm new password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-2 border border-gray-400 rounded"
                        />
                      </div>

                      <button
                        className="border border-gray-300 bg-gray-200 rounded px-1 text-[0.875em]"
                        onClick={keepOldPasswordHandler}
                      >
                        Keep existing password
                      </button>
                    </>
                  ) : (
                    <button
                      className="border border-gray-300 bg-gray-200 rounded px-1 text-[0.875em]"
                      onClick={() => setPasswordUpdateMode(true)}
                    >
                      Change password
                    </button>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="flex justify-center gap-2 bg-gray-800 rounded text-white font-bold p-2 w-full"
                    >
                      Update
                      {loadingUpdateProfile && (
                        <div className="h-5 w-5">
                          <Loader />
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <p className="text-center italic">Or</p>
              <div>
                <button
                  className="border border-gray-400 rounded font-semibold p-1 w-full"
                  onClick={keepOldDataHandler}
                >
                  Keep existing data
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="font-semibold">Name: </span>
                <span>{userInfo.name}</span>
              </div>

              <div>
                <span className="font-semibold">email: </span>
                <span>{userInfo.email}</span>
              </div>

              <div className="mt-2">
                <button
                  className="border border-gray-300 bg-gray-200 rounded px-1 text-[0.875em]"
                  onClick={() => setUpdateMode(true)}
                >
                  Update Account
                </button>
              </div>
            </>
          )}
        </div>

        {/* Orders part  */}
        <div className="w-full lg:w-3/4 border rounded border-gray-300 p-2 h-max">
          <h1 className="text-[1.5em] font-bold mb-2">My Orders</h1>

          {isLoading ? (
            <div className="w-full h-[70vh]">
              <Loader />
            </div>
          ) : error ? (
            <Message color="red">{error?.data?.message || error.error}</Message>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-500 bg-blue-300">
                  <th className="hidden md:table-cell">ID</th>
                  <th className="hidden md:table-cell">DATE</th>
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
                    <td className='block py-1 px-2 before:content-["ID\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>{order._id}</td>
                    <td className='block py-1 px-2 before:content-["DATE\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell'>{order.createdAt.substring(0, 10)}</td>
                    <td className='block py-1 px-2 before:content-["TOTAL\:"] before:pr-2 before:font-bold before:text-left md:before:hidden md:table-cell whitespace-nowrap'>&#8377; {order.totalPrice.toLocaleString('en-IN')}</td>
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
                    <td className='block py-1 px-2 md:table-cell'>
                      <Link
                        to={`/order/${order._id}`}
                        className="text-blue-700"
                      >
                        More...
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
