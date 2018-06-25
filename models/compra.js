const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = new Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },

    proveedor: {
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

Compra = mongoose.model('compras',CompraSchema)

module.exports = Compra;