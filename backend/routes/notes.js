const express = require('express')
const { body, validationResult } = require('express-validator')

const Notes = require('../models/Notes');
const authenticateToken = require('../middleware/authenticateToken')

const router = express.Router();

// ROUTE ENDPOINT NO: 1
// Add new Notes using POST method on "/api/notes/addnote" (Login required)
router.post("/addnote", authenticateToken, [
    body('title', "Title must be atleast 3 characters long").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 characters long").isLength({ min: 5 }),
    body('tag', "Tag must be given").exists(),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

        // Put all the fields of notes in request user id as an object
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // Save the note and send the response
        const savedNote = await note.save();

        res.status(201).json({ message: 'Note created successfully', savedNote });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
});

// ROUTE ENDPOINT NO: 2
// Get all Notes using GET method on "/api/notes/fetchnotes" (Login required)
router.get("/fetchnotes", authenticateToken, async (req, res) => {
    try {
        // Find all the notes with a user id
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
})

// ROUTE ENDPOINT NO: 3
// Update an exsisting Note using PUT method on "/api/notes/updatenote/:id" (Login required)
router.put("/updatenote/:id", authenticateToken, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const noteId = req.params.id; // Capture ID from params

        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;

        // Check for empty update fields early
        if (Object.keys(newNote).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        // Find the note
        let note = await Notes.findById(noteId);

        if (!note) {
            return res.status(404).send("Note NOT Found!");
        }

        // Validate user field exists before conversion
        if (!note.user) {
            return res.status(403).send("Owner information missing");
        }

        // Compare owner ID safely
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized access");
        }

        // Perform update using captured ID
        const updatedNote = await Notes.findByIdAndUpdate(
            noteId,
            { $set: newNote },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send("Note NOT Found after update!");
        }

        res.json({
            success: true,
            message: 'Note updated successfully',
            note: updatedNote
        });

    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
});

// ROUTE ENDPOINT NO: 4
// Delete an exsisting Note using DELETE method on "/api/notes/deletenote/:id" (Login required)
router.delete('/deletenote/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // Find the note to be deleted
        let note = await Notes.findById(id);
        // If note doesnot exsists send status "404"
        if (!note) { return res.status(404).send("Not Found") };
        // If the note does not belong to that user send status "401"
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized access")
        }
        // Use method of find by ID & delete, send user id (given in parameter)
        note = await Notes.findByIdAndDelete(id);
        // Send that response of updated note
        res.json({ success: "true", message: "Note has been deleted successfully", note: note });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
})

module.exports = router;