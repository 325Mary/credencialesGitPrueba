const {model, Schema} = require('mongoose')

const userSchema= new Schema({
    username: {type: String,
        required:[false, 'nombre requerido']},
    empresa: {type: String,
        required: [false, 'nombre de empresa requerido']},
    tenantId: {type: Schema.Types.ObjectId,
        required: [true, 'Nit de la empresa requerido'],        },
    email: {type: String,
        required:[true, 'correo requerido'],
        unique: true},
    password: {type: String,
        required: [true, 'constraseña requerida']},
    imgfirme: {type: String,
        required:[false, 'Imagen de firma es requerida']},
    
    
})




module.exports = model('user', userSchema, "Users")
