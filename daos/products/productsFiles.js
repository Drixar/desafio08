import { ProductManager } from "../../managers/Product.fs.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ProductsDaoArchivos extends ProductManager{
    constructor(filename){
        //ejecutamos el contructor de clase
        super(filename);
    }
}

export {ProductsDaoArchivos}