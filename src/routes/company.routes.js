const express = require('express');
const router = express.Router();


const {
    getCompanies,
    newCompany,
    deleteCompany,
} = require("../controlller/company.controller");

router.get("/getAllCompanies", getCompanies);
router.post("/saveNewCompany", newCompany);
router.delete("/deleteCompany/:idCompany", deleteCompany);

module.exports = router;
