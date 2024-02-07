const { model, Schema } = require('mongoose');

const companySchema = new Schema({
    nameCompany: {
        type: String,
        required: [true, 'Nombre de la empresa es requerido']
    },
    telephone: {
        type: String,
        required: [true, 'Número de empresa requerido']
    },
    tenantId: {
        type: String,
        required: [true, 'NIT de la empresa requerido'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Correo requerido'],
        unique: true
    },
    direction: {
        type: String,
        required: [true, 'Dirección requerida']
    },
    pdfRunt: {
        type: String,
        required: [true, 'PDF es requerido']
    },
    estado: {
        type: String,
        enum: ['pendiente', 'aprobado', 'denegado'],
        default: 'pendiente'
    },
    nameManager: {
        type:String, 
        required: [false, 'nombre de gerente es requerido']
    },
    telephonePersonal: {
        type: String,
        required:[false, 'Telefono personal es requerido']
    },
    directionPersonal: {
        type: String,
        required:[false, 'direccion personal es requerida']
    },
    emailPersonal:{
        type: String,
        required: [false, 'correo personal es requerido']
    },
    passwordManager: {
        type: String,
        default: 'gtk-lsw'
    }
});

module.exports = model('company', companySchema, 'companys');
