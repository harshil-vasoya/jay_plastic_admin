import { useContext, useEffect } from "react";
import { GlobalStoreContext } from "../store";
import { useApiCall } from "./useApiCall";
import { getAllOrder } from "../service/api";

export function useGetAllOrder(refresh, setRefreshing) {
  const { orders, setOrders } = useContext(GlobalStoreContext);
  const orderApiCall = useApiCall(getAllOrder);

  useEffect(() => {
    const fetchProducts = async () => {

      if (orders.length === 0 || refresh) {
        try {
          const response = await orderApiCall.call();
          setOrders(response);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          if (setRefreshing)
            setRefreshing(false);
        }
      }
    };
    fetchProducts();
  }, [refresh]);
  return [orders, setOrders, orderApiCall.inProgress];
}  