import mongoose from "mongoose";

//definir el esquema
export const cartSchema = new mongoose.Schema({
    // carritoTimestamP:{
    //     type: Date,
    //     required: true
    // },
    products: [
        {
          id: {
            type: String,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
        }
      ]
})

