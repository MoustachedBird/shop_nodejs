import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsOrder } from '../actions/orderActions';
import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2'

export default function OrderScreen(props) {
  
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    
    const dispatch = useDispatch();

    useEffect(() => {
        const addPaypalScript = async () =>{
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type='text/javascript'
            script.src=`https://www.paypal.com/sdk/js?client-id=${data}` 
            script.async=true;
            //onload happends when this script downloaded in your browser and its ready to use
            script.onload = () =>{
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (!order){
            dispatch(detailsOrder(orderId));
        }else{
            if (!order.isPaid){
                if(!window.paypal){
                    addPaypalScript();
                }else{
                    setSdkReady(true);
                }
            }
        }
    //when is a change in order, orderId, sdkReady this function will run
    }, [dispatch, order, orderId, sdkReady])


    const successPaymentHandler = ()=>{
        //TODO
    }

    return loading? (<LoadingBox></LoadingBox>):
    error?(<MessageBox variant="danger">{error}</MessageBox>)
    :
    (
        <div>
            <h1>Order {order._id}</h1>
            <div className="flex-container top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Envío</h2>
                                <p>
                                    <strong>Nombre:</strong> {order.shippingAddress.fullName}<br/>
                                    <strong>Dirección:</strong> {order.shippingAddress.address},
                                    {' '+order.shippingAddress.city}, {' '+order.shippingAddress.postalCode},
                                    {' '+order.shippingAddress.country+'.'}
                                </p>
                                {
                                    order.isDelivered? 
                                        <MessageBox variant="success">Entregado el {order.deliveredAt}</MessageBox>
                                    :
                                        <MessageBox variant="danger">No entregado</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Método de pago</h2>
                                <p>
                                    <strong>Método seleccionado:</strong> {order.paymentMethod}<br/>
                                </p>
                                {
                                    order.isPaid? 
                                        <MessageBox variant="success">Pagado el {order.paidAt}</MessageBox>
                                    :
                                        <MessageBox variant="danger">No pagado</MessageBox>
                                }
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Orden</h2>
                                <ul>
                                    {order.orderItems.map( item => (
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
                                    <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div>Costo de envío</div>
                                    <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div>Impuestos (IVA)</div>
                                    <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="flex-container">
                                    <div><strong>Total a pagar</strong></div>
                                    <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {
                                !order.isPaid&&(
                                    <li>
                                        {!sdkReady ? <LoadingBox></LoadingBox>
                                        :<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
