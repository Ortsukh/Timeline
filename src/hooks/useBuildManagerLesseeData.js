import useFetch from "./useFetch";

export default function useBuildManagerLesseeData(id) {
  let loading = false;
  const backendUrl = " http://localhost:3001/admin/manager/";

  // const backendUrl = "/admin/manager/";

  const { data: ordersData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders/${id}`,
  );

  const { data: lesseeInfoData, loading: lesseeInfoDataLoading } = useFetch(
    `${backendUrl}get_lessee_info/${id}`,
  );

  const { data: lesseeCompanies, loading: lesseeCompaniesLoading } = useFetch(
    `${backendUrl}get_contracts`,
  );

  const { data: transactions, loading: transactionsLoading } = useFetch(
    `${backendUrl}get_transactions/${id}`,
  );

  const { data: rentZone, loading: rentZoneLoading } = useFetch(
    `${backendUrl}get_current_kitchens/${id}`,
  );

  if (orderLoading
      || lesseeInfoDataLoading
      || rentZoneLoading
      || transactionsLoading
      || lesseeCompaniesLoading
  ) {
    loading = true;
  }
  return {
    lesseeCompanies,
    ordersData,
    rentZone,
    lesseeInfoData,
    transactions,
    loading,
  };
}
