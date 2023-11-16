import useFetch from "./useFetch";

export default function useBuildManagerData() {
  let isLocal = true;
  let backendUrl = "/admin/api/";
  let backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    backendManagerUrl = " http://localhost:3001/admin/manager/";
    isLocal = false;
  }
  let loading = false;

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
