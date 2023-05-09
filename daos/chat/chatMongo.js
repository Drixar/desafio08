import { ManagerMongo } from "../../managers/Mongo.js";

class ChatsDaoMongo extends ManagerMongo{
    constructor(collectionName, collectionSchema){
        super(collectionName, collectionSchema)
    }
}

export {ChatsDaoMongo}