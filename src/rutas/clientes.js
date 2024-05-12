// clientes
// router.get()//listar todo👍
// get//listar por un id👍
// // listar activos,👍
//  listar inactivos👍
// post//insertar👍
// put//modificar👍
// put//activar👍
// put//desactivar👍

const { Router } = require('express')
const { httpclientes } = require("../controllers/clientes")
const {check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const { clienteHelper } = require('../helpers/cliente')
const { validarJWT}= require ('../middlewares/validarJWT')

const router = Router()

router.get('/listartodo',[
    validarJWT,
    validarCampos
],httpclientes.getlsitartodo)
router.get('/listarid/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
check('id',).custom(clienteHelper.clienteID),
validarCampos
],httpclientes.getlistarxid)

router.get('/activos',[
    validarJWT,
    validarCampos
],httpclientes.getactivos)
router.get('/inactivos',[
    validarJWT,
    validarCampos
] ,httpclientes.getinactivos)

router.post('/insertar',[
    validarJWT,
    check('nombre','el campo nombre es obligatorio').notEmpty(),
    check('direccion','El campo  direccion es obligatorio').notEmpty(),
    check('direccion','El campo direccion debe tener maximo 50 caracteres').isLength({max:50}),
    check('telefono',' El campo telefono es obligatorio').notEmpty(),
    check('email','El campo email es obligatorio').notEmpty(),
    check('email').custom(clienteHelper.existeemail),
    check('documento','El campo documento es obligatorio').notEmpty(),
    check('documento').custom(clienteHelper.existedocumento),
    check('fecha_compra',' El campo fecha es obligatorio').notEmpty(),
    validarCampos

],httpclientes.postinsertar )

router.put('/modificar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    check('nombre','el campo nombre es obligatorio').notEmpty(),
    check('direccion','El campo  direccion es obligatorio').notEmpty(),
    check('direccion','El campo direccion debe tener maximo 50 caracteres').isLength({max:50}),
    check('telefono',' El campo telefono es obligatorio').notEmpty(),
    check('email','El campo email es obligatorio').notEmpty(),
    check('email').custom(clienteHelper.existeemail),
    check('documento','El campo documento es obligatorio').notEmpty(),
    check('documento',).custom(clienteHelper.existedocumento),
    check('fecha_compra',' El campo fecha es obligatorio').notEmpty(),
   validarCampos
    
],httpclientes.putmodificar)

router.put('/activar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    validarCampos
],httpclientes.putactivar)

router.put('/desactivar/:id',[
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id',).custom(clienteHelper.clienteID),
    validarCampos
], httpclientes.putdesactivar)

module.exports = router

