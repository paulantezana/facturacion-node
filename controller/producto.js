const Producto = require('../models/producto');
const Auditoria = require('../models/auditoria');

const createProducto = async (req, res, next)=>{
    // Creaje Product
    const producto = new Producto(req.body);
    await producto.save();

    // Auditoria
    const auditoria = new Auditoria({
        usuario: req.session.usuario,
        accion: "create",
        tabla: "producto",
        nuevo: producto,
    });
    await auditoria.save();

    // Redirect route
    res.redirect('/producto');
}

const updateProducto = async (req, res, next)=>{
    const { id } = req.params;

    const oldProducto = await Producto.findById({_id: id }); // Get old producto
    await Producto.findByIdAndUpdate({_id: id},req.body); // Update producto
    const newProducto = await Producto.findById({_id: id }); // Get new producto

    // Auditoria
    const auditoria = new Auditoria({
        usuario: req.session.usuario,
        accion: "update",
        tabla: "producto",
        nuevo: newProducto,
        anterior: oldProducto
    });
    await auditoria.save();

    // Redirect route
    res.redirect('/producto/view/' + newProducto._id);
}

const allProductos = async (req, res, next)=>{
    const productos = await Producto.find();
    const auditorias = await Auditoria.find();
    res.render('producto', { title: 'Producto', productos, auditorias });
}

const deleteProducto = async (req, res, next)=>{
    const { id } = req.params;

    const oldProducto = await Producto.findById({_id: id }); // Get old producto
    await Producto.remove({_id: id}); // Delete producto

    // Auditoria
    const auditoria = new Auditoria({
        usuario: req.session.usuario,
        accion: "delete",
        tabla: "producto",
        nuevo: {},
        anterior: oldProducto
    });
    await auditoria.save();

    res.redirect('/producto');
}

const viewProducto = async (req, res, next) => {
    const { id } = req.params;
    let producto = await Producto.findById({_id:id})
    const auditorias = await Auditoria.find();
    res.render('productoedit', { title: 'Producto', producto, auditorias });
}

module.exports = {
    createProducto,
    updateProducto,
    allProductos,
    deleteProducto,
    viewProducto
}