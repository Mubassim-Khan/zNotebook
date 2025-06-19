import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/images/logo.png";

export const Navbar = ({ open, setOpen }) => {
  const showUsername = () => localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out");
  };

  return (
    <nav className={"w-full fixed top-0 z-50 transition-all bg-gray-900"}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Sidebar toggle button */}
          {localStorage.getItem("token") &&
            (open ? (
              <button
                className="mr-8 bg-gray-900 text-white shadow-lg hover:bg-gray-700 transition-all duration-400 ease-in-out rounded-[5px] p-[5px]"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <TbLayoutSidebarFilled size={30} />
              </button>
            ) : (
              <button
                className="mr-8 bg-gray-900 text-white shadow-lg hover:bg-gray-700 transition-all duration-400 ease-in-out rounded-[5px] p-[5px]"
                onClick={() => setOpen(true)}
                aria-label="Open sidebar"
              >
                <TbLayoutSidebarFilled size={30} />
              </button>
            ))}
          <Link to="/" className="flex items-center">
            <img className="h-9 mr-2" src={Logo} alt="Logo" />
            <span className="font-bold text-lg">zNotebook</span>
          </Link>
        </div>

        {localStorage.getItem("token") && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-200">
              Signed in as: {showUsername() || "Test User"}
            </span>
            <button
              className="min-w-[90px] px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
