import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast, Flip } from "react-toastify"; 
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // if logged in then redirect to shipping
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
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
      <div className="flex justify-center">
        <div className="w-[40%] border border-gray-300 shadow-md rounded p-3">
          <h1 className="text-center text-2xl font-extrabold">Sign in</h1>

          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-gray-700 ">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-700 ">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex justify-center gap-2 bg-gray-800 rounded text-white font-bold p-2"
                disabled={isLoading}
              >
                Sign in
                {isLoading && (
                  <div className="h-5 w-5">
                    <Loader />
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="text-center m-2">
            New Customer?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
