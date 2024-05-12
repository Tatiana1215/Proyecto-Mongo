//detalles ventas  
// get//listar por un id venta👍
// post//insertar👍
// put//modificar👍

const { httpdetalle } = require('../controllers/detalle')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { Router } = require('express')
const mongoose = require('mongoose')
const { detalleHelper } = require('../helpers/detalle')
const { validarJWT}=require('../middlewares/validarJWT')
const router = Router()
router.get('/listar/:id', [
    validarJWT,
    check('id', "El id no es valido").isMongoId(),
    check('id').custom(detalleHelper.detaolleid),
    validarCampos
], httpdetalle.getlistarid)
router.post('/insertar',[
    validarJWT,
    // check('idproducto', "El id no es valido").isMongoId(),
    check('idproducto').custom(detalleHelper.productoid),
    validarCampos

],httpdetalle.postinsertar)
router.put('/modificar/:id', [
    validarJWT,
    check('id', "El id no es valido").isMongoId(),
    check('id').custom(detalleHelper.detaolleid),
    validarCampos
], httpdetalle.putmodificar)


module.exports = router