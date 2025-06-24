import { useContext, useEffect, useState, useRef } from "react";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";

import noteContext from "../context/notes/noteContext";
import { useTheme } from "../context/theme/ThemeContext";

import { Spinner } from "./Spinner";
import { AddEditModal } from "./AddEditModal";
import { DeleteModal } from "./DeleteModal";
import { NoteOptionsMenu } from "./NoteOptionsMenu";

export const Sidebar = ({ open, onOpenNote }) => {
  const context = useContext(noteContext);
  const { theme } = useTheme();

  const { loading, notes, fetchNotes, editNote } = context;

  const [showSpinner, setShowSpinner] = useState(true);

  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setShowSpinner(true);
    fetchNotes();
    // Show spinner for at least 3 seconds
    const timer = setTimeout(() => setShowSpinner(false), 3500);
    return () => clearTimeout(timer);
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

  const handleOpenNote = (note) => {
    setSelectedNote(note);
    if (onOpenNote) {
      onOpenNote(note);
    }
    setMenuOpenId(null);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] ${
          open ? "w-72" : "w-0"
        } shadow-lg z-40 flex flex-col transition-all duration-300 overflow-hidden border-r ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-gray-200 border-slate-300 text-black"
        }`}
      >
        {open && (
          <>
            {/* Header */}
            <div
              className={`flex items-center justify-center px-4 py-4 z-50 border-b ${
                theme === "dark" ? "border-gray-700" : "border-slate-300"
              }`}
            >
              <h2 className="text-xl font-bold">Your Notes</h2>
            </div>
            {/* Content */}
            <div className="p-4 flex flex-col gap-4 flex-1 h-0">
              <button
                onClick={handleAddNote}
                className={`flex items-center justify-center gap-2 font-medium rounded-lg text-sm px-4 py-2 ${
                  theme === "dark"
                    ? "text-white bg-gray-600 hover:bg-gray-700"
                    : "text-black bg-slate-300 hover:bg-slate-400"
                }`}
                type="button"
              >
                <IoMdAdd className="w-5 h-5" /> Add Note
              </button>
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <Spinner />
                ) : Array.isArray(notes) && notes.length === 0 ? (
                  <div className="text-gray-400 text-center mt-10">
                    No notes to display.
                  </div>
                ) : Array.isArray(notes) ? (
                  <ul className="space-y-1">
                    {notes.map((note) => (
                      <li
                        key={note._id}
                        className={`flex items-center justify-between group rounded px-2 py-1 cursor-pointer transition-colors duration-200
                        ${
                          selectedNote?._id === note._id
                            ? theme === "dark"
                              ? "bg-blue-700 text-white"
                              : "bg-blue-200 text-black"
                            : theme === "dark"
                            ? "hover:bg-gray-600 text-white"
                            : "hover:bg-slate-300 text-black"
                        }
                      `}
                      >
                        <span
                          className="truncate flex-1"
                          onClick={() => handleOpenNote(note)}
                          title={note.title}
                        >
                          {note.title}
                        </span>

                        <NoteOptionsMenu
                          note={note}
                          menuOpenId={menuOpenId}
                          setMenuOpenId={setMenuOpenId}
                          onEdit={handleEditNote}
                          onDelete={(note) => {
                            setNoteToDelete(note);
                            setDeleteModalOpen(true);
                          }}
                          menuRefs={menuRefs}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-red-400 text-center mt-10">
                    Error loading notes. Please try again later.
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
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
