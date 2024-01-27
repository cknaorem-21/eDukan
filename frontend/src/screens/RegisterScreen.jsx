import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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

    if (password !== confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    try {
      // console.log('try block')
      const res = await register({ name, email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[40%] border border-gray-300 shadow-md rounded p-3">
          <h1 className="text-center text-2xl font-extrabold">Register</h1>

          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-700 ">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

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

              <div className="flex flex-col">
                <label htmlFor="confirmPassword" className="text-gray-700 ">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gray-800 rounded text-white font-bold p-2"
                disabled={isLoading}
              >
                Register
              </button>

              {isLoading && `Loading...`}
            </div>
          </form>

          <div className="text-center m-2">
            Already registered?
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-blue-500"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
