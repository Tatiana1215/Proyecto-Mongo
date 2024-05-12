const Detalle=require("../modelos/detalle")
const httpdetalle={
    getlistarid:async(req,res)=>{
        //listar por su id
        const {id}=req.params
        try {
            const detalle= await Detalle.findById(id)
        if(detalle){
            res.json(detalle)
        }else{
            res.status(404).json({mgs:'no hay nigun detalle'})
        }
        } catch (error) {
            res.status(400).json({error})
        }
  },
// insertar
       postinsertar: async (req, res)=>{
        try {
            const { idroducto, valor, cantidad}=req.body
            const detalle= new Detalle({ idroducto, valor, cantidad})
            await detalle.save()
            res.json(detalle)
        } catch (error) {
            res.status(400).json({error})
        }
    },
    // modificar

    putmodificar: async (req, res)=>{
        const {id}=req.params
        try {
        const{idproducto, valor , cantidad}=req.body
        const detalle= await Detalle.findById(id)
        detalle.idproducto=idproducto
        detalle.valor=valor
        detalle.cantidad=cantidad   
        await detalle.save() 
        res.json({mgs:'detalle modificado correctamente'})
        } catch (error) {
            res.status(400).json({error})
        }
        
    }
    
}
module.exports={httpdetalle}