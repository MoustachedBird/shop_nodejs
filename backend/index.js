import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';

const app = express();
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shop_libros',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/api/products/:id',(req,res)=>{
    const product = data.products.find( x => x._id === req.params.id);
    if (product){
        res.send(product);
    }
    else{
        //404 = no encontrado
        res.status(404).send({message:"Producto no encontrado"});
    }

})

app.use('/api/users',userRouter);

app.get('/api/products',(req,res)=>{
    res.send(data.products);
})

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.use((err,req, res, next)=> {
    res.status(500).send({message:err.message})
})


//Si existe un puerto por default tomalo, si no elige el puerto 5000
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Sever listening at http://localhost:${port}`);
});


