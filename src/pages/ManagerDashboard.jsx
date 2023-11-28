import React, { useState } from "react";
import moment from "moment";
import ManagerInfoBox from "../components/DashbordComponents/ManagerInfoBox";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeTableDashboard from "../components/DashbordComponents/LesseeTableDashboard";
import RepairKitchenTableDashboard from "../components/DashbordComponents/RepairKitchenTableDashboard";
import ManagerStatsDashboard from "../components/DashbordComponents/ManagerStatsDashboard";
import ManagerTransactionsTableDashboard from "../components/DashbordComponents/ManagerTransactionsTableDashboard";
import ManagerLastPendingOrdersTableDashboard from "../components/DashbordComponents/ManagerLastPendingOrdersTableDashboard";
import useBuildManagerData from "../hooks/useBuildManagerData";
import Spinner from "../components/Spinner/Spinner";
import CalendarWithTimelineComponent from "../components/DashbordComponents/CalendarWithTimelineComponent";
import TimelineDashboardWindow from "../components/Popup/TimelineDashboardWindow";

export default function ManagerDashboard({ user, companyId }) {
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-30, "day"), endDate: moment() });
  const [financeReport, setFinanceReport] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [isActiveItem, setIsActiveItem] = useState(false);
  const activeMonth = {
    startDate: moment().startOf("month").add(-7, "day"),
    endDate: moment().endOf("month").add(7, "day"),
  };
  const {
    orderData,
    managerInfoData,
    allOrderData,
    lesseeCompanies,
    transactions,
    updatedEquipment,
    loading,
  } = useBuildManagerData(activeMonth, companyId);

  const listLength = 5;

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <ManagerInfoBox userInfo={managerInfoData} />
        </div>
        <div className="col-lg-6 col-md-8 dash-chart-first">
          <ProfitByTimeChart
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            financeReport={financeReport}
            setFinanceReport={setFinanceReport}

          />
          <ManagerStatsDashboard financeReport={financeReport} userInfo={managerInfoData} />
        </div>
      </div>
      <div className="row" style={{ margin: "10px 0 20px" }}>
        <CalendarWithTimelineComponent
          allOrderData={allOrderData}
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}
          companyId={companyId}
        />
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-hun">
          <ManagerLastPendingOrdersTableDashboard
            orderData={orderData.slice(0, listLength)}
          />
        </div>
        <div className="col-lg-3  col-md-6 width-fif"><RepairKitchenTableDashboard updatedEquipment={updatedEquipment.slice(0, listLength)} /></div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-fif"><LesseeTableDashboard lesseeCompanies={lesseeCompanies.slice(0, listLength)} /></div>
        <div className="col-lg-3  col-md-6 width-hun"><ManagerTransactionsTableDashboard transactions={transactions.slice(0, listLength)} /></div>
      </div>
      {isActiveItem && (
        <TimelineDashboardWindow
          item={activeItem}
          close={activeItem.close}
          user={user}
        />
      )}
    </div>
  );
}
