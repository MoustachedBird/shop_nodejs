import mongoose from 'mongoose';

/*Estructura de un esquema de mongoose, difiniciones, opciones,   */
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default:false},
}, {
    timestamps: true,
})

//creamos un modelo con base al esquema anterior (nombre,esquema)
const User = mongoose.model('User',userSchema);
export default User;