import express from 'express';
import expressAsyncHandler from 'express-async-handler';

import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();


productRouter.get('/', expressAsyncHandler(async (req,res)=>{
    const products = await Product.find({});
    res.send(products);
}))

productRouter.get('/seed',expressAsyncHandler(async (req,res)=>{
    //elimina todos los productos antes de añadir todos para evitar error por duplicar articulos
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    /*como respuesta enviara un json con {createdProducts:{ ... }} */
    res.send({createdProducts});
}))

productRouter.get('/:id',expressAsyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if (product){
        /*como respuesta enviara un json con el contenido, ejemplo {...} */
        res.send(product);
    }
    else{
        //404 = no encontrado
        res.status(404).send({message:"Producto no encontrado"});
    }    
}))

export default productRouter;

