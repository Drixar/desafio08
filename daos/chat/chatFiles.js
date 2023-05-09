import { ContenedorArchivo } from "../../managers/ContenedorArchivo.js";

//crear una subclases de productos que trabaje con el contendor Archivos
class ChatDaoArchivos extends ContenedorArchivo{
    constructor(filename){
        //ejecutamos el contructor de clase ContenedorArchivo
        super(filename);
    }
}

export {ChatDaoArchivos}