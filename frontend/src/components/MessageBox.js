import React from 'react'

/*Para mostrar un mensaje de error o informacion*/

export default function MessageBox(props) {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}
