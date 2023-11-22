import React, { useEffect } from "react";
import fetchJSON from "../common/helper";

export default function useGetFinance(axiosParams) {
  const isLocal = true;
  let backendUrl = "/admin/api/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
  }
  const [fetchData, setFetchData] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);
  const handleData = async (options) => {
    if (!options) { return []; }
    try {
      const { data } = await fetchJSON(isLocal ? `${backendUrl}get_finance_report/${options.start}/${options.end}/${options.step}${options.id ? `/${options.id}` : ""}`
        : `${backendUrl}get_finance_report/${options.start}/${options.end}/${options.step}${options.id ? `/${options.id}` : ""}`);
      console.log(data);
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

  return { execute: handleData, fetchData, fetchError };
}
