/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
// import moment from "moment/moment";
// import month from "react-date-range/dist/components/Month";
import { createOrderGroup } from "../../common/DataConvertHelper";

export default function OrderCalendarDashboard({
  setOrderCalendarSelectDay, allOrderData, setActiveItem,
}) {
  const [orders, setOrders] = useState([]);
  const calendarRef = useRef();
  const [month, setMonth] = useState("");
  const groupByDay = (data) => {
    const groupingByDay = {};
    data.forEach((item) => {
      let isPending = "0";
      if (item.status === "pending") {
        isPending = "1";
      }
      if (!groupingByDay[item.date]) {
        groupingByDay[item.date] = isPending;
      } else if (groupingByDay[item.date] === "0") {
        groupingByDay[item.date] = isPending;
      }
    });
    return groupingByDay;
  };

  // const groupByCategory = (data) => {
  //   const gropingByCategory = {};
  //   Object.keys(data).forEach((date) => {
  //     gropingByCategory[date] = {};
  //     data[date].forEach((item) => {
  //       if (!gropingByCategory[date][item.categoryId]) {
  //         gropingByCategory[date][item.categoryId] = [item];
  //       }
  //     });
  //   });
  //   return gropingByCategory;
  // };
  const getCalendarCellsByClassNames = (classNames) => {
    const calendar = calendarRef.current.elRef.current;
    return calendar.querySelectorAll(
      classNames,
    );
  };

  useEffect(() => {
    const formattedOrders = groupByDay(createOrderGroup(allOrderData));
    setOrders(formattedOrders);
  }, []);

  const infoElement = document.createElement("small");
  infoElement.className = "label pull-right bg-yellow mr-5 ";
  infoElement.innerText = "!";
  useEffect(() => {
    const infoElementNode = getCalendarCellsByClassNames("small");
    infoElementNode.forEach((node) => node.remove());
    console.log(infoElementNode);
    getCalendarCellsByClassNames(".fc-day-past:not(.fc-day-other)").forEach((cell) => {
      cell.firstChild.classList.add("gridPastDays");
    });

    getCalendarCellsByClassNames(".fc-day-future").forEach((cell) => {
      cell.firstChild.classList.add("gridFeatureDays");
    });

    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach((cell) => {
      if (orders[cell.dataset.date]) {
        cell.firstChild.classList.add("gridWithOrderBG");

        if (orders[cell.dataset.date] === "1") {
          cell.firstChild.firstChild.appendChild(infoElement.cloneNode(true));
        }
      }
    });
  }, [orders, month]);
  const unselectDefaultCalendar = () => {
    const calendarDayCell = getCalendarCellsByClassNames(".selectedCell");
    if (calendarDayCell[0]) {
      calendarDayCell[0].classList.remove("selectedCell");
    }
  };
  const onClickCell = (e) => {
    const startSelect = e.target.closest(".fc-day.fc-daygrid-day");
    if (!startSelect || !startSelect.dataset.date) return;
    const cell = e.target.closest(".fc-day.fc-daygrid-day");
    if (!cell) return;
    unselectDefaultCalendar();
    const cellDate = cell.dataset.date;
    cell.firstChild.classList.add("selectedCell");
    setActiveItem(null);
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
  // const renderEventContent = (eventInfo) => {
  //   const color = eventInfo.backgroundColor || "#ffa4a4";
  //   const obj = {
  //     height: 15,
  //     width: 15,
  //     backgroundColor: eventInfo.backgroundColor,
  //     color: (color === "#100e0e" ? "#ffffff" : "#000000"),
  //     display: "flex",
  //     wrap: "wrap",
  //     alignItems: "center",
  //     justifyContent: "space-around",
  //   };
  //
  //   return (
  //     <div style={obj} />
  //   );
  // };

  const handleLinkToBookingMenu = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=booking_menu`);
  };
  // const generateEvents = (data) => {
  //   const events = [];
  //   Object.keys(data).forEach((date) => {
  //     Object.keys(data[date]).forEach((items) => {
  //       data[date][items].forEach((item) => {
  //         const { categoryColor } = item;
  //         events.push({
  //           start: `${date}`,
  //           end: `${date}`,
  //           backgroundColor: categoryColor,
  //         });
  //       });
  //     });
  //   });
  //   return events;
  // };

  const handleChangeMonth = (time) => {
    setMonth(time);
  };

  return (
    <div className="dashboardCalendarContainer">
      <FullCalendar
        ref={calendarRef}
        dayMaxEventColumn
        datesSet={handleChangeMonth}
        // dayClick={(date, jsEvent, view) => console.log(date, jsEvent, view)}
        unselectAuto={false}
        height={550}
        contentHeight={400}
        fixedWeekCount={false}
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
        // events={generateEvents(orders)}
        // eventContent={renderEventContent}
        headerToolbar={{
          left: "",
          center: "title",
          right: "linkToBookingMenu prev,next",
        }}
        customButtons={{
          tooltip: {
            text: "?",

          },
          linkToBookingMenu: {
            text: "Добавить новый",
            click: () => {
              handleLinkToBookingMenu();
            },
          },
        }}
        eventBackgroundColor="transparent"
      />
    </div>
  );
}
