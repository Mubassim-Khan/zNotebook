const express = require('express')
const pool = require('../db')
const authenticateToken = require('../middleware/authenticateToken')
const { body, validationResult } = require('express-validator')

const router = express.Router();

router.post("/addnote", authenticateToken, [
    body('title', "Title must be atleast 3 characters long").isLength({ min: 3 }),
    body('content', "Content must be atleast 5 characters long").isLength({ min: 5 }),
], async (req, res) => {
    const { title, content } = req.body;
    const userID = req.user.userId;

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const [result] = await pool.query('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, userID]);
        const note = { id: result.insertId, title, content, user_id: userID };
        res.status(201).json({ message: 'Note created successfully', note });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
});

router.get("/fetchnotes", authenticateToken, async (req, res) => {
    const userID = req.user.userId;

    try {
        const [notes] = await pool.query('SELECT * FROM notes WHERE user_id = ?', [userID]);
        res.json(notes);

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
})

router.put("/updatenote/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userID = req.user.userId;

    try {
        const [result] = await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?', [title, content, id, userID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ success: "true", message: 'Note updated successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
})

router.delete('/deletenote/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const userID = req.user.userId;

    try {
        const [result] = await pool.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [id, userID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ success: "true", message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong. Internal Server Error" });
    }
})

module.exports = router;