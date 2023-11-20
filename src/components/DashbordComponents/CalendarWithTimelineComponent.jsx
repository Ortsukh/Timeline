import React, { useState } from "react";
import moment from "moment/moment";
import OrderCalendarDashboard from "./OrderCalendarDashboard";
import TimelineOrders from "./TimelineOrders";

export default function CalendarWithTimelineComponent(
  { allOrderData, setActiveItem, setIsActiveItem },
) {
  const [orderCalendarSelectDay, setOrderCalendarSelectDay] = useState(moment().format("YYYY-MM-DD"));

  return (
    <>
      <div className="col-lg-3 col-md-6 width-hun">
        <OrderCalendarDashboard
          setOrderCalendarSelectDay={setOrderCalendarSelectDay}
          allOrderData={allOrderData}
          setActiveItem={setActiveItem}
          setIsActiveItem={setIsActiveItem}

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
