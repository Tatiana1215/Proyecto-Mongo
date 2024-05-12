
//PRODUCTOS
// router.get()//listar todo👍
// get//listar por un id👍
// get//liste todos los productos por debajo stockminimo👍
// get//listar todos los articulos por encima del precio xxx👍
// // listar activos,👍
//  listar inactivos👍
// post//insertar👍
// put//modificar👍
// put//activar👍
// put//desactivar👍

const { httpproductos } = require('../controllers/productos')
const {check}=require('express-validator')
const {validarCampos } = require('../middlewares/validar-campos');
const {Router}=require('express');
const { productosHelper } = require('../helpers/productos');
const {validarJWT}=require('../middlewares/validarJWT')

const router=Router()

router.get('/listartodo', [
    validarJWT,
    validarCampos
],httpproductos.getlistartodo)// 👍
router.get('/listar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosid),
    validarCampos
],httpproductos.getlistarporid)// 👍
router.get('/stockminimo', [
    validarJWT,
    validarCampos
],httpproductos.getstockminimo)// 👍
router.get('/listarporenciamdelprecioxxx/:precio',[
    validarJWT,
    validarCampos
],httpproductos.getporencimadeelprecio)// 👍
router.get('/listaractivos/:estado',[
    validarJWT,
    validarCampos
],httpproductos.getlistaractivos)// 👍
router.get('/listarinactivos/:estado',[
    validarJWT,
    validarCampos
],httpproductos.getlistaractivos)// 👍

router.post('/insertar',[
    check('nombre','El campo nombre no esta registrado').notEmpty(),
    check('nombre','ya existe el nombre del producto').custom(productosHelper.nombreproducto),
     check('nombre','El campo nombre debe tener máximo 40 caracteres').isLength({max:42}),
    validarCampos
],httpproductos.postinsertae)// 👍
router.put('/modificar/:id',[
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosid),
    check('nombre','El campo nombre no esta registrado').notEmpty(),
    check('nombre','El campo nombre debe tener máximo 40 caracteres').isLength({max:42}),
    check('nombre','ya existe el nombre del producto').custom(productosHelper.nombreproducto),
    validarCampos
], httpproductos.putmodificar)// 👍
router.put('/activar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosid),
    validarCampos
],httpproductos.putactivar)// 👍
router.put('/desactivar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom(productosHelper.productosid),
    validarCampos
],httpproductos.putdesactivar)// 👍


module.exports=router