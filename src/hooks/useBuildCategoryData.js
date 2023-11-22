import useFetch from "./useFetch";

export default function useBuildCategoryData(id, isMainLessee, categoryId) {
  const isLocal = true;
  let backendUrl = "/admin/api/";
  let backendManagerUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    backendManagerUrl = " http://localhost:3001/admin/manager/";
  }
  let loading = false;

  const { data: ordersData, loading: orderLoading } = useFetch(
    `${backendUrl}get_orders${isMainLessee ? `/${id}` : ""}?category=${categoryId}`,
  );

  const { data: lesseeInfoData, loading: lesseeInfoDataLoading } = useFetch(
    `${backendUrl}get_category_info/${categoryId}`,
  );

  // eslint-disable-next-line no-nested-ternary
  const { data: allOrderData, loading: allOrderDataLoading } = isLocal ? useFetch(`${backendUrl}get_local_orders`) : useFetch(
    `${backendManagerUrl}get_equipment_items${isMainLessee ? `/${id}` : ""}?category=${categoryId}`,
  );

  const { data: updatedEquipment, loading: updatedEquipmentLoading } = useFetch(
    `${backendUrl}get_kitchen_equipment?category=${categoryId}`,
  );

  if (orderLoading
      || lesseeInfoDataLoading
      || updatedEquipmentLoading
      || allOrderDataLoading
  ) {
    loading = true;
  }
  return {
    updatedEquipment,
    ordersData,
    lesseeInfoData,
    loading,
    allOrderData,
  };
}
