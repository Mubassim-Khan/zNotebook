import { TbLayoutSidebarFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/ThemeContext";

import Logo from "../assets/images/logo.png";
import { Avatar } from "./Avatar";

export const Navbar = ({ open, setOpen }) => {
  const { theme } = useTheme();
  
  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-slate-300 text-black"
      }`}
    >
      {" "}
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Sidebar toggle button */}
          {localStorage.getItem("token") &&
            (open ? (
              <button
                className={`mr-8 transition-all duration-400 ease-in-out rounded-[5px] p-[5px] ${
                  theme === "dark"
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-slate-300 text-black hover:bg-gray-200"
                }
                  `}
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <TbLayoutSidebarFilled size={30} />
              </button>
            ) : (
              <button
                className={`mr-8 transition-all duration-400 ease-in-out rounded-[5px] p-[5px] ${
                  theme === "dark"
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-slate-300 text-black hover:bg-gray-200"
                }
                  `}
                onClick={() => setOpen(true)}
                aria-label="Open sidebar"
              >
                <TbLayoutSidebarFilled size={30} />
              </button>
            ))}
          <Link to="/" className="flex items-center">
            {/* <img className="h-9 mr-2 rounded-full " src={Logo} alt="Logo" /> */}
            <span className="font-medium text-2xl">zNotebook</span>
          </Link>
        </div>
        <Avatar />
      </div>
    </nav>
  );
};
