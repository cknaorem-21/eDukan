import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
        <footer className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem] lg:text-[1rem] flex flex-col justify-center items-center w-full bg-gray-300 p-2">
          <p>eDUKAN &copy; {currentYear}</p>
          <p className="italic text-[0.7em] text-gray-800">All rights reserved</p>
        </footer>
    </>
  );
};

export default Footer;
