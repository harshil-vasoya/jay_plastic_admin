import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import { useApiCall } from "./useApiCall";
import { getAllCartData } from "../service/api";

export function useGetAllCartData(refresh, setRefreshing) {
  const { cartData, setCartData } = useContext(GlobalStoreContext);
  const cartDataApiCall = useApiCall(getAllCartData);
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartData?.products?.length === 0 || refresh) {
        try {
          const response = await cartDataApiCall.call();
          setCartData(response);
        } catch (error) {
          // console.error("error", error);
          setCartData({ products: [] });
        } finally {
          if (setRefreshing) {
            setRefreshing(false);
          }

        }
      }
    };
    fetchProducts();
  }, [refresh]);
  return [cartData, setCartData, cartDataApiCall.inProgress];
}  