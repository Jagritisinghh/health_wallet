const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {db}=require("../database/db");
require("dotenv").config();

const JWT_SECRET=process.env.SECRET_KEY;
exports.register=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const hashedPassword=await bcrypt.hash(password,10);
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(sql,[username, hashedPassword],function(err){
            if(err){
                console.log(err)
                return res.status(400).json({error:"username already exists"});
            }
            res.status(201).json({message:"User registered successfully",userId:this.lastID})
        });

    }catch(err){
        req.status(500).json({error:"Server Error"});
    }

}


exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = `SELECT * FROM users WHERE username = ?`;

    db.get(sql, [username], async (err, user) => {
        if (err || !user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
        res.json({ message: "Login successful", token });
    });
};


exports.searchUser = (req, res) => {
    const { username } = req.query; 

    if (!username) return res.status(400).json({ error: "Username query missing" });

    const sql = `SELECT id, username FROM users WHERE username LIKE ? LIMIT 5`;
    
    db.all(sql, [`%${username}%`], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};


exports.getAllUsers=(req,res)=>{
    const sql=`SELECT id,username FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows); // Saare users ki list yahan se jayegi
    });

}