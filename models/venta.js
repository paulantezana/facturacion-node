const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },

    cliente: {
        type: {},
        required: true
    },

    producto: {
        type: {},
        required: true
    },

    cantidad: {
        type: Number,
        required: true
    },

    valor: Number,
    
    usuario: {
        type: {},
        required: true
    }
});

module.exports = mongoose.model('ventas',VentaSchema);