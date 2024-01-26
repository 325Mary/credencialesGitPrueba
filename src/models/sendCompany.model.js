const {model, Schema} = require('mongoose')

const sendCompanySchema= new Schema({
        nameCompany: {type: String,
        required:[true, 'nombre empresa es requerido']},
        telephone: {type: String,
        required: [true, 'numero de empresa requerido']},
         tenantId: {type: String,
        required: [true, 'Nit de la empresa requerido'],
        unique: true},
        email: {type: String,
        required:[true, 'correo requerido'],
        unique: true},
        direction: {type: String,
        required: [true, 'direccion requerida']},
        pdfRunt: {type: String,
        required:[true, "Pdf es requerido"]}

})




module.exports = model('sendCompany', sendCompanySchema, "SendCompanys")
