/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
import { getAllOrdersDashboard } from "../../Api/DashboardApi";

export default function OrderCalendarDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrdersDashboard().then((response) => {
      setOrders(response);
    });
  }, []);

  const groupByDay = (data) => {
    const groupingByDay = {};
    data.forEach((item) => {
      if (!groupingByDay[item.date]) {
        groupingByDay[item.date] = [item];
      } else groupingByDay[item.date].push(item);
    });
    return groupingByDay;
  };

  const groupByCategory = (data) => {

  };

  const generateEvents = () => {

  };

  return (
    <FullCalendar
      unselectAuto={false}
      // datesSet={(e) => handleChangeMonth(e)}
      height={550}
      contentHeight={400}
      fixedWeekCount={false}
      // ref={calendarRef}
      eventOverlap={false}
      plugins={[dayGridPlugin, interaction, timeGrid, calenderList, multiMonthPlugin]}
      initialView="dayGridMonth"
            // selectable={isDefaultSelect && isActiveCalendar}
            // select={(data) => handleSelect(data)}
      showNonCurrentDates={false}
      locale="ru"
      firstDay="1"
      multiMonthMinWidth="200"
      multiMonthMaxColumns={2}
      weekends
      eventClick={() => {}}
      // events={event.concat(emptyCellsForMonth)}
      // eventContent={renderEventContent}
      headerToolbar={{
        left: "",
        center: "title",
        right: "dayGridWeek,dayGridDay,dayGridMonth prev,next tooltip",
      }}
      customButtons={{
        tooltip: {
          text: "?",

        },
      }}
      eventBackgroundColor="transparent"
    />
  );
}
