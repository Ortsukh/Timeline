/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
import { createEquipmentGroup, createOrderGroup } from "../../common/DataConvertHelper";
import useGetOrdersByFilters from "../../hooks/useGetOrdersByFilters";

export default function OrderCalendarDashboard({
  setOrderCalendarSelectDay,
  setAllOrderData,
  setActiveItem,
  categoryEquipments,
  categoryId,
  companyId,
}) {
  const { execute } = useGetOrdersByFilters(undefined, true);

  const groups = categoryEquipments ? createEquipmentGroup(categoryEquipments) : [];
  const [orders, setOrders] = useState([]);
  const calendarRef = useRef();
  const [month, setMonth] = useState("");
  const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
  const pendingOrderMapByDay = (data) => {
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
    console.log(groupingByDay);
    return groupingByDay;
  };
  const groupByDay = (data) => {
    const groupingByDay = {};
    data.forEach((item) => {
      if (!groupingByDay[item.date]) {
        groupingByDay[item.date] = [item];
      } else {
        groupingByDay[item.date].push(item);
      }
    });
    return groupingByDay;
  };

  const getCalendarCellsByClassNames = (classNames) => {
    const calendar = calendarRef.current.elRef.current;
    return calendar.querySelectorAll(
      classNames,
    );
  };
  const generateContent = (currentCellDate, items) => {
    const generateCellTable = () => {
      const events = items[currentCellDate];
      const table = document.createElement("table");
      table.className = "calendarCellTable";
      const startWorkingDay = groups[0].workTime.shiftTimes.start.split(":")[0];
      // const endWorkingDay = groups[0].workTime.shiftTimes.end.split(":")[0];
      const workHours = groups[0].workTime.shiftTimes.end.split(":")[0] - groups[0].workTime.shiftTimes.start.split(":")[0];
      const countColumn = workHours / groups[0].shiftLength;
      const curCell = getCalendarCellsByClassNames(".fc-daygrid-day-frame.fc-scrollgrid-sync-inner")[0];
      console.log(curCell.clientHeight);
      console.log(curCell);
      groups.forEach((group) => {
        const tableRaw = document.createElement("tr");
        tableRaw.className = "tableCellGroup";
        tableRaw.style.height = `${(50) / (groups.length > 4 ? groups.length : 5)}px`;

        tableRaw.id = group.id;
        for (let i = 0; i < countColumn; i++) {
          const tableCellGroup = document.createElement("td");
          // tableCellGroup.className = "tableCellGroup";
          tableRaw.append(tableCellGroup);
        }
        console.log(group.id);
        table.append(tableRaw);
        console.log(items);

        console.log(events);
        events.forEach((item) => {
          if (item.group === group.id) {
            console.log(item);
            const itemIndex = item.grid.indexOf("1");
            const numberColumn = Math.floor((itemIndex - startWorkingDay) / group.shiftLength);
            const a = tableRaw.getElementsByTagName("td")[numberColumn];
            a.className = item.status === "pending" ? "gridWithConflictInThisShiftBG" : "gridWithOtherOrderBG";
          }
        });

        table.append(tableRaw);

        console.log(tableRaw);
      });
      console.log(table);
      return table;
    };
    return generateCellTable();
  };

  const addContentInCell = (cell, currentCellDate, items) => {
    const content = cell.querySelector(".cell-content");
    console.log(content.clientHeight);
    if (!content) return;
    const events = items[currentCellDate];
    if (!events) return;
    content.append(generateContent(currentCellDate, items));
    // content.append(generateContent(data.conflicts));
  };
  const paintingEvents = (items) => {
    if (!calendarRef.current) return;
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach((cell) => {
      const content = cell.querySelector(".cell-content");
      const oldChild = content ? content.querySelector("table") : null;
      if (oldChild) {
        content.removeChild(oldChild);
      }

      addContentInCell(cell, cell.dataset.date, items);
      // cell.firstChild.classList.add(dateEvent.backgroundType);
      cell.firstChild.classList.remove("gridActiveBG");
    });
  };
  // useEffect(() => {
  //   let formattedOrders;
  //   if (rout === "category_dashboard") {
  //     formattedOrders = groupByDay(createOrderGroup(allOrderData));
  //     paintingEvents(formattedOrders);
  //   } else {
  //     formattedOrders = pendingOrderMapByDay(createOrderGroup(allOrderData));
  //   }
  //   setOrders(formattedOrders);
  // }, []);

  const infoElement = document.createElement("small");
  infoElement.className = "label pull-right bg-yellow mr-5 ";
  infoElement.innerText = "!";

  useEffect(() => {
    const infoElementNode = getCalendarCellsByClassNames("small");
    infoElementNode.forEach((node) => node.remove());

    getCalendarCellsByClassNames(".fc-day-past:not(.fc-day-other)").forEach((cell) => {
      cell.firstChild.classList.add("gridPastDays");
    });

    getCalendarCellsByClassNames(".fc-day-future").forEach((cell) => {
      cell.firstChild.classList.add("gridFeatureDays");
    });
    if (rout === "category_dashboard") {
      return;
    }

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
    setActiveItem(false);
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

  const handleLinkToBookingMenu = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=booking_menu`);
  };

  const handleChangeMonth = async (time) => {
    console.log(time);
    setMonth(time);
    const options = {
      dateFrom: time.startStr.split("T")[0],
      dateTo: time.endStr.split("T")[0],
      categoryId,
      companyId,
    };
    const ordersByDate = await execute(options);
    setAllOrderData(ordersByDate);
    console.log(ordersByDate);
    let formattedOrders;
    if (rout === "category_dashboard") {
      formattedOrders = groupByDay(createOrderGroup(ordersByDate));
      paintingEvents(formattedOrders);
    } else {
      formattedOrders = pendingOrderMapByDay(createOrderGroup(ordersByDate));
    }
    setOrders(formattedOrders);
  };

  return (
    <div className="dashboardCalendarContainer">
      <FullCalendar
        dayCellDidMount={(cell) => {
          const addContent = document.createElement("div");
          addContent.className = ("cell-content");
          console.log(cell.el.children[0].children[1].clientHeight);
          cell.el.children[0].children[1].append(addContent);
        }}
        ref={calendarRef}
        datesSet={handleChangeMonth}
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
