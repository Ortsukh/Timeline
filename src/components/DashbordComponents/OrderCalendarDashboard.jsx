/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
import { wholeDivideDurations } from "@fullcalendar/core/internal";
import { logDOM } from "@testing-library/react";
import moment from "moment";
import { getAllOrdersDashboard } from "../../Api/DashboardApi";
import { getAllOrders1 } from "../../Api/API";
import { createOrderGroup } from "../../common/DataConvertHelper";
import ITEMS_PREORDER_COLOR from "../../constants/itemsPreOrderColor";

export default function OrderCalendarDashboard() {
  const [orders, setOrders] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllOrdersDashboard().then((response) => {
      setOrders(groupByCategory(groupByDay(createOrderGroup(response.data))));
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
    const gropingByCategory = {};
    Object.keys(data).forEach((date) => {
      gropingByCategory[date] = {};
      data[date].forEach((item) => {
        if (!gropingByCategory[date][item.categoryId]) {
          gropingByCategory[date][item.categoryId] = [item];
        } else {
          gropingByCategory[date][item.categoryId].push(item);
        }
      });
    });
    return gropingByCategory;
  };
  const renderEventContent = (eventInfo) => {
    console.log(eventInfo);
    const color = eventInfo.backgroundColor || "#ffa4a4";
    const obj = {
      height: 15,
      width: 15,
      backgroundColor: "red",
      color: (color === "#100e0e" ? "#ffffff" : "#000000"),
      display: "flex",
      wrap: "wrap",
      alignItems: "center",
      justifyContent: "space-around",
    };

    return (
      <div style={obj} />
    );
  };
  const generateEvents = (data) => {
    console.log(data);
    const event = [];
    Object.keys(data).forEach((date) => {
      Object.keys(data[date]).forEach((item) => {
        console.log(data[date][item]);
        event.push(
          {
            start: `${date}T${`${data[date][item][0].grid.indexOf("1")}:00`}`,
            end: `${date}T${`${data[date][item][0].grid.lastIndexOf("1")}:00`}`,
            data: data[date][item],
            backgroundColor: "red",
          },
        );
      });
    });
    console.log(event);
    return event;
  };

  return (
    <FullCalendar
      dayMaxEventColumn
      dayClick={(date, jsEvent, view) => console.log(date, jsEvent, view)}
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
      locale="ru"
      firstDay="1"
      multiMonthMinWidth="200"
      multiMonthMaxColumns={2}
      weekends
      eventClick={() => {}}
      events={generateEvents(orders)}
      eventContent={renderEventContent}
      headerToolbar={{
        left: "",
        center: "title",
        right: "dayGridMonth prev,next tooltip",
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
