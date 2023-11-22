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

export default function CategoryDashboard({
  lesseeId, isMainLessee, companyType, categoryId,
}) {
  if (!lesseeId) return;
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-30, "day"), endDate: moment() });
  const [profitItems, setProfitItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isActiveItem, setIsActiveItem] = useState(false);

  const {
    categoryInfoData,
    ordersData,
    updatedEquipment,
    allOrderData,
    loading,
  } = useBuildCategoryData(lesseeId, isMainLessee, categoryId);
  const listLength = 5;

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
            : <ManagerStatsDashboard profitItems={profitItems} />}
        </div>

      </div>

      <div className="row" style={{ margin: "10px 0 20px" }}>
        <CalendarWithTimelineComponent
          allOrderData={allOrderData}
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}
        />
      </div>
      )
      <div className="row">
        <div className="col-lg-3 col-md-6 width-fif"><LesseeLastOrdersTableDashboard id={lesseeId} ordersData={ordersData.slice(0, listLength)} /></div>
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
