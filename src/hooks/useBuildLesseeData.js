import useFetch from "./useFetch";

export default function useBuildManagerLesseeData(id) {
  let loading = false;
  const backendUrl = "/admin/manager/";

  const { data: orderData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders/${id}`,
  );

  const { data: lesseeInfoData, loading: lesseeInfoDataLoading } = useFetch(
    `${backendUrl}get_lessee_info/${id}`,
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
  ) {
    loading = true;
  }
  return {
    orderData,
    rentZone,
    lesseeInfoData,
    transactions,
    loading,
  };
}
