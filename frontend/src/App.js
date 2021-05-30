import { useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import CartScreen from "./routes/CartScreen";
import HomeScreen from "./routes/HomeScreen";
import ProductScreen from "./routes/ProductScreen";

function App() {
  
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

  
    return (
    <BrowserRouter>
        <div className="main-container">
            <header className="row">
                <div>
                    <Link className="brand" to="/">
                        EDI-Q
                    </Link>
                </div>
                <div>
                    <span className="navigation-bar-icon">
                        <Link to="/signin">
                            <i className="fas fa-user separate-right"></i>
                            Iniciar sesión
                        </Link>
                    </span>
                    <span className="navigation-bar-icon">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"></i>
                            {cartItems.length >0 && (
                                <span className="badge separate-right"> 
                                    {cartItems.length}
                                </span>
                            )}
                            Carrito
                        </Link>
                    </span>
                </div>
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>                
                <Route path="/product/:id" component={ProductScreen}></Route>                
                <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="row center">
                © Copyright 2021 Ediq MX
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
