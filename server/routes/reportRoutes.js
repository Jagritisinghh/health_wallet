const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const reportController = require("../controllers/reportController");
const authenticateToken = require("../middleware/authMiddleware");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
        return cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

router.post("/upload",authenticateToken,upload.single("report"),reportController.uploadReport);
router.get("/",authenticateToken,reportController.getUserReports);
router.post("/share", authenticateToken, reportController.shareReport);
router.get("/shared-with-me", authenticateToken, reportController.getSharedWithMe);

module.exports=router;