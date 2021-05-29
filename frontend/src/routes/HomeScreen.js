import React, { useEffect } from 'react';


import Product from '../components/Product';
import data from '../data';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    //cuando se definen así las constantes, se buscan dentro de otra constante
    const {loading, error, products} = productList;
    
    //Se ejecuta una vez cuando se compila el servidor
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);


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
