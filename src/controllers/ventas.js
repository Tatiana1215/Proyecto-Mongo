
const Ventas = require("../modelos/ventas")

const httpventas = {
    // router.get()//listar todo

    getlistratodo: async (req, res) => {
        try {
            const ventas = await Ventas.find()
            if (ventas) {
                res.json(ventas)
            } else {
                res.status(404).json({ msg: 'no hay ninguna venta' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // get//listar por un id
    getlistarxid: async (req, res) => {
        const { id } = req.params
        try {
            const venta = await Ventas.findById(id)
            if (venta) {
                res.json(venta)
            } else {
                res.status(404).json({ mgs: 'no existe la venta' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // // listar activos, 
    getactivos: async (req, res) => {
        const { estado } = req.body
        try {
            const venta = await Ventas.find({ estado: estado })
            if (venta) {
                res.json(venta)
            } else {
                res.status(404).json({ msg: 'no hay ninguna venta activa' })
            }
        } catch (error) {
            res.status(400).json({ error })

        }
    },
    //  listar inactivos

    getinactivos: async (req, res) => {
        const { estado } = req.body
        try {
            const ventas = await Ventas.find({ estado: estado })
            if (ventas) {
                res.json(ventas)
            } else {
                res.status(404).json({ msg: 'noy ventas inactivas' })
            }

        } catch (error) {
            res.status(400).json({ error })

        }
    },
    // // listar ventas del cliente xxx
    getventasclientexx: async (req, res) => {
        const {idcliente} = req.params
        try {
            const venta = await Ventas.find({ idcliente: idcliente })
            if (venta) {
                res.json(venta)
            } else {
                res.status(404).json({ msg: 'no hay  ninguna venta del cliente' })
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    // // listar todas las ventas entre dos fechas
    getlietardosfechas: async (req, res) => {
        const { fechainicial, fechafinal } = req.body
        try {
            const fechainicial1 = new Date(fechainicial)
            const fechafinal1 = new Date(fechafinal)
            const venta = await Ventas.find({ fecha: { $gte: fechainicial1, $lte: fechafinal1 } })
            if (venta.length > 0) {
                res.json(venta)
            } else {
                res.status(404).json({ msg: 'no hay vents ente las dos fechas' })
            }

            res.status(400).json({ error })
        } catch (error) {

        }
    },
    // // listar ventas con un valor superior a xxxx
    getvalorsuperior: async (req, res) => {
        const { valorxx } = req.body
        try {
            const venta = await Ventas.find({ valor: { $gt: valorxx } })
            res.json(venta)
        } catch (error) {
            res.status(400).json({ error })
        }
    },





    // // total de ventas entre dos fechas
    gettotalentrefecha: async (req, res) => {
        const { fechainicial, fechafinal } = req.body
        try {

            const fechainicial1 = new Date(fechainicial)
            const fechafinal1 = new Date(fechafinal)
            const venta = await Ventas.find({ fecha: { $gte: fechainicial1, $lte: fechafinal1 } })

            let total = 0

            venta.forEach(venta => {
                total += venta.valor
            })
            res.json({ total: total })

        } catch (error) {
            res.status(400).json({ error })
        }
    },


    //total descuento de las ventas
    getdescuento: async (req, res) => {
        const { descuento } = req.body
        try {
            const venta = await Ventas.find()

            let descuentototal = 0;
            let preciototal=0;
            venta.forEach(element => {
              
                descuentototal += element.valor * (descuento) / 100
                preciototal += element.valor
            });
            const preciototaldes = preciototal- descuentototal

            venta.totaldedescuento = preciototal
            res.json({totaldescuento:preciototaldes,
                descuento: descuentototal,
                preciototal:preciototal
                })

        } catch (error) {
            res.status(400).json({ error })
        }
    },
 
    
    // post//insertar
    postinsertar: async (req, res) => {
        try {
            const { idproducto, idcliente, fecha, valor, estado } = req.body
            const venta = new Ventas({ idproducto, idcliente, fecha, valor, estado })
            await venta.save()
            res.json({ msg: 'se agrego correctamente la venta' })
        } catch (error) {
            res.status(400).json({ error })
        }

    },

    // put//modificar
    putmodificar: async (req, res) => {
        const { id } = req.params
        const {  idproducto, idcliente,fecha, valor, estado } = req.body
        try {
            const venta = await Ventas.findById(id)
            if (venta) {
                venta.idproducto=idproducto
                venta.idcliente=idcliente
                venta.fecha = fecha
                venta.valor = valor
                venta.estado = estado
                await venta.save()
                res.json({ msg: 'venta modificada' })
            } else {
                res.status(404).json({ msg: 'no se modificao la venta' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },


    // put//activar
    putativar: async (req, res) => {
        const { id } = req.params
        const { estado } = req.body
        try {
            const venta = await Ventas.findById(id)
            if (venta) {
                venta.estado = estado
                await venta.save()
                res.json({ msg: 'se activo la venta' })
            } else {
                res.status(404).json({ msg: 'noy hay ninguna venta' })
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
            const venta = await Ventas.findById(id)
            if (venta) {
                venta.estado = estado
                await venta.save()
                res.json({ msg: 'venta desactivada' })
            } else {
                res.status(404).json({ msg: 'no hay ninguna venta' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}

module.exports = { httpventas }




