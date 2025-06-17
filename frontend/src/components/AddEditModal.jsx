import { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoMdAdd } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import noteContext from "../context/notes/noteContext";

export const AddEditModal = ({
  isOpen,
  closeModal,
  editNote, // function to update note
  noteToEdit = null, // note object if editing, else null
}) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  useEffect(() => {
    if (noteToEdit) {
      setNote({
        title: noteToEdit.title || "",
        description: noteToEdit.description || "",
        tag: noteToEdit.tag || "",
      });
    } else {
      setNote({ title: "", description: "", tag: "" });
    }
  }, [noteToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters.");
      return;
    }
    if (note.description.trim().length < 5) {
      toast.error("Description must be at least 5 characters.");
      return;
    }
    try {
      if (noteToEdit) {
        editNote(noteToEdit._id, note.title, note.description, note.tag);
        toast.success("Note updated!");
      } else {
        addNote(note.title, note.description, note.tag);
        toast.success("New note added!");
      }
      closeModal();
      setNote({ title: "", description: "", tag: "" });
    } catch {
      toast.error("Request failed. Try again.");
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="relative p-4 w-full max-w-md max-h-full animate-zoom-in-scale">
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {noteToEdit ? "Edit Note" : "Add Note"}
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
            >
              ✕
            </button>
          </div>
          {/* Form */}
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Enter note title"
                />
                <div className="text-xs text-gray-500 mt-1">
                  *Title must be at least 3 characters long.
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                  minLength={5}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Enter note description"
                />
                <div className="text-xs text-gray-500 mt-1">
                  *Description must be at least 5 characters long.
                </div>
              </div>
              <div>
                <label
                  htmlFor="tag"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Tag
                </label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  placeholder="Enter tag (optional)"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Enter tag to easily categorize notes.
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
              disabled={note.title.length < 3 || note.description.length < 5}
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
  );
};
