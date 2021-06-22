import React from 'react'

export default function CheckOutSteps(props) {
    return (
        <div className="flex-container checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Iniciar sesión</div>
            <div className={props.step2 ? 'active' : ''}>Pagar</div>
            <div className={props.step3 ? 'active' : ''}>Método de pago</div>
            <div className={props.step4 ? 'active' : ''}>Completar pedido</div>
        </div>
    )
}
