import { useContext, useEffect, useState, useRef } from "react";
import { IoMdMenu, IoMdClose, IoMdAdd } from "react-icons/io";
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

import noteContext from "../context/notes/noteContext";
import { Spinner } from "./Spinner";
import { AddEditModal } from "./AddEditModal";
import { DeleteModal } from "./DeleteModal";

export const Sidebar = ({ onOpenNote }) => {
  const context = useContext(noteContext);
  const { loading, notes, fetchNotes, addNote, editNote } = context;

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const menuRefs = useRef({});

  if (!context) {
    console.log("Note Context is null");
    return <Spinner />;
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpenId &&
        menuRefs.current[menuOpenId] &&
        !menuRefs.current[menuOpenId].contains(event.target)
      ) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpenId]);

  // Fetch notes on mount
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const handleAddNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    setMenuOpenId(null);
  };

  const handleDeleteNote = async (note) => {
    try {
      await deleteNote(note._id);
      toast.success("Note deleted");
      setMenuOpenId(null);
    } catch {
      toast.error("Could not delete note, Please try again later.");
    }
  };

  const handleOpenNote = (note) => {
    if (onOpenNote) {
      onOpenNote(note);
    }
    setSidebarOpen(false);
    setMenuOpenId(null);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`h-screen w-72 bg-gray-800 shadow-lg z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Notes</h2>
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-4 h-[calc(100%-64px)]">
          <button
            onClick={handleAddNote}
            className="flex items-center justify-center gap-2 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            type="button"
          >
            <IoMdAdd className="w-5 h-5" /> Add Note
          </button>
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <Spinner />
            ) : notes.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                No notes to display.
              </div>
            ) : (
              <ul className="space-y-1">
                {notes.map((note) => (
                  <li
                    key={note._id}
                    className="flex items-center justify-between group hover:bg-gray-600 rounded px-2 py-1 cursor-pointer"
                  >
                    <span
                      className="truncate flex-1"
                      onClick={() => handleOpenNote(note)}
                      title={note.title}
                    >
                      {note.title}
                    </span>
                    <div className="relative flex-shrink-0 ml-2">
                      <button
                        className="p-1 rounded-full hover:bg-gray-700 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(
                            menuOpenId === note._id ? null : note._id
                          );
                        }}
                        aria-label="Note options"
                      >
                        <FiMoreVertical size={18} />
                      </button>
                      {menuOpenId === note._id && (
                        <div
                          ref={(el) => (menuRefs.current[note._id] = el)}
                          className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50"
                        >
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-100"
                            onClick={() => handleEditNote(note)}
                          >
                            <FiEdit className="mr-2" /> Edit
                          </button>
                          <button
                            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                            onClick={() => {
                              setNoteToDelete(note);
                              setDeleteModalOpen(true);
                              setMenuOpenId(null);
                            }}
                          >
                            <FiTrash2 className="mr-2" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar Toggle Button */}
      {!sidebarOpen && (
        <button
          className="fixed top-5 left-5 z-50 p-2 rounded-full bg-blue-700 text-white shadow-lg hover:bg-blue-800 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <IoMdMenu size={28} />
        </button>
      )}
<DeleteModal
  removeArticle={async (id) => {
    try {
      await context.deleteNote(id);
      toast.success("Note deleted");
    } catch {
      toast.error("Could not delete note, Please try again later.");
    }
    setDeleteModalOpen(false);
    setNoteToDelete(null);
  }}
  articleId={noteToDelete?._id}
  isOpen={deleteModalOpen}
  onClose={() => setDeleteModalOpen(false)}
  noteTitle={noteToDelete?.title}
/>

      <AddEditModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editNote={editNote}
        noteToEdit={selectedNote}
      />

    </>
  );
};
