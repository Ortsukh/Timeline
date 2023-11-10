import React, { useState } from "react";
import moment from "moment";
import ProfitByTimeChart from "../components/DashbordComponents/ProfitByTimeChart";
import LesseeInfoBox from "../components/DashbordComponents/LesseInfoBox";
import LesseeRentalZoneTableDashboard from "../components/DashbordComponents/LesseeRentalZoneTableDashboard";
import LesseeTransactionsTableDashboard from "../components/DashbordComponents/LesseeTransactionsTableDashboard";
import LesseeLastOrdersTableDashboard from "../components/DashbordComponents/LesseeLastOrdersTableDashboard";
import LesseeStatsDashboard from "../components/DashbordComponents/LesseeStatsDashboard";
import BackButton from "../components/Button/BackButton";
import useBuildLesseeData from "../hooks/useBuildLesseeData";
import Spinner from "../components/Spinner/Spinner";
import CalendarWithTimelineComponent from "../components/DashbordComponents/CalendarWithTimelineComponent";

export default function LesseeDashboard({ lesseeId, isMainLessee }) {
  if (!lesseeId) return;
  const [selectedTime, setSelectedTime] = useState({ startDate: moment().add(-7, "day"), endDate: moment() });
  // eslint-disable-next-line
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));
  const [profitItems, setProfitItems] = useState([]);
  const {
    ordersData,
    rentZone,
    lesseeInfoData,
    transactions,
    lesseeCompanies,
    allOrderData,
    loading,
  } = useBuildLesseeData(lesseeId, isMainLessee);
  const listLength = 5;

  // eslint-disable-next-line consistent-return
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <BackButton classButton="tut" />
      <div className="row">
        <div className="col-lg-3 col-md-4">
          <LesseeInfoBox
            id={lesseeId}
            lesseeInfoData={lesseeInfoData}
            lesseeCompanies={lesseeCompanies}
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
          <LesseeStatsDashboard selectedTime={selectedTime} profitItems={profitItems} />
        </div>

      </div>
      { isMainLessee && (
      <CalendarWithTimelineComponent allOrderData={allOrderData} />
      )}
      <div className="row">
        <div className="col-lg-3 col-md-6 width-fif"><LesseeLastOrdersTableDashboard id={lesseeId} ordersData={ordersData.slice(0, listLength)} /></div>
        <div className="col-lg-3 col-md-6 width-fif"><LesseeRentalZoneTableDashboard rentZone={rentZone.slice(0, listLength)} /></div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 width-hun"><LesseeTransactionsTableDashboard id={lesseeId} transactions={transactions.slice(0, listLength)} /></div>
      </div>
    </div>
  );
}
