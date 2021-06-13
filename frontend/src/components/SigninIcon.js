import React from 'react'
import { Link } from 'react-router-dom'

export default function SigninIcon(props) {
    return (
        <li className="nav-item">
            <Link to="/signin" className='icon-button'>
                <i className="fas fa-user"></i>
                <par className="separate-left">
                    {props.children}
                </par>
            </Link>
        </li>
    )
}
