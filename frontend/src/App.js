import { BrowserRouter, Route } from "react-router-dom";
import CartIcon from "./components/CartIcon";

import NavBar from "./components/NavBar";

import SigninIcon from "./components/SigninIcon";
import CartScreen from "./routes/CartScreen";
import HomeScreen from "./routes/HomeScreen";
import ProductScreen from "./routes/ProductScreen";


function App() {
    const brandName="EDI-Q";
    return (
    <BrowserRouter>
        <div className="grid-container">
            <header>
                <NavBar brandName={brandName}>
                    <SigninIcon>Iniciar Sesión</SigninIcon>
                    <CartIcon>Mi carrito</CartIcon>   
                </NavBar>                    
            </header>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>                
                <Route path="/product/:id" component={ProductScreen}></Route>                
                <Route path="/" component={HomeScreen} exact></Route>
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
