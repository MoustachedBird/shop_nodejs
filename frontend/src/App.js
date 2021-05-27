import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./routes/HomeScreen";
import ProductScreen from "./routes/ProductScreen";

function App() {
  return (
    <BrowserRouter>
        <div className="main-container">
            <header className="row">
                <div>
                    <a className="brand" href="/">
                        EDI-Q
                    </a>
                </div>
                <div>
                    <a href="/cart">Carrito</a>
                    <a href="/signin">Iniciar sesión</a>
                </div>
            </header>
            <main>
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
