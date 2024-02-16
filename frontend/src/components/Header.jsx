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
  const [ dropdown, setDropdown ] = useState(false);
  const [ adminDropdown, setAdminDropdown ] = useState(false);

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
    <header className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] flex justify-between items-center w-full h-[4rem] bg-gray-800 p-8">
      <Link to="/" className="text-white h-fit w-fit">
        <FiShoppingBag className="inline text-[2rem]" />
        <span className="p-2">e-DUKAN</span>
      </Link>
      <nav className="text-white flex gap-4">
        <NavLink to="/cart" className="relative flex items-center gap-1 pr-5">
          <FaShoppingCart className="inline" />
          <span>Cart</span>
          {
            cartItems.length > 0 && (
              // Cart items badge
              <div className="flex justify-center items-center absolute top-0 right-0 w-1 h-1 bg-yellow-400 rounded-full text-black font-semibold text-xs p-2">
                <div>{cartItems.reduce((a, item) => a + item.quantity, 0)}</div>
              </div>
            )
          }
        </NavLink>

        {userInfo ? (
          <div className="relative select-none">
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
                <Link to="/profile" onClick={()=>setDropdown(false)}>
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

        { userInfo && userInfo.isAdmin && (
          <div className="relative select-none">
          <div
            onClick={() => setAdminDropdown(!adminDropdown)}
            className={`flex items-center gap-1 cursor-pointer ${
              adminDropdown ? "text-blue-400" : ""
            }`}
          >
            Admin
            {adminDropdown ? (
              <FaAngleUp className="text-sm" />
            ) : (
              <FaAngleDown className="text-sm" />
            )}
          </div>
          {/* Admin Dropdown */}
          {adminDropdown && (
            <div className="absolute top-[2rem] flex flex-col w-[5.5rem] min-w-max text-black rounded-sm bg-gray-100 border border-gray-400">
              <Link to="/admin/productlist" onClick={()=>setAdminDropdown(false)}>
                <div className="hover:bg-gray-300 p-2 rounded-sm border-b border-gray-300">
                  Products
                </div>
              </Link>

              <Link to="/admin/userlist" onClick={()=>setAdminDropdown(false)}>
                <div className="hover:bg-gray-300 p-2 rounded-sm border-b border-gray-300">
                  Users
                </div>
              </Link>

              <Link to="/admin/orderlist" onClick={()=>setAdminDropdown(false)}>
                <div className="hover:bg-gray-300 p-2 rounded-sm border-b border-gray-300">
                  Orders
                </div>
              </Link>
              
            </div>
          )}
        </div>
        )

        }
      </nav>
    </header>
  );
};

export default Header;
