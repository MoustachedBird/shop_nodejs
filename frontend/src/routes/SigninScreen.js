import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { signin } from '../actions/userActions';
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

export default function SigninScreen(props) {
    
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo, loading, error} = userSignin;


    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        //for signin action
        dispatch(signin(email,password));
    };

    useEffect(() => {
        if (userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Iniciar sesión</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" id="email" placeholder="hola@ejemplo.com" required onChange = {e => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Introducir contraseña" required onChange = {e => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Iniciar sesión</button>
                </div>
                <div>
                    <label/>
                    <div>
                        ¿No tienes una cuenta? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Regístrate aquí</Link>
                    </div>
                </div>
            </form>
            
        </div>
    )
}
