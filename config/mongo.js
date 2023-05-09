import mongoose from 'mongoose';
import { options } from './config.js';
import { connectionString } from './config.js';

let ContenedorDaoProductos;
let ContenedorDaoCarritos;
let ContenedorDaoChat;

mongoose.connect(connectionString,options, error=>{
    if(error) throw new Error(`connection failed ${error}`);
    console.log("conexion exitosa")
})
const {cartSchema} = await import("../models/cart.js");
const {chatSchema} =await import("../models/chat.js");
const {productSchema} = await import("../models/products.js");
const {CarritosDaoMongo} = await import("./carts/cartsMongo.js");
ContenedorDaoCarritos = new CarritosDaoMongo("cart", cartSchema);
const {ProductosDaoMongo} =await import ("./products/productsMongo.js");
ContenedorDaoProductos = new ProductosDaoMongo("products", productSchema);
const {ChatDaoMongo} = await import("./chat/chatMongo.js");
ContenedorDaoChat =new ChatDaoMongo("chat",chatSchema);