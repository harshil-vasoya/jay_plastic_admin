import { DELETE, GET, POST, PUT } from './httpRequest';



const REACT_APP_BACKEND_URL = "https://kiranbath.digo18.in";
// region Auth
// ===================== Auth  =====================
export const sendOtp = (data) => {
  const url = `${REACT_APP_BACKEND_URL}/api/users/send-otp`;
  return POST({ url, data });
}

export const verifyOtp = (data) => {
  const url = `${REACT_APP_BACKEND_URL}/api/users/verify-otp`;
  const params = { token: data.token };
  delete data.token;
  return POST({ url, data, params });
}

export const registerUser = (data) => {
  const url = `${REACT_APP_BACKEND_URL}/api/users/register`;
  const params = { token: data.token };
  delete data.token;
  return POST({ url, data, params });
}

export const sendNotificationToken = (token) => {
  const url = `${REACT_APP_BACKEND_URL}/api/users/set-token`;
  return POST({ url, data: { push_token: token } });
}
// endregion 

// region Product 
// ===================== Product  =====================

export const getAllProducts = () => {
  const url = `${REACT_APP_BACKEND_URL}/api/products`;
  return GET({ url });
}

// endregion

// region Cart
// ===================== Cart  =====================
export const getAllCartData = () => {
  const url = `${REACT_APP_BACKEND_URL}/api/cart`;
  return GET({ url });
}

export const addToCart = (data) => {
  const url = `${REACT_APP_BACKEND_URL}/api/cart`;
  return POST({ url, data });
}

export const removeProductFromCart = (productId) => {
  const url = `${REACT_APP_BACKEND_URL}/api/cart/product/${productId}`;
  return DELETE({ url });
}

export const emptyCart = () => {
  const url = `${REACT_APP_BACKEND_URL}/api/cart`;
  return DELETE({ url });
}

// endregion

// region Order
// ===================== Order  =====================

export const getAllOrder = () => {
  const url = `${REACT_APP_BACKEND_URL}/api/orders`;
  return GET({ url });
}

export const placeOrder = (data) => {
  const url = `${REACT_APP_BACKEND_URL}/api/orders`;
  return POST({ url, data });
}

// endregion  


