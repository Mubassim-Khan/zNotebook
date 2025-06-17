import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/images/logo.png";

export const Navbar = ({ open, setOpen }) => {
  const userName = localStorage.getItem("name");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out");
  };

  return (
    <nav
      className={"w-full fixed top-0 z-50 transition-all bg-gray-800 shadow"}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Sidebar toggle button */}
          {open ? (
            <span
              className="mr-3 p-2"
              style={{ width: 40, display: "inline-block" }}
            />
          ) : (
            <button
              className="mr-3 p-2 bg-gray-700 text-white shadow-lg hover:bg-gray-800 transition rounded"
              onClick={() => setOpen(true)}
              aria-label="Open sidebar"
              style={{ width: 40 }}
            >
              <IoMdMenu size={28} />
            </button>
          )}
          <Link to="/" className="flex items-center">
            <img className="h-9 mr-2" src={Logo} alt="Logo" />
            <span className="font-bold text-lg">zNotebook</span>
          </Link>
        </div>

        {localStorage.getItem("token") && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-200">
              Signed in as: {userName || ""}
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
