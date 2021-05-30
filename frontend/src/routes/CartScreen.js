import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    /*devuelve el valor después de un signo de interrogación en un link, es decir...
     props.history.push(`/cart/${productId}?qty={qty}`

     devolvería qty={qty}

     si existe ese texto entonces dividelo en dos a partir del signo = 
     resultado: ["qty"] ["12"]

     convierte ese string del numero (segunda posicion del array) a numero

     Si el valor de props.location.search no existe entonces el valor por default es 1
    */
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    
    const dispatch = useDispatch(); 
    //se ejecuta una vez
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch, productId, qty]);
    
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>Id del producto: {productId} Cantidad: {qty}</p>
        </div>
    )
}
