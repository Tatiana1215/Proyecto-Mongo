 const Carrito=require('../modelos/carrito')

  const carritoHelper={
    // clienteID:async (idcliente, req)=>{
    //     const existe= await Carrito.findOne({idcliente:idcliente})
    //     if(existe){
    //         throw new Error('El id del clixente ya existe')
    //     }
    // },
    productoid: async (idproducto, req)=>{
        const existe= await Carrito.findById({idproducto:idproducto})

        if(existe){
            throw new Error('El id del producto ya existe')
        }
    }
  }

  module.exports={carritoHelper}