import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartIcon from "./components/CartIcon";

import NavBar from "./components/NavBar";

import SigninIcon from "./components/SigninIcon";
import CartScreen from "./routes/CartScreen";
import HomeScreen from "./routes/HomeScreen";
import OrderHistoryScreen from "./routes/OrderHistoryScreen";
import OrderScreen from "./routes/OrderScreen";
import PaymentMethodsScreen from "./routes/PaymentMethodsScreen";
import PlaceOrderScreen from "./routes/PlaceOrderScreen";
import ProductScreen from "./routes/ProductScreen";
import ProfileScreen from "./routes/ProfileScreen";
import RegisterSreen from "./routes/RegisterScreen";
import ShippingAddressScreen from "./routes/ShippingAddressScreen";
import SigninScreen from "./routes/SigninScreen";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    const brandName="Indie Book";

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();
    const singoutHandler = () =>{
        dispatch(signout());
    }

    return (
    <BrowserRouter>
        <div className="grid-container">
            <header>
                <NavBar brandName={brandName}>
                    {userInfo ? 
                    <div className="dropdown">
                        <SigninIcon>{userInfo.name} <i className="fas fa-caret-down"></i></SigninIcon>
                        <ul className="dropdown-content">
                            <li>
                                <Link to="/profile">Mi perfil</Link>
                            </li>
                            
                            <li>
                                <Link to="/orderhistory">Historial de pedidos</Link>
                            </li>
                            <li>
                                <Link to="/#signout" onClick={singoutHandler}>Cerrar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                    :
                    <SigninIcon>Iniciar Sesión</SigninIcon>
                    }
                    <CartIcon>Mi carrito</CartIcon>   
                </NavBar>                    
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>                
                <Route path="/product/:id" component={ProductScreen}></Route>                
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterSreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>
                <Route path="/payment" component={PaymentMethodsScreen}></Route>
                <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                <Route path="/order/:id" component={OrderScreen}></Route>
                <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="flex-container center" style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL + '/background/bg-footer.png'})` 
            }}>
                © Copyright 2021 {brandName}
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
