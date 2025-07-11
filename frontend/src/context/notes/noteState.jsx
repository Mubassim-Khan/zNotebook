import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const hostURL = import.meta.env.VITE_HOST_URL;
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    // Fetch all Notes
    const fetchNotes = async () => {
        // API Call
        try {
            const response = await fetch(`${hostURL}/api/notes/fetchnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (err) {
            console.log(err);
        }
    };

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API Call
        const response = await fetch(`${hostURL}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const data = await response.json();
        setNotes(notes.concat(data.savedNote));
    }

    // Edit a Note
    const editNote = async (id, title, description, tag) => {
        // API Call
        const response = await fetch(`${hostURL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // eslint-disable-next-line
        const json = await response.json();
        // A new variable to set the state according to the JSON (notes)
        const newNotes = JSON.parse(JSON.stringify(notes));
        // Logic for editing a Note
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${hostURL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
        });
        // eslint-disable-next-line
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;