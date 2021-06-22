import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartIcon from "./components/CartIcon";

import NavBar from "./components/NavBar";

import SigninIcon from "./components/SigninIcon";
import CartScreen from "./routes/CartScreen";
import HomeScreen from "./routes/HomeScreen";
import ProductScreen from "./routes/ProductScreen";
import SigninSreen from "./routes/SigninSreen";


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
                        <SigninIcon>{userInfo.name} <i class="fas fa-caret-down"></i></SigninIcon>
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
                <Route path="/signin" component={SigninSreen}></Route>
            </main>
            <footer className="flex-container center" style={{ 
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/bg-footer.png'})` 
            }}>
                © Copyright 2021 {brandName}
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
