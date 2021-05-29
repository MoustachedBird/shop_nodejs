import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import data from '../data'

export default function ProductScreen(props) {
    //devuelve el producto si la id del producto actual coincide con la id del link
    const product = data.products.find(x => x._id === props.match.params.id) 
    
    //si el producto no existe entonces...
    if(!product){
        return (
            <div>
                404: Producto no encontrado 
            </div>
        )
    }

    return (
        <div className="huge-card">        
            <Link to='/'>Inicio</Link>
            <div className="row top">
                <div className="col-2">
                    <img 
                        className="large" 
                        src={product.image} 
                        alt={product.name} 
                    />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                        </li>
                        <li>${product.price}</li>
                        <li>
                            Descripción:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Precio:</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
                                    <div>Estado:</div>
                                    <div>
                                        {product.countInStock>0?(
                                            <span className="success">Disponible</span>
                                        ):(
                                            <span className="danger">No disponible</span>
                                        )}
                                    </div>    
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Añadir al carrito</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
