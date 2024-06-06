const express = require('express');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const pool = require('../db')
const authenticateToken = require("../middleware/authenticateToken")

const router = express.Router();

// Route endpoint: 1
// To register new users ('/api/auth/register')
router.post("/register", [
    body('name', "Name must be atleast 3 characters long").isLength({ min: 3 }),
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Password must be atleast 6 characters long.").isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        const { name, email, password } = req.body;

        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, error: "This Email address is already registered with a user" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ success: true, message: 'User registered successfully' });

        success = true;

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Something went wrong :( (Internal Server Error)", error: error.message })
    }
})

// Route endpoint: 2
// To login user with credentials ('/api/auth/login')
router.post('/login', [
    body('email', "Enter a valid Email address").isEmail(),
    body('password', "Password cannot be blank.").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    try {
        const { email, password } = req.body;

        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_TOKEN);
        console.log(token)
        res.json({ success: true, authtoken: token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route endpoint: 3
// To get all users detail ('/api/auth/getusers')
router.get('/getusers', authenticateToken, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email, password, createdAt FROM users');
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
