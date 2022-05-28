const express = require("express");
const router = express.Router();
const {uploadController,getAllController} = require("../controllers/transactionController")
const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(xls|xlsx)$/)) {
            return cb(new Error('Please upload an excel file'))
        }
        cb(undefined, true)
    }
})

router.post("/upload", upload.single('file'),uploadController);
router.get("/history", getAllController);

module.exports = router;