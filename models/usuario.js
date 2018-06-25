const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UsuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    perfil: {
        type: String,
        required: true,
        default: "USUARIO"
    },
    clave: {
        type: String,
        required: true
    }
});

let Usuarios = mongoose.model('Usuarios',UsuarioSchema);

module.exports =Usuarios;