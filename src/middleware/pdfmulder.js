const multer = require("multer")




// En tu archivo multerMiddleware.js
const pdfStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./public/pdfUploads");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    }
});

const pdfUpload = multer({
    storage: pdfStorage,
    fileFilter: (req, file, callback) => {
        // Verificar que el archivo sea un PDF
        if (file.mimetype === "application/pdf") {
            callback(null, true);
        } else {
            callback(new Error("Solo se permiten archivos PDF"));
        }
    }
});

module.exports= pdfUpload