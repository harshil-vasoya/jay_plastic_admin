
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStoreContext } from "./GlobalStoreContext";
import React, { createContext, useContext, useEffect, useState } from "react";
// import { sendNotificationToken } from "../service/api";
import { useNotification } from "./NotificationContext";

export const AuthStoreContext = createContext();


const AuthStoreProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { setCartData, setProducts, setCartItemsCount, setOrders } = useContext(GlobalStoreContext);
  const { expoPushToken, error } = useNotification();

  // get user data from local storage
  const getUserData = async () => {
    try {
      const tempUser = await AsyncStorage.getItem('user');
      if (tempUser) {
        setUser(JSON.parse(tempUser));
      }
    } catch (e) {
      console.error('Error retrieving user data', e);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  const isLoggedIn = async () => {
    try {
      const tempToken = await AsyncStorage.getItem('Authorization');
      if (tempToken) {
        setToken(tempToken);
        return true;
      }

    } catch (e) {
      console.error('Error retrieving token', e);
      return false;
    }
  }

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('Authorization', token);
      if (expoPushToken && !error) {
        // sendNotificationToken(expoPushToken)
      }
      setToken(token);
    } catch (e) {
      console.error('Error storing token', e);
    }
  }

  const clearStore = async () => {
    setToken(null);
    await AsyncStorage.removeItem('Authorization');
    setCartData({
      item: 0,
      amount: 0,
      products: []
    });
    setProducts([]);
    setCartItemsCount(0);
    setOrders([]);
  }

  return (
    <AuthStoreContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        token,
        setToken,
        storeToken,
        clearStore
      }}
    >
      {children}
    </AuthStoreContext.Provider>
  );
};

export default AuthStoreProvider;
