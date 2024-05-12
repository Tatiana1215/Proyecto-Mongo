
const Usuario = require("../modelos/usuarios")
const bcryptjs =require("bcryptjs")
const{generarJWT}=require('../middlewares/validarJWT')



const httpUsuarios = {

    // listar todo
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find()
            res.json({ usuarios })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    // listar por id
    getUsuariosXId: async (req, res) => {
        const { id } = req.params
        try {
            const usuario = await Usuario.findById(id)
            if (usuario)
                res.json({ usuario })
            else
                res.status(400).json({ msg: "Usuario no encontrado" })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    // listar los usuarios  activos, 
    getactivos: async (req, res) => {
        const { estado } = req.params
        try {
            const usuario = await Usuario.find({ estado })
            if (usuario.length > 0) {
                res.json(usuario)
            } else {
                res.status(401).json({ mgs: 'no hay ningun usuarion con el estado activos' })
            }
        } catch (error) {
            res.status(400).json({ error })

        }
    },
    // listar los usuarios inactivos
    getlistarinactivos: async (req, res) => {
        const { estado } = req.params
        try {
            const usuarioinactivos = await Usuario.find({ estado })
            if (usuarioinactivos.length > 0) {
                res.json(usuarioinactivos)
            } else {
                res.status(401).json({ mgs: 'no hay usuarios iniactivos' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },

// insertar
postUsuarios: async (req, res) => {
   
    try { 
        const { email, password, estado } = req.body
        const usuario = new Usuario({ email, password, estado })
const salt=bcryptjs.genSaltSync();
usuario.password=bcryptjs.hashSync(password, salt)
        await usuario.save()
        res.json(usuario)
    } catch (error) {
        res.status(400).json({ error })
    }

},


// Loging
// postLogin: async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const usuario = await Usuario.findOne({ email });
//         if (!usuario) {
//             return res.status(401).json({ msg: "Usuario / Password no son correctos" })
//         }
//     }

//         if (user.estado === 0) {

//         return res.status(401).json({ msg: "Usuario / Password no son correctos" })
//     }
postLogin: async (req, res) => {
            const { email, password } = req.body;
            try {
                const usuario = await Usuario.findOne({ email })
                if (!usuario) {
                    return res.status(401).json({
                        msg: "Usuario / Password no son correctos"
                    })
                }

                if (usuario.estado === 0) {
                    return res.status(401).json({
                        msg: "Usuario / Password no son correctos"
                    })
                }

                /////////pago o no pago    xxxxxxxx

                const validPassword = bcryptjs.compareSync(password, usuario.password);
                if (!validPassword) {
                    return res.status(401).json({
                        msg: "Usuario / Password no son correctos"
                    })
                }
                const token = await generarJWT(usuario._id);

                res.json({
                    usuario: usuario,
                    token
                })

            } catch (error) {

                return res.status(500).json({

                    msg: "Hable con el WebMaster"
                })
            }
        },
    //cambio contraseña
    postnuevacontraseña: async (req, res) => {
        const { id } = req.params
        const { contraseñanueva } = req.body

        try {
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                res.status(400).json({ mgs: 'usuario no encontrado' })
            }
            const salt=bcryptjs.genSaltSync();
            const hashedPassword = bcryptjs.hashSync(contraseñanueva, salt);
            usuario.password = hashedPassword
            await usuario.save()

            res.json({ mgs: ' contraseña cambiada correctamente' })


        } catch (error) {
            res.status(400).json({ error })
        }
    },
        //modificar
        putmodificar: async (req, res) => {
            const { id } = req.params
            try {
                const { email } = req.body
                const usuario = await Usuario.findById(id)
                if (usuario) {
                    usuario.email = email
                    await usuario.save()
                    res.json({ mgs: 'datos modificados correctamente' })
                } else {
                    res.status(404).json({ mgs: 'no se encontro ningun usuario' })
                }
            } catch (error) {
                res.status(400).json({ error })

            }
        },
            //activar el usuario
            putactivar: async (req, res) => {
                const { id } = req.params
                const { estado } = req.body
                try {
                    const usuarioactivar = await Usuario.findById(id)
                    if (!usuarioactivar) {
                        res.status(404).json({ mgs: 'usuario no existe' })
                    }
                    usuarioactivar.estado = estado
                    await usuarioactivar.save()
                    res.json({ mgs: 'usuario activado' })
                } catch (error) {
                    res.status(400).json({ error })
                }
            },
                //desactivar
                putdesactivar: async (req, res) => {
                    const { id } = req.params
                    const { estado } = req.body
                    try {
                        const usuariodes = await Usuario.findById(id)
                        if (!usuariodes) {
                            res.status(404).json({ mgs: 'usuario no encontrado' })
                        }
                        usuariodes.estado = estado
                        await usuariodes.save()
                        res.json({ mgs: 'usuario desactivado' })
                    } catch (error) {
                        res.status(400).json({ error })
                    }
                }

}

module.exports = { httpUsuarios }