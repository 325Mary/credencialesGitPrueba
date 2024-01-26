const {model, Schema} = require('mongoose')


const companySchema = new Schema ({
    nameCompany : { type: String, 
        required:[true, ' nombre de compañia es reuqerido']},
    tenantId: { type: String,
        required:[true, 'Nit de la empresa es requerido']},
    email: { type: String,
        required: [true, 'email de la empresa es requerido']},
    
    })

module.exports = model ("company",companySchema, "companys" )