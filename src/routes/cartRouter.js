import express from 'express';
import { DaoCarts } from '../../daos/index.js'
const cartRouter = express.Router();
const cartManager = DaoCarts;



cartRouter.get("/:id", async(req,res, next)=>{
    const {id} = req.params;
    console.log("id", id)
    const [status, message, carrito] = await cartManager.getById(id);
    console.log(carrito)
    switch(status) {
        case '200': 
            res.status(200).send({
                message:message,
                response: carrito.products
            });
            return;
        case '404':
            res.status(404).send({
                message:message
            });
            next();
    }
})

cartRouter.get("/", async(req, res, next) => {
    const limit = req.query.limit? +req.query.limit : 0;
    const [status, message, carritos] = await cartManager.getAll();
    switch(status) {
        case '200': 
            res.status(200).send({
                message:"Listado de Carritos",
                response: carritos.length > limit && limit > 0 ? carritos.slice(0,limit) : carritos
            });
            return;
        case '404':
            res.status(404).send({
                message:message
            });
    }
})

cartRouter.post("/",async(req,res,next)=>{
    const products = req.body;
    const [status, message, carritos] = await cartManager.add(products);
    switch(status) {
        case '200': 
            res.status(200).send({
                message:message,
                response: carritos
            });
            return
        case '400':
            res.status(400).send({
                message:message
            });

    }
})

cartRouter.put("/:id", async(req,res)=>{
    const {id} = req.params;
    const products = req.body;
    const [status, message, CarritoActualizado] = await cartManager.updateById(id,products);
    switch(status) {
        case '200': 
            res.status(200).send({
                message:message,
                response: CarritoActualizado
            });
            return
        case '404':
            res.status(400).send({
                message:message
            });

    }
})

cartRouter.delete("/:id", async(req,res)=>{
    const {id} = req.params;
        const [status, message, carritos] = await cartManager.deleteById(id);
        switch(status) {
            case '200': 
                res.status(200).send({
                    message:message,
                    response: carritos
                });
                return
            case '404':
                res.status(400).send({
                    message:message
                });
    
        }
})

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const productQuantity = req.body.quantity;  // la cantidad de productos se pasa por body params ya que en la consigna no se especifica 
                                                // la pasé en formato.json { "quantity": 2}
    let [prevStatus, prevMessage, cart] = await cartManager.getById(cid);
    if(cart.products.some((element) => element.id == pid)){
        cart.products[cart.products.findIndex(x => x.id == pid)].quantity += productQuantity;
    } else {
        cart.products.push({id: pid, quantity: productQuantity})
    }
    const [status, message, carritoActualizado] = await cartManager.updateById(cid,cart);
    switch(status) {
        case '200': 
            res.status(200).send({
                message:message,
                response: carritoActualizado
            });
            return
        case '404':
            res.status(400).send({
                message:message
            });

    }
})
export default cartRouter;