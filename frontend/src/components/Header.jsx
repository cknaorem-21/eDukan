import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    setDropdown(false);
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex justify-between items-center w-full h-[4rem] bg-gray-800 p-8">
      <Link to="/" className="text-white h-fit w-fit">
        <FiShoppingBag className="inline text-[2rem]" />
        <span className="p-2">eDUKAN</span>
      </Link>
      <nav className="text-white flex gap-4">
        <NavLink to="/cart" className="relative pr-4">
          <FaShoppingCart className="inline" />
          <span className="p-1">Cart</span>
          {
            // console.log('cartItems.length ', cartItems.length)
            cartItems.length > 0 && (
              // Cart items badge
              <div className="flex justify-center items-center absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full text-xs p-2">
                <div>{cartItems.reduce((a, item) => a + item.quantity, 0)}</div>
              </div>
            )
          }
        </NavLink>

        {userInfo ? (
          <div className="relative p-1 select-none">
            <div
              onClick={() => setDropdown(!dropdown)}
              className={`flex items-center gap-1 cursor-pointer ${
                dropdown ? "text-blue-400" : ""
              }`}
            >
              {userInfo.name}
              {dropdown ? (
                <FaAngleUp className="text-sm" />
              ) : (
                <FaAngleDown className="text-sm" />
              )}
            </div>
            {/* Dropdown */}
            {dropdown && (
              <div className="absolute top-[2rem] flex flex-col w-[7rem] min-w-max text-black rounded-sm bg-gray-100 border border-gray-400">
                <Link to="/profile">
                  <div className="hover:bg-gray-300 p-2 rounded-sm border-b border-gray-300">
                    Profile
                  </div>
                </Link>
                <div
                  className="hover:bg-gray-300 p-2 rounded-sm"
                  onClick={logoutHandler}
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <FaUser className="inline" />
            <span className="p-1">Sign in</span>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
