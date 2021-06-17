import React from 'react'
import { Link } from 'react-router-dom'

export default function SigninIcon(props) {
    return (
        <li className="nav-item">
            <Link to="/signin" className='icon-button'>
                <i className="fas fa-user"></i>
                <p className="separate-left">
                    {props.children}
                </p>
            </Link>
        </li>
    )
}
