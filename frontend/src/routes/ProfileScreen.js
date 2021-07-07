import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success:successUpdate, error:errorUpdate, loading:loadingUpdate} = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo.id));
        } else{
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo.id, user]);
    
    const submitHandler= (e)=>{
        e.preventDefault()
        //dispatch update profile
        if(password !== confirmPassword){
            alert("Error, las contraseñas no son iguales. Por favor confirme nuevamente su contraseña.")
        }else{
            dispatch(updateUserProfile({userId: user._id, name, email, password}))
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Mi perfil</h1>
                </div>
                {
                    loading? <LoadingBox></LoadingBox>
                    :
                    error? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">Datos actualizados correctamente</MessageBox>}
                        
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Name</label>
                            <input id="email" type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">confirm Password</label>
                            <input id="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label/>
                            <button className="primaty" type="submit">Actualizar</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
