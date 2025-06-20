import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import noteContext from "../context/notes/noteContext";
import { Sidebar } from "./Sidebar";
import { NoteCard } from "./NoteCard";
import { WelcomePage } from "./WelcomePage";
import { AddEditModal } from "./AddEditModal";
import { DeleteModal } from "./DeleteModal";

export const Notes = ({ open, setProgress }) => {
  // To update Top Loading Bar and change Title of tab
  const updateProgress = () => {
    setProgress(100);
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

  // State for the selected note
  const [activeNote, setActiveNote] = useState(null);

  // State for Modal opening
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const menuRefs = useRef({});

  // Handlers
  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleDeleteNote = (note) => {
    setNoteToDelete(note);
    setDeleteModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        open={open}
        onOpenNote={setActiveNote}
        menuOpenId={menuOpenId}
        setMenuOpenId={setMenuOpenId}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        menuRefs={menuRefs}
      />
      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center transition-all duration-300">
        {activeNote ? (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-full max-w-md min-h-[100px] flex flex-col justify-between">
              <NoteCard
                note={activeNote}
                menuOpenId={menuOpenId}
                setMenuOpenId={setMenuOpenId}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                menuRefs={menuRefs}
              />{" "}
            </div>
          </div>
        ) : (
          <WelcomePage openAddModal={() => setIsModalOpen(true)} />
        )}
      </main>

      <DeleteModal
        articleId={noteToDelete?._id}
        isOpen={deleteModalOpen}
        noteTitle={noteToDelete?.title}
        onClose={() => setDeleteModalOpen(false)}
        removeArticle={async (id) => {
          try {
            await context.deleteNote(id);
            toast.success("Note deleted");
          } catch {
            toast.error("Could not delete note. Try again later.");
          }
          setDeleteModalOpen(false);
          setNoteToDelete(null);
        }}
      />

      {/* AddEditModal for adding a new note */}
      <AddEditModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editNote={context.editNote}
        noteToEdit={selectedNote}
      />
    </div>
  );
};