const Carrito = require('../modelos/carrito')

const httpcarrito = {
    // get listar carrrito x cliente
    getlistarcaridcliente: async (req, res) => {
        const { idcliente} = req.params
        try {
            const carrito = await Carrito.find({ idcliente: idcliente })
            if (carrito) {
                res.json(carrito)
            } else {
                res.status(404).json({ msg: 'no hay un cariito con ese cliente' })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
  
    // postinsertar
postinsertar: async (req, res) => { 
    const { idproducto, idcliente, cantidad, precio } = req.body;
    try {
        const nuevocarrito = new Carrito({ idproducto, idcliente, cantidad, precio });
        await nuevocarrito.save();
        res.json(nuevocarrito); // Devolver el nuevo carrito guardado
    } catch (error) {
        res.status(400).json({ error }); // Manejar errores de forma adecuada
    }
},

    // delete//elimino
    deleteeliminar: async (req, res) => {
        try {
            await Carrito.deleteMany({})
            res.json({ msg: 'todos loscarritos se eliminaron correctamente' })
        } catch (error) {
            res.status(400).json({ error })
        }
    }
}
module.exports = { httpcarrito }