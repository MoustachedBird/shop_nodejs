import React from 'react'
import { Link } from 'react-router-dom';

import Rating from './Rating';

/*
Este componente crea las tarjetas y muestra cada producto

Conceptos básicos:
    * Par crear una funcion por defecto teclear rfc (requiere extension 
      ES7 React/Redux/GraphQL/React-Native snippets)
    
    * props permite pasar datos entre componentes
*/ 
export default function Product(props) {
    const {product} = props;
    return (
        <div key={product._id} className="huge-card">
            <Link to={`/product/${product._id}`}>
                <img 
                    className="medium" 
                    src={product.image} 
                    alt={product.name} 
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>                                
                    <h2>{product.name}</h2>
                </Link>
                <div className="price">
                    ${product.price}  
                </div>
                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </div>
        </div>
    )
}
