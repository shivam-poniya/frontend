import React, { useState, useEffect } from "react";
import "./Header.css"; // Import custom CSS for styling

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add event listener to change header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="h-12  mx-6 px-10"
            src="/static/assets/claw-high-resolution-logo-transparent.png"
            alt="Claw Video Storage"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-700">
          <a href="#" className="hover:text-black">
            Home
          </a>
          <a href="#" className="hover:text-black">
            Videos
          </a>
          <a
            href="#"
            className="text-gray-700 hover:text-black flex items-center space-x-1"
          >
            <span>Log in</span>
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
