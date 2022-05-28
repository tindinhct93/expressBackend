const express = require("express");
const router = express.Router();
const {uploadController,getAllController} = require("../controllers/transactionController")
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  'a-' + Date.now())
    }
})

const upload = multer({
    storage: storage,
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

router.post("/upload", upload.array('arrayOfExcelFile',5),uploadController);
router.get("/history", getAllController);

//export function from controller
//router.post...................

module.exports = router;