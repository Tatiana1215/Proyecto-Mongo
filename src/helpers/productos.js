const Productos=require('../modelos/productos')
const productosHelper={
    productosid: async (id , req )=>{
        const existe= await Productos.findById(id)
if(!existe){
    throw new Error(`El id del producto no existe`)
}

    },
    idcliente: async (idcliente, req)=>{
         const existe= await Productos.findById(idcliente)
         if(!existe){
            throw new Error('El id de el cliente no existe')
         }

},
nombreproducto: async (nombre, req) => {
    const existe = await Productos.findOne({ nombre: nombre });
    if (existe) {
        throw new Error(`El producto "${nombre}" ya existe`);
    }
   
}
}
module.exports= {productosHelper}