//USUARIOS
// router.get()//listar todo👍
// get//listar por un id👍
// listar activos, 👍
// listar inactivos👍
// post//insertar👍
// post//login
// post //cambio contraseña👍
// put//modificar👍
// put//activar👍
// put//desactivar👍
const { httpUsuarios } = require('../controllers/usuarios')
const { Router } = require('express')
const { check } = require('express-validator')
const { usuarioHelper } = require('../helpers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validarJWT')

const router = Router()


router.get('/Listartodo', [
    validarJWT,
    validarCampos
], httpUsuarios.getUsuarios)// 👍

router.get('/listar/:id', [
    validarJWT,
    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.getUsuariosXId)// 👍
router.get('/listaractivos/:estado', [
    validarJWT,
    validarCampos
], httpUsuarios.getactivos)//👍
router.get('/listarinactivos/:estado', [
    validarJWT,
    validarCampos
], httpUsuarios.getlistarinactivos)//👍
router.post('/insertar', [
    // validarJWT,
    check('email', 'El documento es obligatorio!').not().isEmpty(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'Password no es válido').isLength({ min: 8 }),
    validarCampos
], httpUsuarios.postUsuarios)//👍
router.post('/login', [
    // validarJWT
], httpUsuarios.postLogin)//👍

router.post('/cambiodecontrasena/:id', [
    validarJWT,
    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.postnuevacontraseña)//👍
router.put('/modificar/:id', [

    check('id', 'el id no es valida').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),

    check('email', 'El documento es obligatorio!').not().isEmpty(),
    validarCampos
], httpUsuarios.putmodificar)// 👍
router.put('/activar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.putactivar)//👍
router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioHelper.existeUsuarioID),
    validarCampos
], httpUsuarios.putdesactivar)//👍

module.exports = router