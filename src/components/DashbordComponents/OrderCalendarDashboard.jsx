/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
import { getAllOrdersDashboard } from "../../Api/DashboardApi";
import { createOrderGroup } from "../../common/DataConvertHelper";

export default function OrderCalendarDashboard({ setOrderCalendarSelectDay }) {
  const [orders, setOrders] = useState([]);
  const [randomCategoryColors, setRandomCategoryColors] = useState({});
  const categoryColors = {};
  const calendarRef = useRef();
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
        if (!categoryColors[item.categoryId]) {
          categoryColors[item.categoryId] = `#${Math.floor(Math.random() * 999999)}`;
        }
        if (!gropingByCategory[date][item.categoryId]) {
          gropingByCategory[date][item.categoryId] = [item];
        } else {
          gropingByCategory[date][item.categoryId].push(item);
        }
      });
    });
    return gropingByCategory;
  };

  useEffect(() => {
    getAllOrdersDashboard().then((response) => {
      const formattedOrders = groupByCategory(groupByDay(createOrderGroup(response.data)));
      setRandomCategoryColors(categoryColors);
      setOrders(formattedOrders);
    });
  }, []);

  const onClickCell = (e) => {
    const startSelect = e.target.closest(".fc-day.fc-daygrid-day");
    if (!startSelect || !startSelect.dataset.date) return;
    const cell = e.target.closest(".fc-day.fc-daygrid-day");
    if (!cell) return;
    const cellDate = cell.dataset.date;
    setOrderCalendarSelectDay(cellDate);
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.elRef.current;
      calendar.addEventListener("mousedown", onClickCell);
      return function cleanup() {
        calendar.removeEventListener("mousedown", onClickCell);
      };
    }
    return false;
  }, []);
  const renderEventContent = (eventInfo) => {
    const color = eventInfo.backgroundColor || "#ffa4a4";
    const obj = {
      height: 15,
      width: 15,
      backgroundColor: randomCategoryColors[eventInfo.backgroundColor],
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
    const event = [];
    Object.keys(data).forEach((date) => {
      Object.keys(data[date]).forEach((items) => {
        data[date][items].forEach((item) => {
          event.push(
            {
              start: `${date}T${`${item.grid.indexOf("1")}:00`}`,
              end: `${date}T${`${item.grid.lastIndexOf("1")}:00`}`,
              data: item,
              backgroundColor: item.categoryId,
            },
          );
        });
      });
    });
    return event;
  };

  return (
    <div className="dashboardCalendarContainer">
      <FullCalendar
        ref={calendarRef}
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
    </div>
  );
}
