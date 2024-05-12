const express=require('express')
const mongoose = require('mongoose')
const cors =require('cors')
require('dotenv').config()
const usuarios=require('./src/rutas/usuarios')
const carrito=require('./src/rutas/carrito')
const clientes=require('./src/rutas/clientes')
const detalle=require('./src/rutas/detalle')
const productos=require('./src/rutas/productos')
const ventas=require('./src/rutas/ventas')


const app= express()

app.use(cors())
app.use(express.json())
app.use('/api/usuarios',usuarios)
app.use('/carrito/api',carrito)
app.use('/clientes/api',clientes)
app.use('/detalle/api', detalle)
app.use('/productos/api',productos)
app.use('/ventas/api',ventas)

// app.listen()

app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    mongoose.connect('mongodb://127.0.0.1:27017/test')
        .then(() => console.log('Connected!')); 
});