const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditoriaSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    usuario: {
        type: {},
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    tabla: {
        type: String,
        required: true
    },
    anterior: Object,
    nuevo: {
        type: Object,
        required: true
    }
});

const Auditoria = mongoose.model('auditoria',AuditoriaSchema);

module.exports = Auditoria;