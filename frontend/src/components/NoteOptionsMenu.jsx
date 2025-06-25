import { useEffect } from "react";
import { FiMoreVertical, FiEdit, FiTrash2, FiShare } from "react-icons/fi";
import { IoLink } from "react-icons/io5";
import toast from "react-hot-toast";

import { useTheme } from "../context/theme/ThemeContext";

export const NoteOptionsMenu = ({
  note,
  menuOpenId,
  setMenuOpenId,
  onEdit,
  onDelete,
  menuRefs,
}) => {
  const isOpen = menuOpenId === note._id;
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRefs.current[note._id] &&
        !menuRefs.current[note._id].contains(event.target)
      ) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, menuRefs, note._id, setMenuOpenId]);

  return (
    <div className="relative flex-shrink-0 ml-2">
      <button
        className={`p-1 rounded-full transition ${
          theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-400"
        }  `}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpenId(isOpen ? null : note._id);
        }}
        aria-label="Note options"
      >
        <FiMoreVertical
          size={18}
          className={`${theme === "dark" ? "text-white" : "text-black"}`}
        />
      </button>
      {isOpen && (
        <div
          ref={(el) => (menuRefs.current[note._id] = el)}
          className={`absolute right-0 mt-2 w-32 rounded-lg border shadow-lg z-50 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-500"
              : "bg-gray-300 border-gray-600"
          } `}
        >
          {/* Edit button */}
          <button
            className={`flex items-center w-full px-3 py-2 text-sm rounded-[8px] ${
              theme === "dark"
                ? "hover:bg-gray-600 text-white"
                : "hover:bg-gray-400 text-black"
            } `}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            <FiEdit className="mr-2" /> Edit
          </button>
          {/* Share button */}
          <button
            className={`flex items-center w-full px-3 py-2 text-sm rounded-[8px] ${
              theme === "dark"
                ? "hover:bg-gray-600 text-white"
                : "hover:bg-gray-400 text-black"
            } `}
            onClick={(e) => {
              e.stopPropagation();
              const url = `${window.location.origin}/notes/${note._id}`;
              navigator.clipboard.writeText(url);
              toast("Link copied!", {
                icon: <IoLink />,
              });
              setMenuOpenId(null);
            }}
          >
            <FiShare className="mr-2" /> Share
          </button>
          {/* Delete button */}
          <button
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-[8px] hover:bg-red-300"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note);
              setMenuOpenId(null);
            }}
          >
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );
};
