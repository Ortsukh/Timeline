import React, { useEffect } from "react";
import fetchJSON from "../common/helper";

export default function useGetOrdersByFilters(axiosParams, executeOnMount = true) {
  console.log(axiosParams);
  let isLocal = true;
  let backendUrl = "/admin/api/";
  let backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    backendManagerUrl = " http://localhost:3001/admin/manager/";
    isLocal = false;
  }
  const [fetchData, setFetchData] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);
  const handleData = async (options) => {
    if (!options) return [];
    let queryStr = "?";
    Object.keys(options).forEach((query) => {
      if (options[query]) {
        queryStr += `${query}=${options[query]}&`;
      }
    });
    try {
      const { data } = await fetchJSON(isLocal ? `${backendUrl}get_local_orders${options ? `?category=${options.category}` : ""}`
        : `${backendManagerUrl}get_equipment_items${queryStr}`);
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
