import { ManagerMongo } from "../../managers/Mongo.js";

class ProductsDaoMongo extends ManagerMongo{
    constructor(collectionName, collectionSchema){
        super(collectionName, collectionSchema)
    }
}

export {ProductsDaoMongo}