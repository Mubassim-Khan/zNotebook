import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import "animate.css"
import TrackVisibility from "react-on-screen"
import toast from "react-hot-toast"
import { Notes } from './Notes';

export const AddNotes = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", content: "", tag: "" });
    // New content of note is added from Context (NoteState)
    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            addNote(note.title, note.content, note.tag);
            setNote({ title: "", content: "", tag: "" });
            toast.success("New note added")
        } catch {
            toast.error("Request timed out.")
        }
    }
    // Set the title, description & tag of a new note
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    };

    return (
        <>
        <div className="container my-3 mt-3">
            <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                        <h3 className='notes--title'>Add a Note</h3>
                    </div>
                }
            </TrackVisibility>

            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label notes--field">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} autoComplete='off' onChange={onChange} minLength={3} required />
                    <div id="textHelp" className="form-text">*Title must be atleast 3 characters long.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label notes--field">Content</label>
                    <input type="text" className="form-control" id="content" name='content' value={note.content} autoComplete='off' onChange={onChange} minLength={5} required />
                    <div id="descriptionHelp" className="form-text">*Description must be atleast 5 characters long.</div>
                </div>
                
                <button disabled={note.title.length < 3 || note.content.length < 5} type="submit" className="btn btn-primary btn-block my-2 addnote--btn" onClick={handleSubmit}>Add Note</button>
            </form>
        </div>

        <Notes />
        </>
    )
}