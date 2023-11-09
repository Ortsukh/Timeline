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
import OrderCalendarDashboard from "../components/DashbordComponents/OrderCalendarDashboard";
import TimelineOrders from "../components/DashbordComponents/TimelineOrders";

export default function LesseeDashboard({ lesseeId, isMainLessee }) {
  console.log(lesseeId, isMainLessee);
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
  console.log(allOrderData);
  const listLenght = 5;

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
        { isMainLessee || (
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
        )}
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 width-fif"><LesseeLastOrdersTableDashboard id={lesseeId} ordersData={ordersData.slice(0, listLenght)} /></div>
        <div className="col-lg-3 col-md-6 width-fif"><LesseeRentalZoneTableDashboard rentZone={rentZone.slice(0, listLenght)} /></div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 width-hun"><LesseeTransactionsTableDashboard id={lesseeId} transactions={transactions.slice(0, listLenght)} /></div>
      </div>
    </div>
  );
}
