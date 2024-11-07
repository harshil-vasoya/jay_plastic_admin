
import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import { useApiCall } from "./useApiCall";
import { getAllProducts } from '../service/api';
export function useGetAllProductData(refresh, setRefreshing) {
  const { products, setProducts } = useContext(GlobalStoreContext);
  const productsApiCall = useApiCall(getAllProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0 || refresh) {
        productsApiCall.call().then((response) => {
          setProducts(response);
          setRefreshing(false);
        }).catch((error) => {
          console.error('error', error);
          setRefreshing(false);
        });
      }
    };

    fetchProducts();
  }, [refresh]);
  return [products, setProducts, productsApiCall.inProgress];
}

export default useGetAllProductData;