import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { NoteItem } from './NoteItem';
import { useNavigate } from 'react-router';
import "animate.css"
import TrackVisibility from "react-on-screen"
import { AddNotes } from './AddNotes';
import toast from 'react-hot-toast';

export const Notes = (props) => {
    // To update Top Loading Bar and change Title of tab 
    const updateProgress = () => {
        props.setProgress(100);
        document.title = "Your Notes - iNotebook";
    }
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, fetchNotes, editNote, deleteNote } = context;

    // let notesArray = [];
    // for (let key in notes) {
    //     notesArray.push([key, notes[key]])
    // }

    // Function call using useEffect
    useEffect(() => {
        updateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps

        if (localStorage.getItem("token")) {
            fetchNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);
    // State of note set with id & edited (title, description, tag) 
    const [note, setNote] = useState({ id: "", Etitle: "", Econtent: "" });

    // Updated content of note is added & also closes model with ref to close btn
    const handleSubmit = async () => {
        try {
            await editNote(note.id, note.Etitle, note.Econtent);
            refClose.current.click();
            toast.success("New note added")
        } catch {
            toast.error("Could not create a note, Please try again later.")
        }
    }
    // Set the title, description & tag of updated note
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value || "" })
    }
    // useRef to populate the previous data fields
    const ref = useRef("");
    const refClose = useRef("");
    // Function to update a note & set state of note with all 4 attributes
    const updateNote = (currentNote) => {
        try {
            ref.current.click();
            setNote({ id: currentNote.id, Etitle: currentNote.title, Econtent: currentNote.content });
            toast.success("Note updated")
        } catch (error) {
            console.log("Error deleting note:", error);
            toast.error("Could not update note, Please try again later.")
        }
    };

    const delNote = async (note) => {
        try {
            await deleteNote(note.id);
            toast.success("Note deleted")
        } catch (err) {
            toast.error("Could not delete note, Please try again later.")
        }
    };

    return (
        <>
            {/* Import new notes from AddNote component */}
            <AddNotes />

            {/*  Modal to Update Note  */}
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal"></button>
            <div className="modal fade mt-3" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 notes--title-modal" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form of Note */}
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label notes--field">Title</label>
                                    <input type="text" className="form-control" id="Etitle" name="Etitle" aria-describedby="emailHelp" autoComplete='off' value={note.Etitle || ""} onChange={onChange} minLength={3} required />
                                    <div id="textHelp" className="form-text-modal">*Title must be atleast 3 characters long.</div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label notes--field">Description</label>
                                    <input type="text" className="form-control" id="Econtent" name='Econtent' autoComplete='off' value={note.Econtent || ""} onChange={onChange} minLength={5} required />
                                    <div id="contentHelp" className="form-text-modal">*Description must be atleast 5 characters long.</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary btn-block my-2 updatenote--btn" disabled={note.Etitle.length < 3 || note.Econtent.length < 5} onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 mt-5 --notes">
                <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                            <h3 className='your-notes--title mt-1 mb-2'>Your Notes</h3>
                        </div>
                    }
                </TrackVisibility>
                <div className="container mx-1 my-1">
                    {notes.length === 0 && "No notes to display, Please add a note."}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note.id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}