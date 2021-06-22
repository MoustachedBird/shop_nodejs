import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../actions/userActions';
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";

export default function RegisterSreen(props) {
    

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const redirect = props.location.search? props.location.search.split('=')[1]: '/';

    const userRegister = useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;


    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        //for signin action
        if (password !== confirmPassword){
            alert("Las contraseñas son diferentes, por favor escriba nuevamente su contraseña")
        }
        else{
            dispatch(register(name,email,password));
        }
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
                    <h1>Crear una cuenta</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" placeholder="Escriba aquí su nombre" required onChange = {e => setName(e.target.value)}>
                    </input>
                </div>
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
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input type="password" id="confirmpassword" placeholder="Confirmar contraseña" required onChange = {e => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Regístrate</button>
                </div>
                <div>
                    <label/>
                    <div>
                        ¿Ya tienes una cuenta? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Iniciar sesión</Link>
                    </div>
                </div>
            </form>
            
        </div>
    )
}
