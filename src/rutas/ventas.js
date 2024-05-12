
// router.get()//listar todo
// get//listar por un id
// // listar activos, listar inactivos
// // listar ventas del cliente xxx
// // listar todas las ventas entre dos fechas
// // listar ventas con un valor superior a xxxx
// // total de ventas entre dos fechas
// //total descuento
// post//insertar
// put//modificar
// put//activar
// put//desactivar

const { httpventas } = require('../controllers/ventas')
const {check}=require('express-validator')
const {validarCampos } = require('../middlewares/validar-campos');
const {Router}=require('express');
const mongoose = require('mongoose');
const { ventasHelpe } = require('../helpers/ventas');
const {validarJWT}=require('../middlewares/validarJWT')

const router=Router()

router.get('/listartodo',[
    validarJWT,
    validarCampos
],httpventas.getlistratodo)// 👍
router.get('/listar/:id',[
    validarJWT,
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelpe.existeventaID),
    validarCampos
],httpventas.getlistarxid)// 👍
router.get('/listaractivos',[
    validarJWT,
    validarCampos
],httpventas.getactivos)// 👍
router.get('/listarinactivos',[
    validarJWT,
    validarCampos
],httpventas.getinactivos)// 👍
router.get('/listarclientexxx/:idcliente',[
    validarJWT,
        check('idcliente','el id no es valido').isMongoId(),
    check('idcliente').custom(ventasHelpe.existeidcliente),
    validarCampos
],httpventas.getventasclientexx)// 👍

router.get('/litarentredosfechas',[
    validarJWT,
    validarCampos
],httpventas.getlietardosfechas)// 👍
router.get('/totalentredosfechas',[
    validarJWT,
    validarCampos
],httpventas.gettotalentrefecha)// 👍
router.get('/lisarelvalorsuperioraxx',[
    validarJWT,
    validarCampos
],httpventas.getvalorsuperior)// 👍
router.get('/totalentredosfechas',[ validarJWT,
    validarCampos],httpventas.gettotalentrefecha)// 👍
router.get('/totaldedescuento',[
    validarJWT,
    validarCampos
],httpventas.getdescuento)// 👍
router.post('/insertar',[
    check('fecha','la fecha no esta regisrada').notEmpty(),

    validarCampos

],httpventas.postinsertar)// 👍
router.put('/modificar/:id',[
    validarJWT,
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelpe.existeventaID),
    check('fecha','la fecha no esta regisrada').notEmpty(),
validarCampos
],httpventas.putmodificar)// 👍
router.put('/activar/:id',[
    validarJWT,
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelpe.existeventaID),
validarCampos
],httpventas.putativar)// 👍
router.put('/desactivar/:id',[
    validarJWT,
    check('id','el id no es valido').isMongoId(),
    check('id').custom(ventasHelpe.existeventaID),
validarCampos
],httpventas.putdesactivar)// 👍

module.exports=router