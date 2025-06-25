import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useTheme } from "../context/theme/ThemeContext";

export const Avatar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const showUsername = () => localStorage.getItem("username");
  const showEmail = () => localStorage.getItem("email");
  const avatarUrl = localStorage.getItem("avatar");
  console.log(avatarUrl);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    setIsOpen(false);
    navigate("/login");
    toast.success("Logged out");
  };

  // Close pannel on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {localStorage.getItem("token") && (
        <>
          {avatarUrl === undefined ? (
            <img
              src={avatarUrl}
              alt="User Avatar"
              className="w-10 h-10 rounded-full cursor-pointer object-cover border"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            <FaUserCircle
              size={30}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          )}

          <div
            id="userDropdown"
            className={`absolute right-0 mt-2 z-10 w-44 origin-top-right transform transition-all duration-200 divide-y rounded-lg shadow-sm ${
              isOpen
                ? "scale-100 opacity-100 visible"
                : "scale-95 opacity-0 invisible"
            } ${
              theme === "dark"
                ? "bg-gray-700 text-gray-100 divide-gray-600"
                : "bg-gray-200 text-black divide-gray-300"
            }`}
          >
            <div
              className={`px-4 py-3 text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <div className="mb-1">{showUsername()}</div>
              <div className="font-medium truncate">{showEmail()}</div>
            </div>
            <ul
              className={`py-2 text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              <li
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${
                  theme === "dark"
                    ? "hover:bg-gray-600 hover:text-white"
                    : "hover:bg-gray-300 hover:text-black"
                } `}
                onClick={toggleTheme}
              >
                {theme === "light" ? <FaMoon /> : <IoMdSunny />}
                <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
              </li>
            </ul>
            <div className="py-1">
              <button
                type="button"
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 text-sm w-full ${
                  theme === "dark"
                    ? "hover:bg-gray-600 hover:text-white"
                    : "hover:bg-gray-300 hover:text-black"
                }`}
              >
                <PiSignOutBold />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
