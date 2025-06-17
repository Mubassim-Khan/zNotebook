import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import noteContext from "../context/notes/noteContext";
import { Sidebar } from "./Sidebar";
import { NoteCard } from "./NoteCard";

export const Notes = (props) => {
  // To update Top Loading Bar and change Title of tab
  const updateProgress = () => {
    props.setProgress(100);
    document.title = "Your Notes - zNotebook";
  };

  let navigate = useNavigate();
  // Function call using useEffect
  useEffect(() => {
    updateProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (localStorage.getItem("token")) {
      fetchNotes();
    } else {
      toast.error("Login Required.");
      navigate("/login");
    }
  }, []);

  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote, deleteNote } = context;

  // For the welcome message
  const showLoggedInUsername = () => localStorage.getItem("name");

  // State for the selected note
  const [activeNote, setActiveNote] = useState(null);

  // Optional: For the "Create Blog" button
  const [writing, setWriting] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onOpenNote={setActiveNote}
      />

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center transition-all duration-300">
        {activeNote ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full max-w-md min-h-[100px] flex flex-col justify-between">
              <NoteCard note={activeNote} />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center justify-center">
            <p className="mb-8 font-bold text-5xl my-2 text-center flex flex-wrap justify-center">
              Welcome,
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-red-500 bg-clip-text text-transparent ml-3">
                {showLoggedInUsername()}
              </span>
            </p>
            <button
              onClick={() => setWriting(true)}
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-lg px-8 py-4 text-center mb-2 mt-5 shadow-lg"
            >
              Create Blog
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
