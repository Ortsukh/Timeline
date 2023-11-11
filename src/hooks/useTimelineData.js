import useFetch from "./useFetch";

export default function useTimelineData(id, update) {
  let loading = false;
  const backendUrl = " http://localhost:3001/admin/manager/";
  // const backendUrl = "/admin/manager/";

  const { data: userData, loading: userDataLoading } = useFetch(`${backendUrl}get_current_user`, update);
  const { data: companiesData, loading: companiesDataLoading } = !id ? useFetch(`${backendUrl}get_lessee_companies`, update) : { data: [], loading: false };
  const { data: allOrderData, loading: allOrderDataLoading } = useFetch(`${backendUrl}get_equipment_items/${id}`, update);
  const { data: allEquipmentData, loading: allEquipmentDataLoading } = useFetch(`${backendUrl}get_equipment/${id}`, update);

  if (allEquipmentDataLoading
      || allOrderDataLoading
      || userDataLoading
      || companiesDataLoading
  ) {
    loading = true;
  }

  return {
    userData,
    companiesData,
    allEquipmentData,
    loading,
    allOrderData,
  };
}
