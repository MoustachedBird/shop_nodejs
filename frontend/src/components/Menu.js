import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const MenuOptions = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  

  @media (max-width: 610px) {
    ${({ open }) => open ? `
        display: flex;
    `
    :
    `
        display: none;
    `
    }
    justify-content: unset;
  
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 70%;
    padding-top: 3.5rem;
  }
`;


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
            <div className="menuIcon" onClick={() => setOpen(!open)}>
                <i className="fas fa-bars fa-2x"></i>
            </div>
            <MenuOptions open={open}>
                {props.children}
            </MenuOptions>
            
        </div>
    )
}
