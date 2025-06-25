import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import noteContext from "../context/notes/noteContext";
import { Sidebar } from "./Sidebar";
import { NoteCard } from "./NoteCard";
import { WelcomePage } from "./WelcomePage";
import { AddEditModal } from "./AddEditModal";
import { useTheme } from "../context/theme/ThemeContext";

export const Notes = ({ open, setProgress }) => {
  // To update Top Loading Bar and change Title of tab
  const updateProgress = () => {
    setProgress(100);
    document.title = "Home - zNotebook";
  };

  const { noteId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote, deleteNote } = context;

  // State for the selected note
  const [activeNote, setActiveNote] = useState(null);
  // State for Modal opening
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function call using useEffect
  useEffect(() => {
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      navigate("/login");
    }
  }, []);

  // Set activeNote based on URL param
  useEffect(() => {
    if (noteId && notes.length > 0) {
      const found = notes.find((n) => n._id === noteId);
      setActiveNote(found || null);
    }
  }, [noteId, notes]);

  // When a note is selected, update the URL
  const handleOpenNote = (note) => {
    setActiveNote(note);
    navigate(`/notes/${note._id}`);
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-slate-300"
      }`}
    >
      {/* Sidebar */}
      <Sidebar open={open} onOpenNote={handleOpenNote} />

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center transition-all duration-300">
        {activeNote ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full max-w-md min-h-[100px] flex flex-col justify-between">
              <NoteCard note={activeNote} />
            </div>
          </div>
        ) : (
          <WelcomePage openAddModal={() => setIsModalOpen(true)} />
        )}
      </main>

      {/* AddEditModal for adding a new note */}
      <AddEditModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </div>
  );
};
