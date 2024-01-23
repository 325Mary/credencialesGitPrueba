const express = require('express');
const router = express.Router();
const {sendCompany} = require('../controlller/company.controller')
const pdfUpload = require('../middleware/pdfmulder');



router.post('/sendCompany', pdfUpload.single("pdfRunt"), sendCompany);


module.exports = router;