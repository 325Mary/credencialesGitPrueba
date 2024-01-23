const multer = require("multer");

const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.join(__dirname, '../public/pdfUploads');
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});


const pdfUpload = multer({
    storage: storage,
});

module.exports = pdfUpload;
