import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';



export default function CartScreen(props) {
    const productId = props.match.params.id;
    /*devuelve el valor después de un signo de interrogación en un link, es decir...
     props.history.push(`/cart/${productId}?qty={qty}`

     devolvería qty={qty}

     si existe ese texto entonces dividelo en dos a partir del signo = 
     resultado: ["qty"] ["12"]

     convierte ese string del numero (segunda posicion del array) a numero

     Si el valor de props.location.search no existe entonces el valor por default es 1
    */
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch(); 
    //se ejecuta una vez
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty));
        }
    }, [dispatch, productId, qty]);
    
    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () =>{
        //proceder a pagar
        props.history.push('signin?redirect=shipping')
    }

    return (
        <div className="huge-card">
            <div className="row top">
                <div className="col-2">
                    <h1>Mi carrito de compras</h1>
                    {cartItems.length === 0? 
                        <MessageBox>
                            El carrito está vacío <Link to="/">Ir a comprar</Link>
                        </MessageBox>
                    :
                        <ul>
                            {cartItems.map( item => (
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <img src={item.image} alt={item.name} className="small"></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>                                        
                                        </div>
                                        <div>
                                            <select value={item.qty} 
                                                onChange={e => 
                                                    dispatch(
                                                        addToCart(item.product,Number(e.target.value))
                                                    )
                                                }
                                            >
                                                {
                                                    [...Array(item.countInStock).keys()].map(
                                                        x => (
                                                            <option key={x+1} value={x + 1}> {x + 1} </option> 
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div>${item.price}</div>
                                        <div>
                                            <button type="button" onClick={()=>removeFromCartHandler(item.product)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} productos) : 
                                ${cartItems.reduce((a,c)=> a + c.price*c.qty,0)}
                            </li>
                            <li>
                                <button type="button" onClick={checkOutHandler} className="primary block" disabled={cartItems.length === 0}>
                                    Proceder a pagar
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
