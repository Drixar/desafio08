import { ManagerMongo } from "../../managers/Mongo.js";

class CartsDaoMongo extends ManagerMongo{
    constructor(collectionName, collectionSchema){
        super(collectionName, collectionSchema)
    }
}

export {CartsDaoMongo}