import React from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import MenuItem from './MenuItem';


export default function NavBar(props) {
    return (
        <div className="flex-container space-around">
            <div className="flex-container size-1">
                <Link className="brand" to="/">{props.brandName}</Link>
            </div> 
            <input type="text" placeholder="Buscar en EdiQ" className="size-1 search-bar"></input> 
            <ul className='flex-container size-1 items_to_end'>
                {props.children}
            </ul>
            <Menu>
                <MenuItem>Inicio</MenuItem>
                <MenuItem>Tienda Virtual</MenuItem>
                <MenuItem>Demos</MenuItem>
                <MenuItem>Quiénes somos</MenuItem>
                <MenuItem>Contacto</MenuItem>
                <MenuItem>Ayuda</MenuItem>
            </Menu>
        </div>
    )
}
