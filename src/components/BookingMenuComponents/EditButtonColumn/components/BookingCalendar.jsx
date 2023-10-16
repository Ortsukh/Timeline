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
import RectangleSelection from "react-rectangle-selection";
import { Tooltip } from "react-tooltip";
import { generateClue } from "../../../../common/GenerateElementsData";
import CalendarSwitch from "../../../Switch/CalendarSwitch";
import "../../../style.css";

const events = [];

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
}) {
  const [isDefaultSelect, setIsDefaultSelect] = useState(true);
  const calendarRef = useRef();
  const [event, setEvent] = useState(events);
  const [emptyCellsForMonth, setEmptyCellsForMonth] = useState([]);
  const getCalendarCellsByClassNames = (classNames) => {
    const calendar = calendarRef.current.elRef.current;
    return calendar.querySelectorAll(
      classNames,
    );
  };

  const renderEventContent = (eventInfo) => {
    const { calendar } = calendarRef.current;

    if (calendar.view.type === "multiMonthYear") {
      const color = eventInfo.backgroundColor || "#ffa4a4";
      const obj = {
        height: "1.6em",
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
    const calendarDayCell = getCalendarCellsByClassNames(".activeCell");
    if (calendarDayCell[0]) {
      calendarDayCell[0].classList.remove("activeCell");
    }
  };

  const checkShiftPerDay = (cell) => {
    cell.firstChild.classList.add("gridActiveBG");
  };

  const handleEventClick = (clickInfo) => {
    console.log(123);
    const data = {
      start: clickInfo.event.start,
      extendedProps: clickInfo.event.extendedProps,
    };
    handleSetSelectedConflictDate(data);
  };

  useEffect(() => {
    unselectDefaultCalendar();
  }, [deactivatedCell]);

  useEffect(() => {
    if (!selectedConflictDate) {
      return;
    }
    unselectDefaultCalendar();
    const el = calendarRef.current.elRef.current.querySelectorAll(
      `[data-date="${moment(selectedConflictDate.start).format("YYYY-MM-DD")}"] 
            > div > .fc-daygrid-day-events`,
    )[0];

    el.classList.add("activeCell");
  }, [selectedConflictDate]);

  useEffect(() => {
    const date = (moment(calendarRef.current.getApi().getDate()).endOf("month"));
    if (moment(date).isBefore(moment())) {
      setEvent(calendarEvent);
      return;
    }
    setEvent(calendarEvent);
  }, [calendarEvent]);

  useEffect(() => {
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach((cell) => {
      if (!selectedDates.find((date) => date === cell.dataset.date)) {
        if (!isActiveCalendar) { calendarRef.current.getApi().unselect(); }
        cell.firstChild.classList.remove("gridActiveBG");
      }
    });
    if (!selectedDates.length) {
      setEmptyCellsForMonth([]);
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
            checkShiftPerDay(cell);
          }
        },
      );
    }
  }, [isActiveCalendar]);

  const checkAndActiveCell = (days) => {
    const selectedDays = [];
    days.forEach((cell) => {
      checkShiftPerDay(cell);
      if (selectedDates.find((date) => date === cell.dataset.date)
          || moment(cell.dataset.date).isBefore(moment().startOf("day"))) {
        cell.firstChild.classList.remove("gridActiveBG");
        setSelectedDates((prev) => prev.filter((date) => date !== cell.dataset.date));
      } else if (currentDevice.workTime.dayMap[moment(cell.dataset.date).locale("en").format("dddd").toLowerCase()]) {
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
    setEvent([]);
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
    checkAndActiveCell(cells);
  };

  const disabledCells = () => {
    if (!calendarRef.current) return;
    getCalendarCellsByClassNames(".fc-day-past").forEach((cell) => {
      cell.firstChild.classList.add("gridDisabledBG");
    });
    Object.keys(currentDevice.workTime.dayMap).forEach((day) => {
      if (!currentDevice.workTime.dayMap[day]) {
        getCalendarCellsByClassNames(`.fc-day.fc-day-${day.slice(0, 3)}`).forEach((cell) => {
          cell.firstChild.classList.add("gridDisabledBG");
        });
      }
    });
  };

  const selectAllSimilarDayInMonth = (element) => {
    if (isDefaultSelect) return;
    const days = getCalendarCellsByClassNames(`.fc-day.${element}.fc-daygrid-day:not(.fc-day-other)`);
    checkAndActiveCell(days);
  };

  useEffect(() => {
    if (!calendarRef.current && !isDefaultSelect) return;
    getCalendarCellsByClassNames(".fc-col-header-cell").forEach((element, index) => {
      element.onclick = function selectDays() { selectAllSimilarDayInMonth(element.classList[2]); };
      element.style.cursor = "pointer";
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
      if (moment(iterateDate).isBefore(moment().startOf("day"))) {
        iterateDate = moment(iterateDate).add(1, "d");
      } else {
        if (currentDevice.workTime.dayMap[moment(iterateDate).locale("en").format("dddd").toLowerCase()]) {
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
  };

  const onClickCell = (e) => {
    if (!isActiveCalendar) {
      const cell = e.target.closest(".fc-day.fc-daygrid-day");
      if (!cell) return;
      const cellDate = cell.dataset.date;
      if (moment(cellDate).isBefore(moment())) {
        return;
      }
      if (selectedDates.indexOf(cellDate) === -1) {
        if (currentDevice.workTime.dayMap[moment(cellDate).locale("en").format("dddd").toLowerCase()]) {
          addAnotherDay(moment(cell.dataset.date).format("YYYY-MM-DD"));
          checkShiftPerDay(cell);
        }
      }
      return;
    }
    if (!isDefaultSelect) {
      const startCoord = [e.clientX, e.clientY];
      let endCoord = [e.clientX, e.clientY];
      const setCoord = (mouseupEvent) => {
        endCoord = [mouseupEvent.clientX, mouseupEvent.clientY];
        rectangleSelect(startCoord, endCoord);
        document.removeEventListener("mouseup", setCoord, false);
      };
      document.addEventListener("mouseup", setCoord);
    }
    if (!isDefaultSelect || !isActiveCalendar) return;
    setEvent([]);
    let startSelectedDate;
    let endSelectedDate;
    const mousemove = (event1) => {
      const endSelect = event1.target.closest(".fc-day.fc-daygrid-day");
      if (endSelect) {
        endSelectedDate = endSelect.dataset.date;
        handleSelectCustom(startSelectedDate, endSelectedDate);
      }
    };
    const endMove = () => {
      document.removeEventListener("mouseover", mousemove, false);
      document.removeEventListener("mouseup", endMove, false);
      const selectedDays = getSelectedDatesArray(startSelectedDate, endSelectedDate);
      setSelectedDates(selectedDays);
    };

    const startSelect = e.target.closest(".fc-day.fc-daygrid-day");
    if (startSelect) {
      startSelectedDate = startSelect.dataset.date;
      endSelectedDate = startSelect.dataset.date;
      handleSelectCustom(startSelectedDate, endSelectedDate);
      document.addEventListener("mouseup", endMove);
      document.addEventListener("mouseover", mousemove);
    }
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
  }, [isDefaultSelect, isActiveCalendar, selectedDates]);

  const handleSwitchChange = () => {
    setIsDefaultSelect((prev) => !prev);
  };

  const selectAllow = (date) => {
    const { calendar } = calendarRef.current;

    if (calendar.view.type === "multiMonthYear") {
      return true;
    }

    const range = calendar.currentData.dateProfile.currentRange;
    return !!moment(date.start).isSameOrAfter(moment().startOf("day"))
        && !!moment(date.end).isSameOrBefore(moment(range.end).startOf("day"))
        && !!moment(date.start).isSameOrAfter(moment(range.start).startOf("day"));
  };

  return (
    <div className="calendar-count">
      <CalendarSwitch
        isActiveCalendar={isActiveCalendar}
        isDefaultSelect={isDefaultSelect}
        handleSwitchChange={handleSwitchChange}
      />
      <div
        role="presentation"
        className="presentation"
      >
        <RectangleSelection
          onSelect={() => { }}
          disabled={(isDefaultSelect && isActiveCalendar) || !isActiveCalendar}
          style={{
            backgroundColor: "rgba(0,0,255,0.4)",
            borderColor: "blue",
          }}
        >
          <FullCalendar
            unselectAuto={false}
            className="unselectable"
            datesSet={(e) => handleChangeMonth(e)}
            height={550}
            contentHeight={400}
            fixedWeekCount={false}
            ref={calendarRef}
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
                // hiddenDays={[2, 4]}
            selectAllow={(date) => selectAllow(date)}
            eventClick={handleEventClick}
            events={event.concat(emptyCellsForMonth)}
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
        <Tooltip anchorSelect=".fc-clue-button" openOnClick place="right">
          {generateClue("BOOKING_CALENDAR")}
        </Tooltip>
      </div>
    </div>
  );
}
