import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Menu(props) {
    const [open, setOpen] = useState(false)

    const menuRef = useRef();

    /*Para cerrar el dropdown si hay click afuera*/
    const clickOutsideHandler = event => {
        if(!menuRef.current.contains(event.target)){
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideHandler)
        return () =>{
            document.removeEventListener("mousedown",clickOutsideHandler)
        }
    }, [])
    
    return (
        <div className="menu-bar" ref={menuRef}>
            <Link to="/" onClick={() => setOpen(!open)} className="menuIcon">
                <i class="fas fa-bars fa-2x"></i>
            </Link>
            <ul className="dropdown">
                {props.children}
            </ul>
        </div>
    )
}
