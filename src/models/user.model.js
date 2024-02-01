const {model, Schema} = require('mongoose')

const userSchema= new Schema({
    username: {type: String,
        required:[false, 'nombre requerido']},
    tenantId: {type: Schema.Types.ObjectId,
        required: [true, 'Nit de la empresa requerido'],        },
    email: {type: String,
        required:[true, 'correo requerido'],
        unique: true},
    password: {type: String,
        required: [true, 'constraseña requerida']},
    imgfirme: {type: String,
        required:[false, 'Imagen de firma es requerida']},
    telephone: {type: String,
        required: [false, 'telefono es requerido']},
    direction: { type: String,
    required: [false, 'direccion es requerida']},
    rol: {type:Schema.Types.ObjectId,
    required:[true, 'Rol es requerido']}
    
    
})




module.exports = model('user', userSchema, "Users")
