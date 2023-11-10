import React, { useState } from "react";
import moment from "moment";
import ManagerInfoBox from "../components/DashbordComponents/ManagerInfoBox";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeTableDashboard from "../components/DashbordComponents/LesseeTableDashboard";
import RepairKitchenTableDashboard from "../components/DashbordComponents/RepairKitchenTableDashboard";
import ManagerStatsDashboard from "../components/DashbordComponents/ManagerStatsDashboard";
import ManagerTransactionsTableDashboard from "../components/DashbordComponents/ManagerTransactionsTableDashboard";
import OrderCalendarDashboard from "../components/DashbordComponents/OrderCalendarDashboard";
import TimelineOrders from "../components/DashbordComponents/TimelineOrders";
import ManagerLastPendingOrdersTableDashboard from "../components/DashbordComponents/ManagerLastPendingOrdersTableDashboard";
import useBuildManagerData from "../hooks/useBuildManagerData";
import Spinner from "../components/Spinner/Spinner";

export default function ManagerDashboard() {
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));
  const [profitItems, setProfitItems] = useState([]);
  const {
    orderData,
    managerInfoData,
    allOrderData,
    lesseeCompanies,
    transactions,
    updatedEquipment,
    loading,
  } = useBuildManagerData();
  const listLength = 5;
  console.log(loading);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <ManagerInfoBox managerInfoData={managerInfoData} />
        </div>
        <div className="col-lg-6 col-md-8 dash-chart-first">
          <ProfitByTimeChart
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            profitItems={profitItems}
            setProfitItems={setProfitItems}
          />
          <ManagerStatsDashboard selectedTime={selectedTime} profitItems={profitItems} />
        </div>
      </div>
      <div className="row" style={{ margin: "10px 0 20px" }}>
        <div className="col-lg-3 col-md-6 width-hun">
          <OrderCalendarDashboard
            setOrderCalendarSelectDay={setOrderCalendarSelectDay}
            allOrderData={allOrderData}
          />
        </div>
        <div className="col-lg-3 col-md-6 width-hun">
          <TimelineOrders
            allOrderData={allOrderData}
            orderCalendarSelectDay={orderCalendarSelectDay}
            key={orderCalendarSelectDay}
          />
        </div>
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

    </div>
  );
}
