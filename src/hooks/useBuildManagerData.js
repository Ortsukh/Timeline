import useFetch from "./useFetch";

export default function useBuildManagerData() {
  let loading = false;
  const isLocal = true;
  // const backendManagerUrl = "/admin/manager/";
  // const backendUrl = "/admin/api/";
  const backendUrl = " http://localhost:3001/admin/manager/";
  const backendManagerUrl = " http://localhost:3001/admin/manager/";

  const { data: orderData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders`,
  );

  const { data: managerInfoData, loading: managerInfoDataLoading } = useFetch(
    `${backendUrl}get_manager_info`,
  );

  const { data: allOrderData, loading: allOrderDataLoading } = isLocal ? useFetch(`${backendUrl}get_local_orders`) : useFetch(
    `${backendManagerUrl}get_equipment_items`,
  );

  const { data: lesseeCompanies, loading: lesseeCompaniesLoading } = useFetch(
    `${backendUrl}get_contracts`,
  );

  const { data: transactions, loading: transactionsLoading } = useFetch(
    `${backendUrl}get_transactions`,
  );

  const { data: updatedEquipment, loading: updatedEquipmentLoading } = useFetch(
    `${backendUrl}get_kitchen_equipment`,
  );

  if (orderLoading
      || managerInfoDataLoading
      || allOrderDataLoading
      || lesseeCompaniesLoading
      || transactionsLoading
      || updatedEquipmentLoading) {
    loading = true;
  }
  return {
    orderData,
    managerInfoData,
    allOrderData,
    lesseeCompanies,
    transactions,
    updatedEquipment,
    loading,
  };
}
