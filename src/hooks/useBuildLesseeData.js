import useFetch from "./useFetch";

export default function useBuildLesseeData(id, isMainLessee) {
  let loading = false;
  const backendUrl = " http://localhost:3001/admin/manager/";
  const backendManagerUrl = " http://localhost:3001/admin/manager/";
  // const backendManagerUrl = "/admin/manager/";
  // const backendUrl = "/admin/api/";

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

  const { data: allOrderData, loading: allOrderDataLoading } = isMainLessee ? useFetch(
    `${backendManagerUrl}get_equipment_items/${id}`,
  ) : { data: null, loading: null };

  const { data: rentZone, loading: rentZoneLoading } = useFetch(
    `${backendUrl}get_current_kitchens/${id}`,
  );

  if (orderLoading
      || lesseeInfoDataLoading
      || rentZoneLoading
      || transactionsLoading
      || lesseeCompaniesLoading
      || allOrderDataLoading
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
    allOrderData,
  };
}