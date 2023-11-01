import React from "react";
import UserBox from "../components/DashbordComponents/UserBox";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import RenterTableDashboard from "../components/DashbordComponents/RenterTableDashboard";
import UserAccountDashBoard from "../components/DashbordComponents/UserAccountDashBoard";
import RepairKitchenTableDashboard from "../components/DashbordComponents/RepairKitchenTableDashboard";
import LastOrdersTableDashboard from "../components/DashbordComponents/LastOrdersTableDashboard";

export default function ManagerDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <UserBox />
        </div>

        <div className="col-lg-6 col-md-8"><ProfitByTimeChart /></div>
        <div className="col-lg-3 col-md-8">
          <UserAccountDashBoard />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6"><RenterTableDashboard /></div>
        <div className="col-lg-3  col-md-6"><RepairKitchenTableDashboard /></div>
      </div>
      <div className="row">
        <div className="col-lg-3  col-md-6"><LastOrdersTableDashboard /></div>
      </div>
    </div>
  );
}
