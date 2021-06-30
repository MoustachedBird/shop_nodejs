import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckOutSteps from '../components/CheckOutSteps'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);

    if(!cart.paymentMethod){
        props.history.push("/payment");
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((acumulator, currentItem) => 
        acumulator+currentItem.qty * currentItem.price,0
    ));
    cart.shippingPrice = cart.itemsPrice >100? toPrice(0) : toPrice(10); //costo de envío
    cart.taxPrice = toPrice(0.16 * cart.itemsPrice);
    cart.totalPrice= cart.itemsPrice + cart.taxPrice + cart.shippingPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = (e)=>{
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems}));
    }

    useEffect(() => {
        if (success){
            props.history.push(`/order/${order._id}`);
            dispatch({type:ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success])

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4></CheckOutSteps>
            <div className="flex-container top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Envío</h2>
                                <p>
                                    <strong>Nombre:</strong> {cart.shippingAddress.fullName}<br/>
                                    <strong>Dirección:</strong> {cart.shippingAddress.address},
                                    {' '+cart.shippingAddress.city}, {' '+cart.shippingAddress.postalCode},
                                    {' '+cart.shippingAddress.country+'.'}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Método de pago</h2>
                                <p>
                                    <strong>Método seleccionado:</strong> {cart.paymentMethod}<br/>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Orden</h2>
                                <ul>
                                    {cart.cartItems.map( item => (
                                        <li key={item.product}>
                                            <div className="flex-container">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="small"></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>                                        
                                                </div>
                                                <div>{item.qty} x ${item.price} = ${item.price*item.qty}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Resumen del pedido</h2>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div>Costo de envío</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div>Impuestos (IVA)</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div><strong>Total a pagar</strong></div>
                                    <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" className="primary block" onClick={placeOrderHandler} disabled={cart.cartItems===0}>
                                    Pagar ahora
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
