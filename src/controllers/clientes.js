const Cliente = require('../modelos/clientes')

const httpclientes = {
    //listar todo
    getlsitartodo: async (req, res) => {
        try {
            const cliente = await Cliente.find()
            res.json({ cliente })
        } catch (error) {
            res.status(400).json({ error })

        }
    },
    //listar por un id

    getlistarxid: async (req, res) => {
        const { id } = req.params
        try {
            const cliente = await Cliente.findById(id)
            if (cliente) {
                res.json(cliente)
            } else {
                res.status(404).json({ msg: `no hay ningun cliente con el id ${id}` })
            }
        } catch (error) {
            res.status(400).json({ error })

        }

    },
    // listar los usuarios  activos,
    getactivos: async (req, res) => {
        const { estado } = req.body
        try {
            const cliente = await Cliente.find({ estado: estado })
            if (cliente.length > 0) {
                res.json(cliente)
            } else {
                res.status(404).json({ msg: 'noy hay cleintes activos' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // listar inactivos
    getinactivos: async (req, res) => {
        const { estado } = req.body
        try {
            const cliente = await Cliente.find({ estado: estado })
            if (cliente.length > 0) {
                res.json(cliente)
            } else {
                res.status(404).json({ msg: 'no hay clientes inactivos' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // post//insertar{
    postinsertar: async (req, res) => {
        try {
            const { nombre, direccion, telefono, email, documento, fecha_compra,estado } = req.body
            const cliente = new Cliente({ nombre, direccion, telefono, email, documento, fecha_compra,estado })
            if (cliente) {
                await cliente.save()
                res.json(cliente)
            } else {
                res.status(404).json({ msg: 'no se ingreso el cliente' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }


    },

    //modificar
    putmodificar: async (req, res) => {
        const { id } = req.params
        try {
            const { nombre, direccion, telefono, email, documento, fecha_compra } = req.body
            const cliente = await Cliente.findById(id)

            if (cliente) {
                cliente.nombre = nombre
                cliente.direccion = direccion
                cliente.telefono = telefono
                cliente.email = email
                cliente.documento = documento
                cliente.fecha_compra = fecha_compra
                await cliente.save()
                res.json(cliente)
            } else {
                res.status(404).json({ msg: 'no existe el cliente' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // activar
    putactivar: async (req, res) => {
        const { id } = req.params
        const { estado } = req.body
        try {
            const cliente = await Cliente.findById(id)
            if (cliente) {
                cliente.estado = estado
                await cliente.save()
                res.json({ mgs: 'se activo el cliente' })
            } else {
                res.status(404).json({ msg: 'no se activo el cliente' })
            }
        } catch (error) {
            res.status(400).json({ error })

        }

    },

    putdesactivar: async (req, res) => {
        const { id } = req.params;
        const { estado } = req.body;
        try {
            const cliente = await Cliente.findById(id);
            cliente.estado = estado;
            await cliente.save();
            res.json({ msg: 'se desactivo el cliente' });
        } catch (error) {
            res.status(400).json({ error });
        }
    },
}
module.exports = { httpclientes }



