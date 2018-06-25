const Compra = require('../models/compra');
const Producto = require('../models/producto');
const Auditoria = require('../models/auditoria');
const Tercero = require('../models/tercero');

const compra = async (req, res, next)=>{
    const productos = await Producto.find();
    const auditorias = await Auditoria.find();
    const proveedores = await Tercero.find();
    const compras = await Compra.find();
    res.render('compra', { title: 'Compras', productos, auditorias, proveedores, compras });
}

const realizarCompra = async (req, res, next)=>{
    const usuario = req.session.usuario;

    const producto = await Producto.findById({_id: req.body.producto});
    const proveedor = await Tercero.findById({_id: req.body.proveedor});
    const cantidad = req.body.cantidad;
    const valor = req.body.valor;

    const compra = new Compra({
        proveedor,
        producto,
        cantidad,
        valor,
        usuario
    })
    await compra.save();

    // Actualizar stock producto
    await Producto.findByIdAndUpdate({_id: producto._id},{
        cantidad: producto.cantidad + cantidad
    });

    // Auditoria
    const auditoria = new Auditoria({
        usuario: usuario,
        accion: "comprar",
        tabla: "compra",
        nuevo: compra,
        anterior: {}
    });
    await auditoria.save();

    // Redirect route
    res.redirect('/compra');
}

const anularCompra = async (req, res, next)=>{

}

module.exports = {
    compra,
    realizarCompra,
    anularCompra
}