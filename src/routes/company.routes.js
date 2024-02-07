const express = require('express');
const router = express.Router();


const {
    getCompanies,
    createCompany,
    deleteCompany,
    approveCompany
} = require("../controlller/company.controller");

router.get("/getAllCompanies", getCompanies);
router.post("/saveNewCompany", createCompany);
router.put('/companies/:id/approve', approveCompany);
router.delete("/deleteCompany/:idCompany", deleteCompany);

module.exports = router;
