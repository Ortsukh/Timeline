/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import moment from "moment";
import RectangleSelection from "react-rectangle-selection";
import { Tooltip } from "react-tooltip";
import { generateClue } from "../../../../common/GenerateElementsData";
import CalendarSwitch from "../../../Switch/CalendarSwitch";
import "../../../style.css";
import { Plus } from "../../../../others/importImg";

const events = [];

function renderEventContent(eventInfo) {
  if (eventInfo.event.extendedProps.isEmpty) {
    const styleObj = {
      height: 40,
      backgroundColor: "white",
      border: "none",
      display: "flex",
      justifyContent: "center",

    };
    return (
      <div style={styleObj}>
        <img style={{ height: 40, cursor: "pointer", opacity: 0.3 }} src={Plus} alt="Добавить" />
      </div>
    );
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
  // return (
  //   <div style={obj}>
  //     <span>{`${eventInfo.event.extendedProps.shift}
  //            -${eventInfo.event.extendedProps.shift
  //            + eventInfo.event.extendedProps.shiftLength}`}</span>
  //     <span>{eventInfo.event.extendedProps.shortTitle}</span>
  //   </div>
  // );
}
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
  const [startCoord, setStartCoord] = useState([0, 0]);
  const [endCoord, setEndCoord] = useState([0, 0]);
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
    if (clickInfo.event.extendedProps.isEmpty) {
      addAnotherDay(moment(clickInfo.event.start).format("YYYY-MM-DD"), clickInfo);
      clickInfo.el.parentElement.parentElement.parentElement.classList.add("gridActiveBG");
      return;
    }
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

  const generateEmptyCells = () => {
    if (isActiveCalendar) return;
    const date = (moment(calendarRef.current.getApi().getDate()));

    const month = moment(date).format("YYYY-MM-");
    const emptyCellArr = [];
    for (let i = Number(moment(date).startOf("month").format("DD")); i <= Number(moment().endOf("month").format("DD")); i++) {
      let day = moment(`${month}${i}`);
      if (day.isSameOrAfter(moment().startOf("day"))) {
        day = day.format("YYYY-MM-DD");

        if (selectedDates.indexOf(day) === -1) {
          if (currentDevice.workTime.dayMap[moment(day).locale("en").format("dddd").toLowerCase()]) {
            emptyCellArr.push({
              extendedProps:
                { isEmpty: true },
              start: day,

            });
          }
        }
      }
    }
    setEmptyCellsForMonth(emptyCellArr);
  };

  useEffect(() => {
    const date = (moment(calendarRef.current.getApi().getDate()).endOf("month"));
    if (moment(date).isBefore(moment())) {
      setEvent(calendarEvent);
      return;
    }
    generateEmptyCells();
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
      getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach(
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

  const rectangleSelect = () => {
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

  useEffect(() => {
    rectangleSelect();
  }, [endCoord]);

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
  const handleChangeMouse = (e) => {
    if (isDefaultSelect || !isActiveCalendar) {
      return;
    }
    if (e.type === "mouseup") {
      setEndCoord([e.clientX, e.clientY]);
    }
    if (e.type === "mousedown") {
      setStartCoord([e.clientX, e.clientY]);
    }
  };
  const handleSelect = (data) => {
    setEvent([]);
    const selectedDays = [];
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day").forEach((cell) => {
      cell.firstChild.classList.remove("gridActiveBG");
    });
    let date1 = data.start;

    while (moment(date1).isBefore(data.end)) {
      if (moment(date1).isBefore(moment().startOf("day"))) {
        date1 = moment(date1).add(1, "d");
      } else {
        if (currentDevice.workTime.dayMap[moment(date1).locale("en").format("dddd").toLowerCase()]) {
          selectedDays.push(moment(date1).format("YYYY-MM-DD"));
        }
        date1 = moment(date1).add(1, "d");
      }
    }

    setSelectedDates(selectedDays);
  };
  const handleSwitchChange = () => {
    calendarRef.current.getApi().unselect();

    setIsDefaultSelect((prev) => !prev);
    setSelectedDates([]);
    getCalendarCellsByClassNames(".fc-day.fc-daygrid-day:not(.fc-day-other)").forEach(
      (cell) => {
        cell.firstChild.classList.remove("gridActiveBG");
      },
    );
  };

  const handleChangeMonth = (time) => {
    disabledCells();
    generateEmptyCells();
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
  const selectAllow = (date) => {
    const calendar = calendarRef.current;
    const range = calendar.calendar.currentData.dateProfile.currentRange;
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
        onMouseUp={(e) => handleChangeMouse(e)}
        onMouseDown={(e) => handleChangeMouse(e)}
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
            fixedWeekCount={false}
            ref={calendarRef}
            plugins={[dayGridPlugin, interaction, timeGrid, calenderList]}
            selectable={isDefaultSelect && isActiveCalendar}
            selectMirror
            select={(data) => handleSelect(data)}
            locale="ru"
            firstDay="1"
            weekends
            // hiddenDays={[2, 4]}
            selectAllow={(date) => selectAllow(date)}
            eventClick={handleEventClick}
            events={event.concat(emptyCellsForMonth)}
            eventContent={renderEventContent}
            headerToolbar={{
              left: "",
              center: "title",
              right: "prev,next clue",
            }}
            customButtons={{
              clue: {
                text: "?",

              },
            }}
          />
        </RectangleSelection>
        <Tooltip anchorSelect=".fc-clue-button" openOnClick place="right">
          {generateClue("BOOKING_CALENDAR")}
        </Tooltip>
      </div>
    </div>
  );
}
