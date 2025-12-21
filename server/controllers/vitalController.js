const { db } = require("../database/db");

exports.addVital = (req, res) => {
    const { vital_name, value, unit } = req.body;
    const userId = req.user.id; 

    if (!vital_name || !value) {
        return res.status(400).json({ error: "Please enter Vital name and value" });
    }

    const sql = `INSERT INTO vitals (user_id, vital_name, value, unit) VALUES (?, ?, ?, ?)`;
    
    db.run(sql, [userId, vital_name, value, unit], function(err) {
        if (err) return res.status(500).json({ error: "Database error: " + err.message });
        
        res.status(201).json({ 
            message: "Vital data saved!", 
            vitalId: this.lastID 
        });
    });
};

exports.getUserVitals = (req, res) => {
    const userId = req.user.id;
    const sql = `SELECT * FROM vitals WHERE user_id = ? ORDER BY recorded_at DESC`;

    db.all(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};