import { CartManager } from "../../managers/Cart.fs.js";

//crear una subclases de carritos  que trabaje con el contendor Archivos
class CartsDaoArchivos extends CartManager{
    constructor(filename){
        //ejecutamos el contructor de clase
        super(filename);
    }
}

export {CartsDaoArchivos}