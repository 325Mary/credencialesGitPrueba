const companySchema = require('../models/compay.model');


const newCompany = async (company) => {
  
    let newCompany = new companySchema(company);
    return await newCompany.save();
  };

const getCompanies = async () => {
    return await companySchema.find();
  };
   
const deleteCompany = async (id) => {
    try {
      const company = await companySchema.findOne({ _id: id });
      if (company) {
        await companySchema.findOneAndDelete({ _id: id });
        return "Empresa eliminado con exito";
      } else {
        return "No se encontro esta empresa";
      }
    } catch (error) {
      return "Ocurrio un error eliminado el empresa";
    }
  };

module.exports = {
    newCompany,
    getCompanies,
    deleteCompany
};
