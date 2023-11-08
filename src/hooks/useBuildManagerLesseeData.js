import useFetch from "./useFetch";

export default function useBuildManagerData() {
  let loading = false;
  const backendUrl = "/admin/manager/";

  const { data: orderData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders`,
  );

  const { data: managerInfoData, loading: managerInfoDataLoading } = useFetch(
    `${backendUrl}get_manager_info`,
  );

  const { data: allOrderDataCompanies, loading: allOrderDataCompaniesLoading } = useFetch(
    `${backendUrl}get_equipment_items`,
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
      || allOrderDataCompaniesLoading
      || lesseeCompaniesLoading
      || transactionsLoading
      || updatedEquipmentLoading) {
    loading = true;
  }
  return {
    orderData,
    managerInfoData,
    allOrderDataCompanies,
    lesseeCompanies,
    transactions,
    updatedEquipment,
    loading,
  };
}
