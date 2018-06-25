const Venta = require('../models/venta');
const Producto = require('../models/producto');
const Auditoria = require('../models/auditoria');
const Tercero = require('../models/tercero');

const venta = async (req, res, next)=>{
    const productos = await Producto.find();
    const auditorias = await Auditoria.find();
    const clientes = await Tercero.find();
    const ventas = await Venta.find();
    res.render('venta', { title: 'Ventas', productos, auditorias, clientes, ventas });
}

const realizarVenta = async (req, res, next)=>{
    const usuario = req.session.usuario;

    const producto = await Producto.findById({_id: req.body.producto});
    const cliente = await Tercero.findById({_id: req.body.cliente});
    const cantidad = req.body.cantidad;
    const valor = req.body.valor;

    // Validacion de existencia
    if (producto.cantidad < cantidad){
        const productos = await Producto.find();
        const auditorias = await Auditoria.find();
        const clientes = await Tercero.find();
        const ventas = await Venta.find();
        
        return res.render('venta', { 
            title: 'Ventas',
            productos, 
            auditorias,
            clientes,
            ventas,
            erros: "No existe suficiente cantidad para la venta de " + producto.nombre
        });
    }

    const venta = new Venta({
        cliente,
        producto,
        cantidad,
        valor,
        usuario
    })
    await venta.save();

    // Actualizar stock producto
    await Producto.findByIdAndUpdate({_id: producto._id},{
        cantidad: producto.cantidad - cantidad
    });

    // Auditoria
    const auditoria = new Auditoria({
        usuario: usuario,
        accion: "vender",
        tabla: "venta",
        nuevo: venta,
        anterior: {}
    });
    await auditoria.save();

    // Redirect route
    res.redirect('/venta');
}

const anularVenta = async (req, res, next)=>{

}

module.exports = {
    venta,
    realizarVenta,
    anularVenta
}