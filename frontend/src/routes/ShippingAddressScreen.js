import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps'

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if (!userInfo){
        props.history.push('/signin');
    };

    const cart = useSelector (state => state.cart);
    const {shippingAddress} = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    
    const dispatch = useDispatch();
    const submitHandler = (e)=>{
         e.preventDefault();
         //save shipping address
         dispatch(saveShippingAddress({fullName,address,city,postalCode,country}));
         props.history.push('/payment')
    }
    
    return (
       <div>
           <CheckOutSteps step1 step2></CheckOutSteps> 
           <form className="form" onSubmit={submitHandler}>
               <div>
                   <h1>Dirección de envío</h1>
               </div>
               <div>
                   <label htmlFor="fullName">Nombre completo</label>
                   <input type="text" id="fullName" placeholder="Escribe aquí tu nombre" 
                        value={fullName} onChange={(e)=> setFullName(e.target.value)} 
                        required
                    ></input>
                    <label htmlFor="address">Dirección</label>
                    <input type="text" id="address" placeholder="Escribe aquí tu dirección" 
                        value={address} onChange={(e)=> setAddress(e.target.value)} 
                        required
                    ></input>
                    <label htmlFor="city">Ciudad</label>
                    <input type="text" id="city" placeholder="Ciudad en donde reside" 
                        value={city} onChange={(e)=> setCity(e.target.value)} 
                        required
                    ></input>
                    <label htmlFor="postalcode">Código postal</label>
                    <input type="text" id="postalcode" placeholder="Escribe aquí tu Código Postal" 
                        value={postalCode} onChange={(e)=> setPostalCode(e.target.value)} 
                        required
                    ></input>
                    <label htmlFor="country">País</label>
                    <input type="text" id="country" placeholder="Escribe aquí tu país" 
                        value={country} onChange={(e)=> setCountry(e.target.value)} 
                        required
                    ></input>
               </div>
               <div>
                   <label/>
                   <button className="primary" type="submit">Continuar</button>
               </div>
           </form>
        </div>
    )
}
