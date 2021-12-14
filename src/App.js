import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);
  
  const hideCartHandler = () => {
    setShowCart(false);
  }

  const showCartHandler = () => {
    setShowCart(true);
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onCartClick={showCartHandler} />
      <Meals />
    </CartProvider>
  );
}

export default App;
