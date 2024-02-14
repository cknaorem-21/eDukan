import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import { toast, Flip } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User updated successfully", {
        position: "bottom-center",
        autoClose: 500,
        hideProgressBar: true,
        transition: Flip,
        theme: "colored",
      });
      refetch();
      navigate("/admin/userlist");
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
      <div className="w-full">
        <Link to="/admin/userlist">
          <button className="bg-gray-200 border-2 border-gray-300 rounded p-1 mb-3">
            Go Back
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-[50%] border border-gray-300 shadow-md rounded p-3">
          <h1 className="text-center text-2xl font-extrabold">Edit user</h1>

          {isLoading ? (
            <div className="w-full h-[40vh] my-auto">
              <Loader />
            </div>
          ) : error ? (
            <Message color="red">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="flex flex-col gap-3">
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
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    id="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                    className="border border-gray-400 rounded"
                  />
                  <label htmlFor="isAdmin" className="text-gray-700 ">
                    Admin
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex justify-center gap-2 bg-gray-800 rounded text-white font-bold p-2"
                >
                  Update
                  {loadingUpdate && (
                    <div className="h-5 w-5">
                      <Loader />
                    </div>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserEditScreen;
