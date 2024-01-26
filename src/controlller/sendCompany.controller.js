const { sendEmail } = require('../services/sendCompnay.service')
const sendCompanySchema = require('../models/sendCompany.model');
const { ResponseStructure } = require("../helpers/ResponseStructure");

const controller = {}

controller.sendCompany = async (req, res) => {
  try {
    
    const body = req.body;
    const newCompany = new sendCompanySchema(body);
    await newCompany.save();

    const emailContent = `
      <p>Los datos de la nueva empresa son:</p>
      <ul>
        <li>Nombre: ${newCompany.nameCompany}</li>
        <li>Teléfono: ${newCompany.telephone}</li>
        <li>NIT: ${newCompany.tenantId}</li>
        <li>Email: ${newCompany.email}</li>
        <li>Dirección: ${newCompany.direction}</li>
        <li>Runt: ${newCompany.pdfRunt }</li>
      </ul>
    `;

    await sendEmail({
      to: 'litterbox212@gmail.com',
      subject: 'Solicitud de Nueva Empresa',
      html: emailContent
    });

    ResponseStructure.status = 201;
    ResponseStructure.message = "Datos de empresa enviados exitosamente";
    ResponseStructure.data = newCompany;
    res.status(ResponseStructure.status).send(ResponseStructure);
  }  catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors
      });
    }

    // Manejo de otros errores
    res.status(500).json({
      message: "Error interno del servidor"
    });
  }
};

module.exports = controller;
