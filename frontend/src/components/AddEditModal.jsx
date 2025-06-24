import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import ReactQuill from "react-quill-new";

import noteContext from "../context/notes/noteContext";
import { useTheme } from "../context/theme/ThemeContext";

export const AddEditModal = ({
  isOpen,
  closeModal,
  editNote,
  noteToEdit = null,
}) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const { theme } = useTheme();

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [isTagEnabled, setIsTagEnabled] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const disabled =
    note.title.length < 3 ||
    note.description.length < 5 ||
    (isTagEnabled && !note.tag.trim());

  // Clear tag when toggle off
  useEffect(() => {
    if (!isTagEnabled) {
      setNote((prev) => ({ ...prev, tag: "" }));
    }
  }, [isTagEnabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim().length < 3)
      return toast.error("Title must be at least 3 characters.");
    if (note.description.trim().length < 5)
      return toast.error("Description must be at least 5 characters.");

    try {
      if (noteToEdit) {
        editNote(noteToEdit._id, note.title, note.description, note.tag);
        toast.success("Note updated!");
      } else {
        addNote(note.title, note.description, note.tag);
        toast.success("New note added!");
      }
      handleClose();
    } catch {
      toast.error("Request failed. Try again.");
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleQuillChange = (value) => {
    setNote({ ...note, description: value });
  };

  // Reset form when opening or editing
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setIsClosing(false);
    } else if (showModal) {
      setIsClosing(true);
      const timeout = setTimeout(() => {
        setShowModal(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div
        className={`relative p-4 w-full max-w-2xl max-h-full ${
          isClosing ? "animate-zoom-out-scale" : "animate-zoom-in-scale"
        }`}
      >
        <div
          className={`relative rounded-lg shadow-sm flex flex-col max-h-[90vh] ${
            theme === "dark" ? "bg-gray-900" : "bg-slate-300"
          }`}
        >
          {/* Header */}
          <div
            className={`relative flex items-center justify-end p-4 border-b rounded-t ${
              theme === "dark" ? "border-gray-200" : "border-gray-900"
            } `}
          >
            <h3
              className={`absolute left-1/2 -translate-x-1/2 text-3xl font-bold ${
                theme === "dark" ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {noteToEdit ? "Edit Note" : "Add Note"}
            </h3>
            <button
              type="button"
              onClick={handleClose}
              className={`rounded-lg text-sm w-8 h-8 flex items-center justify-center ${
                theme === "dark"
                  ? "text-gray-400 hover:bg-gray-600"
                  : "text-gray-900 hover:bg-slate-200"
              }`}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-4 flex-1">
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className={`block mb-2 text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                    minLength={3}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter note title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className={`block mb-2 text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Description
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={note.description}
                    id="description"
                    onChange={handleQuillChange}
                    placeholder="Write your description here..."
                    className="custom-quill"
                    style={{ minHeight: 200 }}
                  />
                </div>

                {/* Enable Tag Toggle */}
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      onChange={() => setIsTagEnabled((v) => !v)}
                      checked={isTagEnabled}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    <span
                      className={`ms-3 text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Enable Tag
                    </span>
                  </label>
                </div>

                {/* Tag Field */}
                <div>
                  <label
                    htmlFor="tag"
                    className={`block mb-2 text-sm font-medium ${
                      theme === "dark" ? "text-gray-200" : "text-gray-900"
                    }`}
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 ${
                      !isTagEnabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter tag (optional)"
                    disabled={!isTagEnabled}
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={disabled}
              >
                {noteToEdit ? (
                  <FiEdit className="w-5 h-5 mr-2" />
                ) : (
                  <IoMdAdd className="w-5 h-5 mr-1" />
                )}
                {noteToEdit ? " Update Note" : " Add Note"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
