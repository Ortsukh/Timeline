import React, { useState } from "react";
import moment from "moment";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeInfoBox from "../components/DashbordComponents/LesseInfoBox";
import LesseeRentalZoneTableDashboard from "../components/DashbordComponents/LesseeRentalZoneTableDashboard";
import LesseeTransactionsTableDashboard from "../components/DashbordComponents/LesseeTransactionsTableDashboard";
import LastOrdersTableDashboard from "../components/DashbordComponents/LastOrdersTableDashboard";
import LesseeStatsDashboard from "../components/DashbordComponents/LesseeStatsDashboard";
import BackButton from "../components/Button/BackButton";

export default function LesseeDashboard(id) {
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));
  const [profitItems, setProfitItems] = useState([]);
  return (
    <div>
      <BackButton classButton="tut" />
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <LesseeInfoBox />
        </div>
        <div className="col-lg-6 col-md-8 dash-chart-first">
          <ProfitByTimeChart
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            id={id}
            profitItems={profitItems}
            setProfitItems={setProfitItems}
          />
          <LesseeStatsDashboard selectedTime={selectedTime} profitItems={profitItems} />
        </div>

      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 width-fif"><LastOrdersTableDashboard /></div>
        <div className="col-lg-3 col-md-6 width-fif"><LesseeRentalZoneTableDashboard /></div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 width-hun"><LesseeTransactionsTableDashboard /></div>
      </div>
    </div>
  );
}
