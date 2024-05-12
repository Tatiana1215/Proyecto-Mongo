
const Detalle=require('../modelos/detalle')

const detalleHelper={
    detaolleid:async (id, req )=>{
        const existe= await Detalle.findById(id)
        if(!existe){
            throw new Error(`El registro no existe`)
        }
        
    }, 
      productoid:async (idproducto, req )=>{
        const existe= await Detalle.findOne(idproducto)
        if(!existe){
            throw new Error(`El registro no existe`)
        }
    
    }
}
module.exports={ detalleHelper}