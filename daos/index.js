import { options } from '../config/config.js';
import { connectionString } from '../config/config.js';



let DaoProducts;
let DaoCarts;
let DaoChats;


//identificador
let databaseType = "mongo";

switch(databaseType){
    case "fs":
        const {ProductsDaoArchivos} = await import("./products/productsFiles.js");
        const {CartsDaoArchivos} = await import("./carts/cartsFiles.js");
        const {ChatDaoArchivos} = await import("./chat/chatFiles.js");
        DaoProductos = new ProductsDaoArchivos(options.fileSystem.pathProducts);
        DaoCarts = new CartsDaoArchivos(options.fileSystem.pathCarts);
        DaoChat = new ChatDaoArchivos(options.fileSystem.pathChat);
        break;
    case "mongo":
        const mongoose = await import("mongoose")
            mongoose.connect(connectionString,options.mongoDB)
                .then(() => {console.log("conexion exitosa")})
                .catch(err =>{console.log(`connection failed ${err}`)
                })
        const {cartSchema} = await import("../models/cart.js");
        const {chatSchema} =await import("../models/chat.js");
        const {productSchema} = await import("../models/products.js");
        const {CartsDaoMongo} = await import("./carts/cartsMongo.js")
        DaoCarts = new CartsDaoMongo("carts", cartSchema);
        const {ProductsDaoMongo} =await import ("./products/productsMongo.js");
        DaoProducts = new ProductsDaoMongo("products", productSchema);
        const {ChatsDaoMongo} = await import("./chat/chatMongo.js");
        DaoChats = new ChatsDaoMongo("chats",chatSchema);
        break;
}

export {DaoProducts,DaoCarts,DaoChats}