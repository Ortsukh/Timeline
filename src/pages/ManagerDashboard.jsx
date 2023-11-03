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
import ManagerLastOrdersTableDashboard from "../components/DashbordComponents/ManagerLastOrdersTableDashboard";

export default function ManagerDashboard() {
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));
  const [profitItems, setProfitItems] = useState([]);

  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <ManagerInfoBox />
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
      <div className="row">
        <div className="col-lg-3 col-md-6 width-hun">
          <OrderCalendarDashboard setOrderCalendarSelectDay={setOrderCalendarSelectDay} />
        </div>
        <div className="col-lg-3 col-md-6 width-hun">
          <TimelineOrders
            orderCalendarSelectDay={orderCalendarSelectDay}
            key={orderCalendarSelectDay}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-hun"><ManagerLastOrdersTableDashboard /></div>
        <div className="col-lg-3  col-md-6 width-fif"><RepairKitchenTableDashboard /></div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-fif"><LesseeTableDashboard /></div>
        <div className="col-lg-3  col-md-6 width-hun"><ManagerTransactionsTableDashboard /></div>
      </div>

    </div>
  );
}
