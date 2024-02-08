const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/userAuthentication')



const {
    getCompanies,
    createCompany,
    deleteCompany,
    approveCompany,
    getCompaniesSuperU
} = require("../controlller/company.controller");

router.get("/getAllCompanies",  getCompanies);
router.post("/saveNewCompany", createCompany);
router.put('/companies/:id/approve', approveCompany);
router.delete("/deleteCompany/:idCompany", deleteCompany);
router.get('/getAllCompanies-SuperUsuario', getCompaniesSuperU)

module.exports = router;
