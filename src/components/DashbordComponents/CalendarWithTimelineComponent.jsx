import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import OrderCalendarDashboard from "./OrderCalendarDashboard";
import TimelineOrders from "./TimelineOrders";

export default function CalendarWithTimelineComponent(
  {
    setActiveItem,
    setIsActiveItem,
    categoryEquipments,
    categoryId,
    companyId,
  },
) {
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));
  const [allOrderData, setAllOrderData] = useState([]);
  return (
    <>
      <div className="col-lg-3 col-md-6 width-hun">
        <OrderCalendarDashboard
          setOrderCalendarSelectDay={setOrderCalendarSelectDay}
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}
          categoryEquipments={categoryEquipments}
          categoryId={categoryId}
          companyId={companyId}
          setAllOrderData={setAllOrderData}
        />
      </div>
      <div className="col-lg-3 col-md-6 width-hun">
        <TimelineOrders
          allOrderData={allOrderData}
          orderCalendarSelectDay={orderCalendarSelectDay}
          key={orderCalendarSelectDay}
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}
        />
      </div>
    </>
  );
}
