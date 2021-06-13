import React from 'react'
import { Link } from 'react-router-dom'

export default function MenuItem(props) {
    return (
        <li>
            <Link to="/" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-button">{props.rightIcon}</span>            
            </Link>
        </li>
    )
}
