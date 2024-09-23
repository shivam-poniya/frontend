import React, { useState, useEffect, useContext } from "react";
import "./Header.css"; // Import custom CSS for styling
import Logout from "./Logout";
import { AuthContext } from "./AuthContext";
import Login from "./Login";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const {isAuthenticated} = useContext(AuthContext)

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
          <div>
            {isAuthenticated ? (
              <Logout />
            ) : (
              <button onClick={()=>{<Login></Login>}}>Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
