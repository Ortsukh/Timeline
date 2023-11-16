import useFetch from "./useFetch";

export default function useTimelineData(isMainLessee, update) {
  let isLocal = true;
  let backendUrl = "/admin/manager/";
  if (isLocal) {
    backendUrl = " http://localhost:3001/admin/manager/";
    isLocal = false;
  } else {
    isMainLessee = false;
  }

  // const backendManagerUrl = " http://localhost:3001/admin/manager/";

  let loading = false;
  const { data: allEquipmentData, loading: allEquipmentDataLoading } = isLocal ? useFetch(`${backendUrl}get_local_equipment`, update) : useFetch(`${backendUrl}get_equipment`, update);
  const { data: userData, loading: userDataLoading } = isMainLessee ? useFetch(`${backendUrl}get_current_user/2`, update) : useFetch(`${backendUrl}get_current_user`, update);
  const { data: companiesData, loading: companiesDataLoading } = !isMainLessee ? useFetch(`${backendUrl}get_lessee_companies`, update) : { data: [], loading: false };
  const { data: allOrderData, loading: allOrderDataLoading } = isLocal ? useFetch(`${backendUrl}get_local_orders`, update) : useFetch(`${backendUrl}get_equipment_items`, update);
  console.log(allOrderData);
  if (allEquipmentDataLoading
      || allOrderDataLoading
      || userDataLoading
      || companiesDataLoading
  ) {
    loading = true;
  }
  console.log(loading);

  return {
    userData,
    companiesData,
    allEquipmentData,
    loading,
    allOrderData,
  };
}
