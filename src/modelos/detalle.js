const mongoose=require(`mongoose`)

const detalleSchema=new mongoose.Schema({
    idroducto:{type:mongoose.Schema.Types.ObjectId,ref:'productos'},
    valor:{type:Number, default:0},
    cantidad:{type:Number, default:0},
})

module.exports=mongoose.model("detalle",detalleSchema)