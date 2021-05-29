import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Product from '../components/Product';
import data from '../data';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

export default function HomeScreen() {

    /*React Hook: el valor por default de products es un array vacío (useState), 
    cuando queremos actualizar el valor de products usamos setProducts
    */
    const [products,setProducts] = useState([]);
    //para ver el estado de carga
    const [loading, setLoading] = useState(false);
    //para ver errores
    const [error, setError] = useState(false);
    
    //Se ejecuta una vez cuando se compila el servidor
    useEffect(() => {
        //se define la funcion fetchdata
        const fetchData = async() =>{
            try{
                setLoading(true);
                //toma los productos del link
                const { data } = await axios.get('/api/products');
                setLoading(false);
                //los guarda en la constante products
                setProducts(data);
            } catch(err){
                setError(err.message);
                setLoading(false);
            }
        };
        //se llama a la funcion fetchdata
        fetchData();
    }, []);


    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger" >{error}</MessageBox>
            :    
            <div className="row center"> 
                {
                    data.products.map(product => (
                        <Product key={product._id} product = {product}></Product>             
                    ))
                }        
            </div>
            }
        </div>
    )
}
