import React, { createContext, useEffect, useState } from "react";

export const GlobalStoreContext = createContext();

const GlobalStoreProvider = ({ children }) => {
  const [cartData, setCartData] = useState({
    products: [],
    amount: 0,
    item: 0,
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(cartData?.length);
  useEffect(() => {
    setCartItemsCount(cartData?.products?.length);
  }, [cartData])
  
  return (
    <GlobalStoreContext.Provider
      value={{
        orders,
        setOrders,
        products,
        setProducts,
        cartData,
        setCartData,
        cartItemsCount,
        setCartItemsCount,
      }}
    >
      {children}
    </GlobalStoreContext.Provider>
  );
};

export default GlobalStoreProvider;
