import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import  Contact  from "./pages/Contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import Login from "./../src/login";
 
function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} /> 
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;