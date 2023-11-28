import useFetch from "./useFetch";

export default function useBuildCategoryData(id, isMainLessee, categoryId) {
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
    `${backendUrl}get_orders?categoryId=${categoryId}${isMainLessee ? `&lesseeId=${id}` : ""}`,
  );

  const { data: categoryInfoData, loading: categoryInfoDataLoading } = useFetch(
    `${backendUrl}get_category_info/${categoryId}`,
  );

  const { data: updatedEquipment, loading: updatedEquipmentLoading } = useFetch(
    `${backendUrl}get_kitchen_equipment?categoryId=${categoryId}`,
  );

  const { data: categoryEquipments, loading: categoryEquipmentsLoading } = useFetch(
    `${backendManagerUrl}get_equipment?categoryId=${categoryId}`,
  );
  console.log(categoryEquipments);
  if (orderLoading
      || categoryInfoDataLoading
      || updatedEquipmentLoading
      || categoryEquipmentsLoading
  ) {
    loading = true;
  }
  return {
    updatedEquipment,
    ordersData,
    categoryInfoData,
    loading,
    categoryEquipments,
  };
}
