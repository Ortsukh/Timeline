import React, { useState } from "react";
import moment from "moment";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeLastOrdersTableDashboard from "../components/DashbordComponents/LesseeLastOrdersTableDashboard";
import LesseeStatsDashboard from "../components/DashbordComponents/LesseeStatsDashboard";
import BackButton from "../components/Button/BackButton";
import Spinner from "../components/Spinner/Spinner";
import CalendarWithTimelineComponent from "../components/DashbordComponents/CalendarWithTimelineComponent";
import TimelineDashboardWindow from "../components/Popup/TimelineDashboardWindow";
import CategoryInfoBox from "../components/DashbordComponents/CategoryInfoBox";
import ManagerStatsDashboard from "../components/DashbordComponents/ManagerStatsDashboard";
import RepairKitchenTableDashboard from "../components/DashbordComponents/RepairKitchenTableDashboard";
import useBuildCategoryData from "../hooks/useBuildCategoryData";
import ManagerLastPendingOrdersTableDashboard
  from "../components/DashbordComponents/ManagerLastPendingOrdersTableDashboard";

export default function CategoryDashboard({
  lesseeId, isMainLessee, companyType, categoryId, companyId,
}) {
  console.log("category");
  if (!categoryId) return;
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-30, "day"), endDate: moment() });
  const [profitItems, setProfitItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isActiveItem, setIsActiveItem] = useState(false);
  const activeMonth = {
    startDate: moment().startOf("month").add(-7, "day"),
    endDate: moment().endOf("month").add(7, "day"),
  };
  const {
    categoryInfoData,
    ordersData,
    updatedEquipment,
    categoryEquipments,
    loading,
  } = useBuildCategoryData(lesseeId, isMainLessee, categoryId, activeMonth);
  const listLength = 5;
  console.log(loading);
  // eslint-disable-next-line consistent-return
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <BackButton />
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <CategoryInfoBox
            id={lesseeId}
            categoryInfoData={categoryInfoData}
          />
        </div>
        <div className="col-lg-6 col-md-8 dash-chart-first">
          <ProfitByTimeChart
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            id={lesseeId}
            profitItems={profitItems}
            setProfitItems={setProfitItems}
          />
          {isMainLessee
            ? <LesseeStatsDashboard profitItems={profitItems} />
            : <ManagerStatsDashboard profitItems={profitItems} userInfo={categoryInfoData} />}
        </div>

      </div>

      <div className="row" style={{ margin: "10px 0 20px" }}>
        <CalendarWithTimelineComponent
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}
          categoryEquipments={categoryEquipments}
          categoryId={categoryId}
          companyId={companyId}
        />
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-6 width-fif">
          {isMainLessee
            ? (
              <LesseeLastOrdersTableDashboard
                id={lesseeId}
                ordersData={ordersData.slice(0, listLength)}
              />
            )
            : (
              <ManagerLastPendingOrdersTableDashboard
                id={lesseeId}
                orderData={ordersData.slice(0, listLength)}
              />
            )}
        </div>
        <div className="col-lg-3  col-md-6 width-fif"><RepairKitchenTableDashboard updatedEquipment={updatedEquipment.slice(0, listLength)} /></div>
      </div>

      {isActiveItem && (
        <TimelineDashboardWindow
          item={activeItem}
          close={activeItem.close}
          user={companyType}
        />
      )}
    </div>
  );
}
