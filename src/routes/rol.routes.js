const express = require('express');
const router = express.Router();


const {
    newRol,
    getRoles
} = require("../controlller/rol,controller");

router.get("/getRoles", getRoles);
router.post("/newRol", newRol);

module.exports = router;
