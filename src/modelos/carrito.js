
const mongoose=require ('mongoose')

const carritoSchema = new mongoose.Schema({
    idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
    idcliente: { type: mongoose.Schema.Types.ObjectId,ref:'Cliente'},
    cantidad: { type: Number, required: true , default: 0},
    precio: { type: Number, required: true ,default: 0},
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true })


module.exports= mongoose.model("carrito", carritoSchema)