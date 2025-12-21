const {db}=require("../database/db");


//upload report

exports.uploadReport=(req,res)=>{
    console.log(req.file);
    console.log(req.user);
    if(!req.file){
        return res.status(400).json({ error: "Please upload a file" });
    }

    const {category,report_date}=req.body;
    const userId=req.user.id;
    const filename=req.file.originalname;
    const filepath=req.file.path;

    const sql=`INSERT INTO reports (user_id, filename, file_path, category, report_date) 
                 VALUES (?, ?, ?, ?, ?)`;
    db.run(sql,[userId,filename,filepath,category,report_date],function(err){
       if (err) {
            return res.status(500).json({ error: "Database error while saving report" });
        }
        res.status(201).json({ 
            message: "Report uploaded successfully!", 
            reportId: this.lastID 
        });
    });
};


// fetch user reports

exports.getUserReports=(req,res)=>{
    const user_id=req.user.id;
    const sql=`SELECT * FROM reports WHERE user_id=? ORDER BY report_date DESC`;
    db.all(sql,[user_id],(err,rows)=>{

        if(err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });

};


exports.shareReport = (req, res) => {
    const { report_id, receiver_id, permission_type, expiry_date } = req.body;
    const sender_id = req.user.id; 
    if (!report_id || !receiver_id) {
        return res.status(400).json({ error: "Report ID aur Receiver ID required hain" });
    }

    const sql = `INSERT INTO shares (report_id, sender_id, receiver_id, permission_type, expiry_date) 
                 VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [report_id, sender_id, receiver_id, permission_type || 'view', expiry_date], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Report shared successfully!" });
    });
};

exports.getSharedWithMe = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT r.*, u.username as shared_by, s.permission_type 
        FROM shares s
        JOIN reports r ON s.report_id = r.id
        JOIN users u ON s.sender_id = u.id
        WHERE s.receiver_id = ? AND (s.expiry_date IS NULL OR s.expiry_date > CURRENT_DATE)`;

    db.all(sql, [userId], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};