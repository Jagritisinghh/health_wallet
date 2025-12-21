const {db}=require("./db");

const initDB=()=>{
    db.serialize(()=>{
        //Users table
        db.run(
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT)`
        );

        //REPORTS
        db.run(`CREATE TABLE IF NOT EXISTS reports(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            filename TEXT,
            file_path TEXT,
            category TEXT,
            report_date DATE,
            upload_date DATETIME  DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) references users(id)
            )`);

        //vitals table
        db.run(`CREATE TABLE IF NOT EXISTS vitals(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            vital_name TEXT,     
            value REAL,        
            unit TEXT,          
            recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(user_id) REFERENCES users(id)
            )`);

        //shares table
       db.run(`CREATE TABLE IF NOT EXISTS shares (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        report_id INTEGER NOT NULL,
        sender_id INTEGER NOT NULL,  
        receiver_id INTEGER NOT NULL, 
        permission_type TEXT DEFAULT 'view',
        expiry_date DATE,
        shared_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(report_id) REFERENCES reports(id) ON DELETE CASCADE,
        FOREIGN KEY(sender_id) REFERENCES users(id),
        FOREIGN KEY(receiver_id) REFERENCES users(id)
)`);
      console.log("Health wallet schema initialized");
    });
}

module.exports={initDB}