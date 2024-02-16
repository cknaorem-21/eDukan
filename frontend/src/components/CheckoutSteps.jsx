import { Link } from "react-router-dom";

// sign shipping payment step4

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center w-[70%]">
          {/* Sign in */}
          <div className="flex items-center text-sm">
            {step1 ? (
              <Link to="/login">
                <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-green-700 text-gray-100">
                  Sign in
                </div>
              </Link>
            ) : (
              <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-gray-200">
                Sign in
              </div>
            )}
          </div>
          
          {/* Shipping */}
          <div className="flex items-center grow text-sm">
            <div
              className={`grow min-w-3 sm:min-w-14 lg:min-w-40 h-1 ${
                step2 ? "bg-green-700 text-gray-100" : "bg-gray-200"
              }`}
            ></div>
            {step2 ? (
              <Link to="/shipping">
                <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-green-700 text-gray-100">
                  Shipping
                </div>
              </Link>
            ) : (
              <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-gray-200">
                Shipping
              </div>
            )}
          </div>

          {/* Payment */}
          <div className="flex items-center grow text-sm">
            <div
              className={`grow min-w-3 sm:min-w-14 lg:min-w-40 h-1 ${
                step3 ? "bg-green-700 text-gray-100" : "bg-gray-200"
              }`}
            ></div>
            {step3 ? (
              <Link to="/payment">
                <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-green-700 text-gray-100">
                  Payment
                </div>
              </Link>
            ) : (
              <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-gray-200">
                Payment
              </div>
            )}
          </div>

          {/* Place order */}
          <div className="flex items-center grow text-sm">
            <div
              className={`grow min-w-3 sm:min-w-14 lg:min-w-40 h-1 ${
                step4 ? "bg-green-700 text-gray-100" : "bg-gray-200"
              }`}
            ></div>
            {step4 ? (
              <Link to="/placeorder">
                <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-green-700 text-gray-100">
                  Place order
                </div>
              </Link>
            ) : (
              <div className="text-[0.6rem] md:text-[0.75rem] lg:text-[1rem] w-max h-max rounded-full px-2 md:px-3 md:py-1 bg-gray-200">
                Place order
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSteps;
