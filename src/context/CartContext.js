import React, { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();
function CartContextProvider(props) {
  const [cartItems, setCartItems] = useState(
    +(localStorage.getItem("cartItems") || 0)
  );
  function onCartUpdate() {
    setCartItems(cartItems + 1);
  }
  useEffect(() => {
    localStorage.setItem("cartItems", cartItems);
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{ cartItems: cartItems, onCartUpdate: onCartUpdate }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
function useCartContext() {
  const context = useContext(CartContext);
  if (context) {
    return context;
  } else {
    throw new Error(`useCartContext must be used inside CartContextProvider`);
  }
}

export { CartContextProvider, useCartContext };
