import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shop_libros',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})



app.use('/api/users',userRouter);
app.use('/api/products',productRouter);


app.get('/',(req,res)=>{
    res.send('Server is ready');
});

// eslint-disable-next-line no-unused-vars
app.use((err,req, res, next)=> {
    res.status(500).send({message:err.message})
})


//Si existe un puerto por default tomalo, si no elige el puerto 5000
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Sever listening at http://localhost:${port}`);
});


