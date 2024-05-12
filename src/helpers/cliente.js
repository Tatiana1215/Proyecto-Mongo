const Cliente = require('../modelos/clientes')


const clienteHelper = {
    existeemail: async (email, req) => {
        const existe= await Cliente.findOne({email:email})
if(existe){
    throw new Error('El email ya existe')
}
    },
    existedocumento: async (documento, req)=>{
        const existe= await Cliente.findOne({documento:documento})
        if(existe){
            throw new Error('El documento ya existe')
        }
    },
    clienteID: async (id, req)=>{
        const existe= await Cliente.findById(id)
        if(!existe){
            throw new Error('El registro no existe')
        }
    }
}
module.exports={clienteHelper}