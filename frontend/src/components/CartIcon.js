import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CartIcon(props) {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    
    return (
        <li className="nav-item">
            <Link to="/cart" className='icon-button'>
                <i className="fas fa-shopping-cart"></i>
                {cartItems.length >0 && (
                    <span className="number-cart"> 
                        {cartItems.length}
                    </span>
                )}
                <p className="separate-left">
                    {props.children}
                </p>
            </Link>
        </li>
    )
}
