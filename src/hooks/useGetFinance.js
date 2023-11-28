import React, { useEffect, useState } from "react";
import fetchJSON from "../common/helper";

export default function useGetFinance(axiosParams) {
  const isLocal = true;
  const [loading, setLoading] = useState(true);

  let backendUrl = "/admin/api/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
  }
  const [fetchData, setFetchData] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);
  const handleData = async (options) => {
    if (!options) {
      return [];
    }
    let queryStr = "?";
    Object.keys(options).forEach((query) => {
      if (options[query]) {
        queryStr += `${query}=${options[query]}&`;
      }
    });
    setLoading(true);
    try {
      const { data } = await fetchJSON(isLocal ? `${backendUrl}get_finance_report${queryStr}`
        : `${backendUrl}get_finance_report${queryStr}`);
      console.log(data);
      setLoading(false);

      setFetchData(data);
      return data;
    } catch (error) {
      setFetchError(error);
      return error;
    }
  };
  useEffect(() => {
    handleData(axiosParams);
  }, []);

  return {
    execute: handleData, fetchData, fetchError, loading,
  };
}
