import React, { useEffect } from "react";
import fetchJSON from "../common/helper";

export default function useGetOrdersByFilters(axiosParams, executeOnMount = true) {
  const isLocal = true;
  let backendUrl = "/admin/api/";
  let backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    backendManagerUrl = " http://localhost:3001/admin/manager/";
  }
  const [fetchData, setFetchData] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);
  const handleData = async (options) => {
    console.log(options);
    try {
      const { data } = await fetchJSON(isLocal ? `${backendUrl}get_local_orders${options ? `?category=${options.category}` : ""}`
        : `${backendManagerUrl}get_equipment_items?category=${options.category}&start=${options.start}&end=${options.end}`);
      console.log(data);
      setFetchData(data);
      return data;
    } catch (error) {
      setFetchError(error);
      return error;
    }
  };
  useEffect(() => {
    if (executeOnMount) handleData(axiosParams);
  }, []);

  return { execute: handleData, fetchData, fetchError };
}
