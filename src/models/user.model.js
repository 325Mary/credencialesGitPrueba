const {model, Schema} = require('mongoose')

const userSchema= new Schema({
    username: {type: String,
        required:[true, 'nombre requerido']},
    empresa: {type: String,
        required: [true, 'nombre de empresa requerido']},
    tenantId: {type: String,
        required: [true, 'Nit de la empresa requerido'],
        // unique:false
        },
    email: {type: String,
        required:[true, 'correo requerido'],
        unique: true},
    password: {type: String,
        required: [true, 'constraseña requerida']},
    imgfirme: {type: String,
        required:[true, 'Imagen de firma es requerida']},
    // pdfArchivo: {type: String,
    // required:[false, "Pdf es requerido"]}

})




module.exports = model('user', userSchema, "Users")
