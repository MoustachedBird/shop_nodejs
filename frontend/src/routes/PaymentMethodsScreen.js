import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps'

export default function PaymentMethodsScreen(props) {
 
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if (!userInfo){
        props.history.push('/signin');
    };

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    if(!shippingAddress.address){
        props.history.push('/shipping')
    }
    
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    
    const dispatch = useDispatch();
    
    const submitHandler = e =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }
    
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Método de pago</h1>
                </div>
                <div>
                    <input type="radio" id="paypal" value="PayPal" name="paymentMethod" 
                    required checked onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div>
                    <input type="radio" id="stripe" value="Stripe" name="paymentMethod" 
                    required onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <button className="primary" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    )
}
