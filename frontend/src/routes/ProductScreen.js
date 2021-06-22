import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating'


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state) => state.productDetails);
    const {loading, error,  product} = productDetails;

    //variable y funcion para actualzar el valor
    const [qty, setQty] = useState(1);

    const addtoCartHandler = () => {
        //Crea una ruta para la aplicación
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    //Se ejecuta una vez cuando se compila el servidor    
    useEffect(() => {
        dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    return (
        <div>
            {loading ? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger" >{error}</MessageBox>
            :    
            <div className="huge-card">        
                <div className="flex-container top">
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
                                    <div className="flex-container">
                                        <div>Precio:</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>

                                <li>
                                    <div className="flex-container">
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
                                {
                                    product.countInStock >0  &&
                                    <>
                                        <li>
                                            <div className="flex-container">
                                                <div>Cantidad</div>
                                                <div>
                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(
                                                                x => (
                                                                    <option key={x+1} value={x + 1}> {x + 1} </option> 
                                                                )
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button className="primary block" onClick={addtoCartHandler}>
                                                Añadir al carrito
                                            </button>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>

       
    )
}
