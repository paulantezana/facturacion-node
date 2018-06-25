var express = require('express');
var router = express.Router();

const { authorize, logout, profile, login } = require('./controller/usuario');
const { createUser, viewUser, updateUser, allUsers, deleteUser } = require('./controller/usuario');
const { createProducto, viewProducto, updateProducto, allProductos, deleteProducto } = require('./controller/producto');
const { createTercero, viewTercero, updateTercero, allTerceros, deleteTercero } = require('./controller/tercero');
const { compra, realizarCompra, anularCompra } = require('./controller/compra');
const { venta, realizarVenta, anularVenta } = require('./controller/venta');

router.get('/', authorize, function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// USER ROUTES
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'COMPRA VENTA' });
});

router.post('/login', login);
router.get('/logout', logout);
router.get('/perfil', authorize, profile);

// USER ROUTER
router.get('/usuario', authorize, allUsers);
router.get('/usuario/view/:id', authorize, viewUser);
router.post('/usuario/nuevo', authorize, createUser);
router.post('/usuario/update/:id', authorize, updateUser);
router.get('/usuario/eliminar/:id', authorize, deleteUser);

// PRODUCT ROUTES
router.get('/producto', authorize, allProductos);
router.get('/producto/view/:id', authorize, viewProducto);
router.post('/producto/nuevo', authorize, createProducto);
router.post('/producto/update/:id', authorize, updateProducto);
router.get('/producto/eliminar/:id', authorize, deleteProducto);

// TERCERO ROUTES
router.get('/tercero', authorize, allTerceros);
router.get('/tercero/view/:id', authorize, viewTercero);
router.post('/tercero/nuevo', authorize, createTercero);
router.post('/tercero/update/:id', authorize, updateTercero);
router.get('/tercero/eliminar/:id', authorize, deleteTercero);

// COMPRA
router.get('/compra', authorize, compra)
router.post('/comprar', authorize, realizarCompra)

//VENTA
router.get('/venta', authorize, venta)
router.post('/vender', authorize, realizarVenta)

module.exports = router;
