const Controller = {};

const {
  newCompanyService,
  getCompanies,
  deleteCompany,
  approveCompany
} = require("../services/company.service");

Controller.createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    const newCompany = await newCompanyService(companyData); // Corregir aquí
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

Controller.approveCompany = async (req, res) => {
  const companyId = req.params.id;
  try {
    const approvedCompany = await approveCompany(companyId); // Corregir aquí
    res.status(200).json(approvedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

Controller.getCompanies = async (req, res) => {
  const listCompanies = await getCompanies();
  res.json(listCompanies);
};

Controller.deleteCompany = async (req, res) => {
  const idParam = req.params.idCompany;
  const response = await deleteCompany(idParam);
  res.send(response);
};

module.exports = Controller;
