import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartIcon from "./components/CartIcon";

import NavBar from "./components/NavBar";

import SigninIcon from "./components/SigninIcon";
import CartScreen from "./routes/CartScreen";
import HomeScreen from "./routes/HomeScreen";
import PaymentMethodsScreen from "./routes/PaymentMethodsScreen";
import PlaceOrderScreen from "./routes/PlaceOrderScreen";
import ProductScreen from "./routes/ProductScreen";
import RegisterSreen from "./routes/RegisterScreen";
import ShippingAddressScreen from "./routes/ShippingAddressScreen";
import SigninScreen from "./routes/SigninScreen";


function App() {
    const brandName="EDI-Q";

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
                            <Link to="#signout" onClick={singoutHandler}>Cerrar Sesión</Link>
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
                <Route path="/" component={HomeScreen} exact></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterSreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>
                <Route path="/payment" component={PaymentMethodsScreen}></Route>
                <Route path="/placeorder" component={PlaceOrderScreen}></Route>
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
