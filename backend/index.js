import express from 'express'
import data from './data.js'

const app = express();
//Si existe un puerto por default tomalo, si no elige el puerto 5000
const port = process.env.PORT || 5000;


app.get('/api/products',(req,res)=>{
    res.send(data.products);
})

app.get('/',(req,res)=>{
    res.send('Server is ready');
});

app.listen(port,() => {
    console.log(`Sever listening at http://localhost:${port}`);
});


