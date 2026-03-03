import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const key = item.cartKey;
      const existing = prev.find((i) => i.cartKey === key);
      if (existing) {
        return prev.map((i) =>
          i.cartKey === key ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (cartKey) =>
    setCart((prev) => prev.filter((i) => i.cartKey !== cartKey));

  const updateQty = (cartKey, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.cartKey === cartKey ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQty, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
