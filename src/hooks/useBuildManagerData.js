import useFetch from "./useFetch";

export default function useBuildManagerData() {
  let isLocal = true;
  let backendUrl = "/admin/api/";
  const backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    isLocal = false;
  }
  let loading = false;

  const { data: orderData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders`,
  );

  const { data: managerInfoData, loading: managerInfoDataLoading } = useFetch(
    `${backendUrl}get_manager_info`,
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
      || lesseeCompaniesLoading
      || transactionsLoading
      || updatedEquipmentLoading) {
    loading = true;
  }
  return {
    orderData,
    managerInfoData,
    lesseeCompanies,
    transactions,
    updatedEquipment,
    loading,
  };
}
