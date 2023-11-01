import React, { useState } from "react";
import moment from "moment";
import UserBox from "../components/DashbordComponents/UserBox";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import RenterTableDashboard from "../components/DashbordComponents/RenterTableDashboard";
import RepairKitchenTableDashboard from "../components/DashbordComponents/RepairKitchenTableDashboard";
import LastOrdersTableDashboard from "../components/DashbordComponents/LastOrdersTableDashboard";
import StatsDashboard from "../components/DashbordComponents/StatsDashboard";

export default function ManagerDashboard() {
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });

  console.log("load");
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <UserBox />
        </div>
        <div className="col-lg-6 col-md-8 dash-chart-first">
          <ProfitByTimeChart selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          {" "}
          <StatsDashboard selectedTime={selectedTime} />
        </div>

      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-fif"><RenterTableDashboard /></div>
        <div className="col-lg-3  col-md-6 width-fif"><RepairKitchenTableDashboard /></div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6 width-hun"><LastOrdersTableDashboard /></div>
      </div>
    </div>
  );
}
