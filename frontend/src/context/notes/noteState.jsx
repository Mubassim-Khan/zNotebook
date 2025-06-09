import { useState } from "react";
import NoteContext from "./noteContext";
import toast from "react-hot-toast";

const NoteState = (props) => {
    const hostURL = "http://localhost:8080";
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
                    "Authorization": localStorage.getItem("token")
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (err) {
            console.log(err);
        }
    };

    // Add a Note
    const addNote = async (title, content) => {
        // API Call
        const response = await fetch(`${hostURL}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, content })
        });
        const note = await response.json();
        // Method for concatinating notes JSON 
        setNotes(notes.concat(note));
    }

    // Edit a Note
    const editNote = async (id, title, content) => {
        // API Call
        const response = await fetch(`${hostURL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, content }),
        });
        // eslint-disable-next-line
        const json = await response.json();
        // A new variable to set the state according to the JSON (notes)
        const newNotes = JSON.parse(JSON.stringify(notes));
        // Logic for editing a Note
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element.id === id) {
                newNotes[i].title = title;
                newNotes[i].content = content;
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
        const newNotes = notes.filter((note) => { return note.id !== id })
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;