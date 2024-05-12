// //carrtio
// get listar carrrito x cliente
// post//insertar
// delete//elimino
const { Router } = require('express');
const mongoose = require('mongoose')
const { httpcarrito } = require('../controllers/carrito');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { carritoHelper } = require('../helpers/carrito');
const router = Router()

router.get('/listarcarritox/:idcliente', [
check('idcliente',' El id de el cliente no es valido').isMongoId(),
check('idcliente').custom(carritoHelper.clienteID),
validarCampos
], httpcarrito.getlistarcaridcliente)//👍
router.post('/insertar', [
    check('idcliente',' El id de el cliente no es valido').isMongoId(),
    // check('idcliente').custom(carritoHelper.clienteID),
    check('idproducto','El id del producto no es valido').isMongoId(),
    // check('idproducto').custom(carritoHelper.productoid),
    check('cantidad',' El campo cantidad es obligatorio').notEmpty(),
    check('precio','El campo precio es obligatorio').notEmpty(),
    validarCampos
], httpcarrito.postinsertar)//👍
router.delete('/eliminar', httpcarrito.deleteeliminar)//👍

module.exports = router



