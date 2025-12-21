const express =require("express");
const cors=require("cors");
const {initDB}=require('./database/schema');
const app=express();

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes=require("./routes/userRoutes")
const reportRoutes=require("./routes/reportRoutes")
const vitalRoutes = require("./routes/vitalRoutes");

//initialize the DB
initDB();


// Use the Routes
app.use("/api/users",userRoutes);
app.use("/api/reports",reportRoutes);
app.use("/api/vitals", vitalRoutes);


app.listen(3000,()=>{
    console.log("server is listening at port 3000");
})