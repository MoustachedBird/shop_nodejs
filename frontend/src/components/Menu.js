import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';


const MenuOptions = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  

  @media (max-width: 610px) {
    
    
    ${({open }) => !open ? `
        display: none;
        height:0;
    `
    :
    `
        height: 100%;    
        justify-content: unset;
        flex-flow: column nowrap;
        background-color: #0D2538;
        position: fixed;
        top: 0;
        left: 0;
        width: 60%;
        padding: 2.5rem;
        padding-top:6rem;  
        font-size: 2rem; 
    `
    }
  }
`;

const BlurDiv = styled.div`
  @media (max-width: 610px) {    
    ${({open }) => !open ? `
        display: none;
        height:0;
    `
    :
    `
        display: unset;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background-color: #00000080;
    `
    }
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
        <div className="menu-bar">
            <div className="menuIcon" onClick={() => setOpen(!open)}>
                <i className="fas fa-bars fa-2x"></i>
            </div>
            <BlurDiv open={open}>

            </BlurDiv>
            <MenuOptions open={open} ref={menuRef}>
                {props.children}
            </MenuOptions>

        </div>
    )
}
