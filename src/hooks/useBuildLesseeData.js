import useFetch from "./useFetch";

export default function useBuildLesseeData(id, activeMonth) {
  let isLocal = true;
  let backendUrl = "/admin/api/";
  let backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    backendManagerUrl = " http://localhost:3001/admin/manager/";
    isLocal = false;
  }
  let loading = false;

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

  const formattedDate = activeMonth.startDate ? `?dateFrom=${activeMonth.startDate.format("YYYY-MM-DD")}&dateTo=${activeMonth.endDate.format("YYYY-MM-DD")}` : "";
  const { data: allOrderData, loading: allOrderDataLoading } = isLocal ? useFetch(`${backendUrl}get_local_orders`) : useFetch(
    `${backendManagerUrl}get_equipment_items${formattedDate}&companyId=${id}`,
  );
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
