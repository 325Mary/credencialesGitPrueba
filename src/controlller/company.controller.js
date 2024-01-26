const Controller = {};

const {
    newCompany,
    getCompanies,
    deleteCompany
} = require("../services/company.service");


Controller.getCompanies = async (req, res) => {
  const listCompanies = await getCompanies();
  res.json(listCompanies); 
};

Controller.newCompany = async (req, res) => {
  await newCompany(req.body);
  res.send("Empresa guardada exitosamente");
};

Controller.deleteCompany = async (req, res) => {
  const idParam = req.params.idCompany;
  const response = await deleteCompany(idParam);
  res.send(response);
};

module.exports = Controller;
