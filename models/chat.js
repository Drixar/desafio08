import mongoose from "mongoose";

//definir el esquema
export const chatSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    }
})
