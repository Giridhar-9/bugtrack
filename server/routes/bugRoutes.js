const express = require("express");
const router = express.Router();

const db = require("../db");

// GET all bugs
router.get("/", (req, res) => {
    const sql = "SELECT * FROM bugs";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to fetch bugs"
            });
        }

        res.json(results);
    });
});

// CREATE a new bug
router.post("/", (req, res) => {
    const {
        title,
        description,
        status,
        priority,
        severity,
        assigned_to
    } = req.body;

    if (!title || !title.trim() || !description || !description.trim()) {
        return res.status(400).json({
            message: "Title and description are required"
        });
    }
    
    const sql = `
        INSERT INTO bugs
        (title, description, status, priority, severity, assigned_to)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        description,
        status || "OPEN",
        priority || "MEDIUM",
        severity || "MEDIUM",
        assigned_to || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to create bug"
            });
        }

        res.status(201).json({
            message: "Bug created successfully",
            bugId: result.insertId
        });
    });
});

// GET a single bug by ID
router.get("/:id", (req, res) => {
    const bugId = req.params.id;

    const sql = "SELECT * FROM bugs WHERE id = ?";

    db.query(sql, [bugId], (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to fetch bug"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Bug not found"
            });
        }

        res.json(results[0]);
    });
});

// UPDATE a bug by ID
router.put("/:id", (req, res) => {
    const bugId = req.params.id;

    const {
        title,
        description,
        status,
        priority,
        severity,
        assigned_to
    } = req.body;

    const sql = `
        UPDATE bugs
        SET title = ?,
            description = ?,
            status = ?,
            priority = ?,
            severity = ?,
            assigned_to = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `;

    const values = [
        title,
        description,
        status,
        priority,
        severity,
        assigned_to || null,
        bugId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to update bug"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bug not found"
            });
        }

        res.json({
            message: "Bug updated successfully"
        });
    });
});

// DELETE a bug by ID
router.delete("/:id", (req, res) => {
    const bugId = req.params.id;

    const sql = "DELETE FROM bugs WHERE id = ?";

    db.query(sql, [bugId], (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to delete bug"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Bug not found"
            });
        }

        res.json({
            message: "Bug deleted successfully"
        });
    });
});

module.exports = router;