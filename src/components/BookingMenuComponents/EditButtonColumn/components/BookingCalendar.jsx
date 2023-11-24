/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useRef, useState, useEffect,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interaction from "@fullcalendar/interaction";
import moment from "moment";
import Swal from "sweetalert2";
import RectangleSelection from "react-rectangle-selection";
import { Tooltip } from "react-tooltip";
import { generateClue } from "../../../../common/GenerateElementsData";
import DayCheckbox from "../../../Checkbox/DayCheckbox";
import "../../../style.css";
import buttonTitleConstants from "../../../../constants/buttonTitleConstants";

export default function BookingCalendar({
  handleSetSelectedConflictDate,
  setSelectedDates,
  calendarEvent,
  selectedDates,
  isActiveCalendar,
  deactivatedCell,
  addAnotherDay,
  currentDevice,
  selectedConflictDate,
  isEditMode,
  groups,
  isDayEditing,
  handleConfirmChangesBM,
  handleCancelChangesBM,
}) {
  const [isDefaultSelect] = useState(true);
  const calendarRef = useRef();
  const [event, setEvent] = useState([]);
  const [startSelectCell, setStartSelectCell] = useState(null);
  const [defaultSelect, setDefaultSelect] = useState(true);
  const [selectedWeekdays, setSelectedWeekdays] = useState(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]);
  const getCalendarCellsByClassNames = (classNames) => {
    const calendar = calendarRef.current.elRef.current;
    return calendar.querySelectorAll(
      classNames,
    );
  };

  const workingDayMap = currentDevice.workTime.dayMap;

  const renderEventContent = (eventInfo) => {
    const { calendar } = calendarRef.current;

    if (calendar.view.type === "multiMonthYear") {
      const color = eventInfo.backgroundColor || "#ffa4a4";
      const obj = {
        height: 18,
        backgroundColor: color,
        color: (color === "#100e0e" ? "#ffffff" : "#000000"),
        display: "flex",
        flexDirection: "column",
      };
      return <div style={obj}>  </div>;
    }

    const color = eventInfo.backgroundColor || "#ffa4a4";
    const obj = {
      height: 40,
      backgroundColor: color,
      color: (color === "#100e0e" ? "#ffffff" : "#000000"),
      display: "flex",
      flexDirection: "column",
    };
    return <div style={obj}>  </div>;
  };
  const unselectDefaultCalendar = () => {
    // const calendarDayCell = getCalendarCellsByClassNames(".activeCell");
    // if (calendarDayCell[0]) {
    //   calendarDayCell[0].classList.remove("activeCell");
    // }
    const calendarDayCell = getCalendarCellsByClassNames(".selectedCell");
    console.log(calendarDayCell);
    if (calendarDayCell[0]) {
      calendarDayCell[0].classList.remove("selectedCell");
    }
  };
  const isViewMode = window.location.search.substring(1).split("&").find((query) => query.startsWith("view"))?.split("=")[1];

  const checkShiftPerDay = (cell) => {
    cell.firstChild.classList.add("gridActiveBG");
  };

  const handleEventClick = (clickInfo) => {
    const data = {
      start: clickInfo.start,
      extendedProps: clickInfo.extendedProps,
    };
    handleSetSelectedConflictDate(data);
  };

  useEffect(() => {
    console.log("delete");
    unselectDefaultCalendar();
  }, [deactivatedCell]);

  useEffect(() => {
    unselectDefaultCalendar();

    if (!selectedConflictDate) {
      return;
    }
    const el = calendarRef.current.elRef.current.querySelectorAll(
      `[data-date="${moment(selectedConflictDate.start).format("YYYY-MM-DD")}"] 
            > div `,
    )[0];
    if (el) {
      el.classList.add("selectedCell");
    }
    // el.classList.add("activeCell");
  }, [selectedConflictDate]);

  const generateContent = (eventData, currentCellDate) => {
    const groupedByGroupsId = { success: {}, conflicts: {} };
    eventData.success.forEach((eventItem) => {
      if (!eventItem) return;
      if (!groupedByGroupsId.success[eventItem.groupId]) {
        groupedByGroupsId.success[eventItem.groupId] = [eventItem];
      } else {
        groupedByGroupsId.success[eventItem.groupId].push(eventItem);
      }
    });
    eventData.conflicts.forEach((eventItem) => {
      if (!eventItem) return;

      if (!groupedByGroupsId.conflicts[eventItem.groupId]) {
        groupedByGroupsId.conflicts[eventItem.groupId] = [eventItem];
      } else {
        groupedByGroupsId.conflicts[eventItem.groupId].push(eventItem);
      }
    });
    const generateCellTable = () => {
      const table = document.createElement("table");
      table.className = "calendarCellTable";
      const startWorkingDay = groups[0].workTime.shiftTimes.start.split(":")[0];
      const endWorkingDay = groups[0].workTime.shiftTimes.end.split(":")[0];
      const workHours = groups[0].workTime.shiftTimes.end.split(":")[0] - groups[0].workTime.shiftTimes.start.split(":")[0];
      const countColumn = workHours / groups[0].shiftLength;
      const curCell = getCalendarCellsByClassNames(".fc-daygrid-day-frame.fc-scrollgrid-sync-inner")[0];
      console.log(curCell.clientHeight);
      console.log(curCell);
      groups.forEach((group) => {
        const tableRaw = document.createElement("tr");
        tableRaw.className = "tableCellGroup";
        tableRaw.style.height = `${(curCell.clientHeight - 10) / (groups.length > 4 ? groups.length : 5)}px`;

        tableRaw.id = group.id;
        for (let i = 0; i < countColumn; i++) {
          const tableCellGroup = document.createElement("td");
          // tableCellGroup.className = "tableCellGroup";
          tableRaw.append(tableCellGroup);
        }
        console.log(groupedByGroupsId);
        console.log(group.id);
        table.append(tableRaw);
        console.log(eventData);
        const otherOrders = eventData.itemMap[group.id]?.dates[currentCellDate];
        console.log(otherOrders);
        if (otherOrders) {
          let itemIndex = otherOrders.indexOf("1");
          while (itemIndex < endWorkingDay) {
            console.log(itemIndex);
            if (otherOrders[itemIndex] === "0") {
              itemIndex += group.shiftLength;
            } else {
              const numberColumn = Math.floor((itemIndex - startWorkingDay) / group.shiftLength);
              const a = tableRaw.getElementsByTagName("td")[numberColumn];
              a.className = "gridWithOtherOrderBG";
              console.log(a);
              itemIndex += group.shiftLength;
            }
          }
        }
        if (groupedByGroupsId.success[group.id]) {
          groupedByGroupsId.success[group.id].forEach((item) => {
            const numberColumn = Math.floor((item.shiftTime - startWorkingDay) / group.shiftLength);
            console.log(numberColumn);
            const a = tableRaw.getElementsByTagName("td")[numberColumn];
            a.className = "gridWithoutConflictBG";
            console.log(a);
          });
        }
        console.log(groupedByGroupsId);
        if (groupedByGroupsId.conflicts[group.id]) {
          groupedByGroupsId.conflicts[group.id].forEach((item) => {
            const numberColumn = (item.shiftTime - startWorkingDay) / group.shiftLength;
            console.log(numberColumn);
            const a = tableRaw.getElementsByTagName("td")[numberColumn];
            a.className = "gridWithConflictBG";
            console.log(a);
          });
        }
        table.append(tableRaw);

        console.log(tableRaw);
      });
      console.log(table);
      return table;
    };
    return generateCellTable();
  };
  const addContentInCell = (data, cell, currentCellDate) => {
    const content = cell.querySelector(".cell-content");
    console.log(content.clientHeight);
    if (!content) return;
    content.append(generateContent(data, currentCellDate));
    // content.append(generateContent(data.conflicts));
  };
  const paintingEvents = () => {
    if (!calendarRef.current) return;
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach((cell) => {
      cell.firstChild.classList.remove("gridWithoutConflictBG");
      cell.firstChild.classList.remove("gridWithConflictBG");
      cell.firstChild.classList.remove("gridWithConflictInThisShiftBG");
      const content = cell.querySelector(".cell-content");
      const oldChild = content ? content.querySelector("table") : null;
      if (oldChild) {
        content.removeChild(oldChild);
      }
      const dateEvent = calendarEvent.find((dateItem) => dateItem.start === cell.dataset.date);
      if (dateEvent) {
        console.log(dateEvent);
        addContentInCell(dateEvent.extendedProps, cell, cell.dataset.date);
        // cell.firstChild.classList.add(dateEvent.backgroundType);
        cell.firstChild.classList.remove("gridActiveBG");
      }
    });
  };

  useEffect(() => {
    // const date = (moment(calendarRef.current.getApi().getDate()).endOf("month"));
    // if (moment(date).isBefore(moment())) {
    //   setEvent(calendarEvent);
    //   return;
    // }

    setEvent(calendarEvent);
    paintingEvents();
  }, [calendarEvent]);

  useEffect(() => {
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach((cell) => {
      if (!selectedDates.find((date) => date === cell.dataset.date)) {
        if (!isActiveCalendar) { calendarRef.current.getApi().unselect(); }
        cell.firstChild.classList.remove("gridActiveBG");
      }
    });
    if (!selectedDates.length) {
      calendarRef.current.getApi().unselect();
      getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach(
        (cell) => {
          cell.firstChild.classList.remove("gridActiveBG");
        },
      );
    }
  }, [selectedDates]);

  useEffect(() => {
    if (!selectedDates.length || !isActiveCalendar) {
      getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach(
        (cell) => {
          if (selectedDates.find((date) => date === cell.dataset.date)) {
            // checkShiftPerDay(cell);
            // unselectDefaultCalendar();
          }
        },
      );
    }
  }, [isActiveCalendar]);

  const getDayName = (date) => moment(date).locale("en").format("dddd").toLowerCase();

  const checkAndActivateCell = (days) => {
    const selectedDays = [];
    days.forEach((cell) => {
      checkShiftPerDay(cell);
      if (selectedDates.find((date) => date === cell.dataset.date)
          || moment(cell.dataset.date).isBefore(moment().startOf("day"))
          || (!selectedWeekdays.includes(getDayName(cell.dataset.date)))
      ) {
        cell.firstChild.classList.remove("gridActiveBG");
        setSelectedDates((prev) => prev.filter((date) => date !== cell.dataset.date));
      } else if (workingDayMap[getDayName(cell.dataset.date)]) {
        selectedDays.push(cell.dataset.date);
      }
    });
    setSelectedDates((prev) => prev.concat(selectedDays));
  };

  const rectangleSelect = (startCoord, endCoord) => {
    let startX;
    let startY;
    let endX;
    let endY;
    if (startCoord[0] < endCoord[0]) {
      [startX] = startCoord;
      [endX] = endCoord;
    } else {
      [endX] = startCoord;
      [startX] = endCoord;
    }
    if (startCoord[1] < endCoord[1]) {
      [, startY] = startCoord;
      [, endY] = endCoord;
    } else {
      [, endY] = startCoord;
      [, startY] = endCoord;
    }
    // setEvent([]);
    if (!calendarRef.current) return;

    const cells = [];

    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach(
      (cell) => {
        const cellCoord = cell.getBoundingClientRect();
        if (
          ((cellCoord.right > startX && cellCoord.right < endX)
                  || (cellCoord.left > startX && cellCoord.left < endX)
                  || (cellCoord.right > startX
                      && cellCoord.right > endX
                      && cellCoord.left < startX
                      && cellCoord.left < endX))
              && ((cellCoord.top > startY && cellCoord.top < endY)
                  || (cellCoord.bottom > startY
                      && cellCoord.bottom < endY)
                  || (cellCoord.top < startY
                      && cellCoord.top < endY
                      && cellCoord.bottom > startY
                      && cellCoord.bottom > endY))
        ) {
          cells.push(cell);
        }
      },
    );
    checkAndActivateCell(cells);
  };

  const disabledCells = () => {
    if (!calendarRef.current) return;
    getCalendarCellsByClassNames(".fc-day-past").forEach((cell) => {
      cell.firstChild.classList.add("gridDisabledBG");
    });
    Object.keys(workingDayMap).forEach((day) => {
      if (!workingDayMap[day]) {
        getCalendarCellsByClassNames(`.fc-day.fc-day-${day.slice(0, 3)}`).forEach((cell) => {
          cell.firstChild.classList.add("gridDisabledBG");
        });
      }
    });
  };

  useEffect(() => {
    if (!calendarRef.current && !isDefaultSelect) return;
    getCalendarCellsByClassNames(".fc-col-header-cell").forEach((element, index) => {
      if (index === 5 || index === 6) {
        element.firstChild.firstChild.classList.add("red-color");
      }
    });
  }, [isDefaultSelect]);

  useEffect(() => {
    disabledCells();
  }, []);

  const getSelectedDatesArray = (startDate, endSDate) => {
    let end; let
      start;
    if (moment(startDate).isSameOrBefore(moment(endSDate))) {
      start = moment(startDate);
      end = moment(endSDate);
    } else {
      start = moment(endSDate);
      end = moment(startDate);
    }
    let iterateDate = start;
    const selectedDays = [];
    while (moment(iterateDate).isSameOrBefore(end)) {
      if (moment(iterateDate).isBefore(moment().startOf("day"))
          || (!selectedWeekdays.includes(getDayName(iterateDate)))) {
        iterateDate = moment(iterateDate).add(1, "d");
      } else {
        if (workingDayMap[getDayName(iterateDate)]) {
          selectedDays.push(moment(iterateDate).format("YYYY-MM-DD"));
        }
        iterateDate = moment(iterateDate).add(1, "d");
      }
    }
    return selectedDays;
  };

  const handleSelectCustom = (start, end) => {
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach((cell) => {
      cell.firstChild.classList.remove("gridActiveBG");
    });

    const selectedDays = getSelectedDatesArray(
      start,
      end,
    );

    selectedDays.forEach((date) => {
      const cell = calendarRef.current.elRef.current.querySelectorAll(
        `[data-date="${date}"]`,
      )[0];

      checkShiftPerDay(cell);
    });
  };
  const handleChangeMonth = (time) => {
    disabledCells();
    // generateEmptyCells();
    if (!calendarRef.current) return;
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach(
      (cell) => {
        if (moment(cell.dataset.date).isBefore(moment(time.end))
              && moment(cell.dataset.date).isSameOrAfter(moment(time.start))
              && selectedDates.includes(cell.dataset.date)) {
          checkShiftPerDay(cell);
        }
      },
    );
    paintingEvents();
  };

  const onClickCell = (e) => {
    console.log("click-BookCal-1", isDayEditing);

    const startSelect = e.target.closest(".fc-day.fc-daygrid-day");
    if (!startSelect || !startSelect.dataset.date) return;

    if (!isActiveCalendar) {
      const cell = e.target.closest(".fc-day.fc-daygrid-day");
      if (!cell) return;
      const cellDate = cell.dataset.date;
      const eventByDate = event.find((ev) => ev.start === cellDate);
      // if (selectedDates.indexOf(cellDate) === -1
      // && moment(cellDate).isSameOrAfter(moment().startOf("day"))) {
      if (selectedDates.indexOf(cellDate) === -1) {
        if (workingDayMap[getDayName(cellDate)]
            && selectedWeekdays.includes(getDayName(cellDate))) {
          if (isViewMode) return;
          if (isDayEditing) {
            console.log("fire");
            Swal.fire({
              title: "У вас остались неподтверждённые изменения. Желаете их сохранить?",
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: buttonTitleConstants.CONFIRM_CHANGES,
              denyButtonText: buttonTitleConstants.CANCEL_CHANGES,
              didClose: () => {
                console.log(123);
              },
            }).then((result) => {
              Swal.fire({
                position: "top-center",
                icon: "info",
                backdrop: false,
                title: "Добавлен новый день",
                showConfirmButton: false,
                timer: 1000,
              });
              if (result.isConfirmed) {
                handleConfirmChangesBM();
              } else if (result.isDenied) {
                handleCancelChangesBM();
              }
            });
          } else {
            Swal.fire({
              position: "top-center",
              icon: "info",
              // backdrop: false,
              title: "Добавлен новый день",
              showConfirmButton: false,
              timer: 1000,
            });
          }

          addAnotherDay(moment(cell.dataset.date).format("YYYY-MM-DD"));
        }
      } else {
        if (isDayEditing) {
          console.log("fire");
          Swal.fire({
            title: "У вас остались неподтверждённые изменения. Желаете их сохранить?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: buttonTitleConstants.CONFIRM_CHANGES,
            denyButtonText: buttonTitleConstants.CANCEL_CHANGES,
            didClose: () => {
              console.log(123);
            },
          }).then((result) => {
            if (result.isConfirmed) {
              handleConfirmChangesBM();
            } else if (result.isDenied) {
              handleCancelChangesBM();
            }
          });
          // return;
        }
        unselectDefaultCalendar();
        if (!eventByDate) return;
        cell.firstChild.classList.add("selectedCell");
        handleEventClick(eventByDate);
      }
      return;
    }

    if (e.ctrlKey) {
      const startCoord = [e.clientX, e.clientY];
      let endCoord = [e.clientX, e.clientY];
      setStartSelectCell(startSelect.dataset.date);
      const setCoord = (mouseupEvent) => {
        endCoord = [mouseupEvent.clientX, mouseupEvent.clientY];
        rectangleSelect(startCoord, endCoord);
        document.removeEventListener("mouseup", setCoord, false);
      };
      document.addEventListener("mouseup", setCoord);
    }

    if (e.ctrlKey || !isActiveCalendar) return;
    setEvent([]);
    let startSelectedDate;
    let endSelectedDate;

    const handleMousemove = (mouseEvent) => {
      const endSelect = mouseEvent.target.closest(".fc-day.fc-daygrid-day");
      if (endSelect) {
        endSelectedDate = endSelect.dataset.date;
        handleSelectCustom(startSelectedDate, endSelectedDate);
      }
    };

    const handleMouseup = () => {
      document.removeEventListener("mouseover", handleMousemove, false);
      document.removeEventListener("mouseup", handleMouseup, false);
      const selectedDays = getSelectedDatesArray(startSelectedDate, endSelectedDate);
      setSelectedDates(selectedDays);
    };

    if (startSelect) {
      if (e.shiftKey) {
        const start = startSelectCell || moment().format("YYYY-MM-DD");
        const selectedDays = getSelectedDatesArray(start, startSelect.dataset.date);
        setSelectedDates(selectedDays);
        handleSelectCustom(start, startSelect.dataset.date);
        return;
      }
      startSelectedDate = startSelect.dataset.date;
      setStartSelectCell(startSelect.dataset.date);
      endSelectedDate = startSelect.dataset.date;
      handleSelectCustom(startSelectedDate, endSelectedDate);
      document.addEventListener("mouseup", handleMouseup);
      document.addEventListener("mouseover", handleMousemove);
    }
  };
  useEffect(() => {
    if (calendarRef.current) {
      console.log("click-BookCal-2", isDayEditing);
      const calendar = calendarRef.current.elRef.current;
      calendar.addEventListener("mousedown", onClickCell);
      return function cleanup() {
        calendar.removeEventListener("mousedown", onClickCell);
      };
    }
    return false;
  }, [isDefaultSelect, isActiveCalendar, selectedDates, event, isDayEditing]);

  useEffect(() => {
    const changeDef = (e) => {
      if (e.key === "Control") {
        setDefaultSelect((prev) => !prev);
      }
    };

    document.addEventListener("keydown", changeDef);
    document.addEventListener("keyup", changeDef);
    return function cleanup() {
      document.addEventListener("keydown", changeDef);
      document.addEventListener("keyup", changeDef);
    };
  }, []);

  const checkDay = (e) => {
    if (!e.target.checked) {
      setSelectedWeekdays((prev) => prev.filter((day) => day !== e.target.value));
      setSelectedDates((prev) => prev.filter((date) => (getDayName(date) !== e.target.value)));
      return;
    }
    setSelectedWeekdays((prev) => prev.concat(...prev, e.target.value));

    if (selectedDates.length < 2) { return; }
    const sortedDates = selectedDates.sort((a, b) => (moment(b).isBefore(moment(a)) ? 1 : -1));
    let iterateDay = sortedDates[0];
    const end = sortedDates[sortedDates.length - 1];
    const newSelectedDates = [];
    while (moment(iterateDay).isSameOrBefore(end)) {
      if (getDayName(iterateDay) === e.target.value
          && !selectedDates.includes(moment(iterateDay).format("YYYY-MM-DD"))) {
        newSelectedDates.push(moment(iterateDay).format("YYYY-MM-DD"));
        const el = calendarRef.current.elRef.current.querySelectorAll(
          `[data-date="${moment(iterateDay).format("YYYY-MM-DD")}"] `,
        )[0];
        checkShiftPerDay(el);
      }
      iterateDay = moment(iterateDay).add(1, "d");
    }
    setSelectedDates((prev) => prev.concat(newSelectedDates));
  };

  return (
    <div className="calendar-count">
      <DayCheckbox
        isActiveCalendar={isActiveCalendar}
        checkDay={checkDay}
        selectedWeekdays={selectedWeekdays}
        currentDevice={currentDevice}
      />
      <div
        role="presentation"
        className="presentation"
      >
        <RectangleSelection
          onSelect={() => { }}
          disabled={(defaultSelect && isActiveCalendar) || !isActiveCalendar}
          style={{
            backgroundColor: "rgba(0,0,255,0.4)",
            borderColor: "blue",
          }}
        >
          <FullCalendar
            dayCellDidMount={(cell) => {
              const addContent = document.createElement("div");
              addContent.className = ("cell-content");
              console.log(cell.el.children[0].children[1].clientHeight);
              cell.el.children[0].children[1].append(addContent);
            }}
            unselectAuto={false}
            className="unselectable"
            datesSet={(e) => handleChangeMonth(e)}
            height={isEditMode ? 600 : "auto"}
            initialDate={isEditMode ? moment().add(-1, "month").format("YYYY-MM-DD") : moment().format("YYYY-MM-DD")}
            // contentHeight={200}
            fixedWeekCount={false}
            ref={calendarRef}
            eventOverlap={false}
            plugins={[dayGridPlugin, interaction, timeGrid, calenderList, multiMonthPlugin]}
            viewDidMount={(view) => {
              // const a = calendarRef?.current?.getApi().getOption("height");
              if (view.view.type === "multiMonthYear") {
                console.log("sdsfsdf");
                calendarRef?.current?.getApi().setOption("height", 600);
                calendarRef?.current?.getApi().gotoDate(moment().add(-1, "month").format("YYYY-MM-DD"));
                paintingEvents();
              } else {
                calendarRef?.current?.getApi().setOption("height", "auto");
                calendarRef?.current?.getApi().gotoDate(moment().format("YYYY-MM-DD"));
                paintingEvents();
              }
            }}
            views={{
              multiMonthYear: {
                type: "multiMonthYear",
                height: "600px",
                buttonText: "Год",
                duration: {
                  month: 12,
                },
              },
              dayGridMonth: {
                type: "dayGridMonth",
                buttonText: "Месяц",

              },
            }}
            initialView={isEditMode ? "multiMonthYear" : "dayGridMonth"}
                // selectable={isDefaultSelect && isActiveCalendar}
                // select={(data) => handleSelect(data)}
            showNonCurrentDates={false}
            locale="ru"
            firstDay="1"
            multiMonthMinWidth="200"
            multiMonthMaxColumns={2}
            weekends
            eventClick={handleEventClick}
            // events={event.concat(emptyCellsForMonth)}
            eventContent={renderEventContent}
            headerToolbar={{
              left: "",
              center: "title",
              right: "multiMonthYear,dayGridMonth prev,next tooltip",
            }}
            customButtons={{
              tooltip: {
                text: "?",

              },
            }}
            eventBackgroundColor="transparent"
          />
        </RectangleSelection>
        <Tooltip anchorSelect=".fc-tooltip-button" openOnClick place="right">
          {generateClue("BOOKING_CALENDAR")}
        </Tooltip>
      </div>
    </div>
  );
}
