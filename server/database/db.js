const sqlite3=require("sqlite3").verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../digitalHealth.db');
const db=new sqlite3.Database(dbPath,(err)=>{ 
    if (!err) {
        // For Foreign Keys to actually work in SQLite (to prevent deleting a user while they still have reports), you must enable them every time you connect.
        db.run("PRAGMA foreign_keys = ON;");
        console.log("Connected and Foreign Keys enabled.");
    }
    if(err){ 
        return console.log(err.message)}
    console.log("Connected to the SQLite database: digitalHealth.db")
    });
 
module.exports={db};