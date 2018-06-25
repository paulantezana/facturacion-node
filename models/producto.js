const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: Number,
    precio: Number
});

module.exports = mongoose.model('productos',ProductoSchema);
