import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

  let navigate = useNavigate();
    const { theme } = useTheme();
  
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

  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote, deleteNote } = context;

  // State for the selected note
  const [activeNote, setActiveNote] = useState(null);

  // State for Modal opening
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex min-h-screen ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-slate-300"
    }`}>
      {/* Sidebar */}
      <Sidebar open={open} onOpenNote={setActiveNote} />

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
