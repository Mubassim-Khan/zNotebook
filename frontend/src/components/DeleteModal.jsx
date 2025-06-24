import { MdDelete } from "react-icons/md";
import { useTheme } from "../context/theme/ThemeContext";

export const DeleteModal = ({
  removeArticle,
  articleId,
  onClose,
  isOpen,
  noteTitle,
}) => {
  if (!isOpen) return null;
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`rounded-lg shadow-lg p-6 w-full animate-zoom-in-scale max-w-sm ${
          theme === "dark" ? "bg-gray-900" : "bg-slate-300"
        }`}
      >
        <h2 className="text-3xl font-bold mb-4">Delete Note</h2>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{noteTitle}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            className={`px-4 py-2 rounded ${
              theme === "dark"
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gray-400 hover:bg-gray-500"
            } `}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex items-center px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={() => removeArticle(articleId)}
          >
            <MdDelete className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};