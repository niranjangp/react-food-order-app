import React, { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [displayCart, setDisplayCart] = useState(false);

  const handleShowCart = () => {
    try {
      setDisplayCart(true);
    } catch (e) {
      console.log("error in handleShowCart", e.stack)
    }
  }

  const handleHideCart = () => {
    try {
      setDisplayCart(false);
    } catch (e) {
      console.log("error in handleHideCart", e.stack)
    }
  }

  return (
    <CartProvider>
      {displayCart ? <Cart onClose={handleHideCart} /> : null}
      {/* or use displayCart && <Cart/>*/}
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
