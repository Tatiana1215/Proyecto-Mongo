
const Productos = require('../modelos/productos')

const httpproductos = {
    // listra todos los productos
    getlistartodo: async (req, res) => {
        try {
            const productos = await Productos.find()
            res.json(productos)
        } catch (error) {
            res.status(400).json({ mgs: 'no hay ningun producto' })
        }
    },
    // listar por el id
    getlistarporid: async (req, res) => {
        const { id } = req.params
        try {
            const productos = await Productos.findById(id)
            if (productos) {
                res.json(productos)
            } else {
                res.status(401).json({ mgs: 'no hay productos con ese id' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    //liste todos los productos por debajo stockminimo
    getstockminimo: async (req, res) => {
        try {
            const productos = await Productos.find()
            const stockminimo = productos.find({ stockminimo:{$gte: producto.cantidad , $lte :producto.stockminimo} })
            if (stockminimo) {
                res.json(stockminimo)
            } else {
                res.status(404).json({ msg: 'no hay productos por debajo e el stockminimo' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // // listar activos,
    getlistaractivos: async (req, res) => {
        const { estado } = req.params
        try {
            const productos = await Productos.find({ estado: estado })
            if (productos) {
                res.json(productos)
            } else {
                res.status(404).json({ msg: 'no hay productos activos' })
            }
        } catch (error) {
            res.status(400).json({ error })

        }

    },
    //  listar inactivos
    getinactivos: async (req, res) => {
        const { estado } = req.params
        try {
            const productos = await Productos.filter(productos => productos.estado == estado)
            if (productos) {
                res.status(404).json({ msg: 'no hay productos inactivos' })
            } else {
                res.json(productos)
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // listar todos los articulos por encima del precio xxx
    getporencimadeelprecio: async (req, res) => {
        const { precio } = req.params
        try {
            const producto = await Productos.find({ precio: { $gt: precio } })
            if (producto.length > 0) {
                res.json(producto)
            } else {
                res.status(404).json({ mgs: `no hay productos con e precio mayor a ${precio}` })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },

    // insertar

    // postinsertae: async (req, res) => {  
    //     const { nombre, precio, cantidad, stockminimo, estado } = req.body
    //     try {
    //         const productos =   new Productos({ nombre, precio, cantidad, stockminimo, estado })
    //         await productos.save()
    //         res.json(productos)
    //     } catch (error) {
    //         res.status(400).json({ error: "Error al insertar datos. Consulta los registros para más detalles."})
    //     }

    // },
    // insertar
    postinsertae: async (req, res) => {
        const { nombre, precio, cantidad, stockminimo, estado } = req.body
        try {
            const productos = new Productos({ nombre, precio, cantidad, stockminimo, estado })
            await productos.save()
            res.json(productos)
        } catch (error) {
            console.error("Error al insertar datos:", error);
            res.status(400).json({ error: "Error al insertar datos. Consulta los registros para más detalles." })
        }
    },

    // put//modificar
    putmodificar: async (req, res) => {
        const { id } = req.params
        const { nombre, precio, cantidad, stockminimo, estado } = req.body
        try {
            const productos = await Productos.findById(id)
            if (productos) {
                productos.nombre = nombre
                productos.precio = precio
                productos.cantidad = cantidad
                productos.stockminimo = stockminimo
                productos.estado = estado

                await productos.save();
                res.json({ mgs: 'productos modificados correctamente' })

            } else {
                res.status(404).json({ mgs: 'no se encontro ningun producto' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // put//activar
    putactivar: async (req, res) => {
        const { id } = req.params
        const { estado } = req.body
        try {
            const productos = await Productos.findById(id)
            if (productos) {
                productos.estado = estado
                await productos.save()
                res.json({ msg: 'producto activado' })
            } else {
                res.status(404).json({ msg: 'producto no existe' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // put//desactivar
    putdesactivar: async (req, res) => {
        const { id } = req.params
        const { estado } = req.body
        try {
            const productos = await Productos.findById(id)
            if (productos) {
                productos.estado = estado
                await productos.save()
                res.json({ msg: 'producto desactivado' })
            } else {
                res.status(404).json({ msg: 'no existe el producto' })
            }
        } catch (error) {
            res.status(400).json({ error })

        }
    }

}


module.exports = { httpproductos }