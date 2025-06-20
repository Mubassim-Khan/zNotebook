import { useEffect } from "react";
import { FiMoreVertical, FiEdit, FiTrash2, FiShare } from "react-icons/fi";

export const NoteOptionsMenu = ({
  note,
  menuOpenId,
  setMenuOpenId,
  onEdit,
  onDelete,
  menuRefs,
}) => {
  const isOpen = menuOpenId === note._id;

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
        className="p-1 rounded-full hover:bg-gray-700 transition"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpenId(isOpen ? null : note._id);
        }}
        aria-label="Note options"
      >
        <FiMoreVertical size={18} className="text-white" />
      </button>
      {isOpen && (
        <div
          ref={(el) => (menuRefs.current[note._id] = el)}
          className="absolute right-0 mt-2 w-32 bg-gray-700 border border-gray-500 rounded-lg shadow-lg z-50"
        >
          {/* Edit button */}
          <button
            className="flex items-center w-full px-3 py-2 text-sm text-white rounded-[8px] hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            <FiEdit className="mr-2" /> Edit
          </button>
          {/* Share button */}
          <button
            className="flex items-center w-full px-3 py-2 text-sm text-white rounded-[8px] hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}
          >
            <FiShare className="mr-2" /> Share
          </button>
          {/* Delete button */}
          <button
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 rounded-[8px] hover:bg-gray-600"
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