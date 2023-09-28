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
import style from "../EditButtonColumn.module.css";
import { generateClue } from "../../../../common/GenerateElementsData";
import CalendarSwitch from "../../../Switch/CalendarSwitch";
import "../../../style.css";

const events = [];

function renderEventContent(eventInfo) {
  const color = eventInfo.backgroundColor || "#ffa4a4";
  const obj = {
    height: 40,
    backgroundColor: color,
    width: 50,
    color: (color === "#100e0e" ? "#ffffff" : "#000000"),
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={obj}>
      <span>{`${eventInfo.event.extendedProps.shift}-${eventInfo.event.extendedProps.shift + eventInfo.event.extendedProps.shiftLength}`}</span>
      <span>{eventInfo.event.extendedProps.shortTitle}</span>
    </div>
  );
}

export default function BookingCalendar({
  handleSetSelectedConflictDate,
  setSelectedDates,
  calendarEvent,
  selectedDates,
  isActiveCalendar,
}) {
  const [startCoord, setStartCoord] = useState([0, 0]);
  const [isDefaultSelect, setIsDefaultSelect] = useState(true);
  const [endCoord, setEndCoord] = useState([0, 0]);
  const calendarRef = useRef();
  const [event, setEvent] = useState(events);
  const handleEventClick = (clickInfo) => {
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".activeCell",
    );
    if (calendarDayCell[0]) {
      calendarDayCell[0].classList.remove("activeCell");
    }
    clickInfo.el.classList.add("activeCell");
    handleSetSelectedConflictDate(clickInfo.event);
  };

  useEffect(() => {
    setEvent(calendarEvent);
  }, [calendarEvent]);

  useEffect(() => {
    if (!selectedDates.length || !isActiveCalendar) {
      const calendar = calendarRef.current.elRef.current;
      const calendarDayCell = calendar.querySelectorAll(
        ".fc-day.fc-daygrid-day:not(.fc-day-other)",
      );
      calendarDayCell.forEach((cell) => {
        cell.firstChild.classList.remove(style.gridActiveBG);
      });
    }
  }, [selectedDates]);

  const checkShiftPerDay = (cell) => {
    cell.firstChild.classList.add(style.gridActiveBG);
  };

  useEffect(() => {
    if (!selectedDates.length || !isActiveCalendar) {
      const calendar = calendarRef.current.elRef.current;
      const calendarDayCell = calendar.querySelectorAll(
        ".fc-day.fc-daygrid-day:not(.fc-day-other)",
      );
      calendarDayCell.forEach((cell) => {
        if (selectedDates.find((date) => date === cell.dataset.date)) {
          checkShiftPerDay(cell);
        }
      });
    }
  }, [isActiveCalendar]);

  const checkAndActiveCell = (days) => {
    const selectedDays = [];
    days.forEach((cell) => {
      checkShiftPerDay(cell);
      if (selectedDates.find((date) => date === cell.dataset.date)
          || moment(cell.dataset.date).isBefore(moment().startOf("day"))) {
        cell.firstChild.classList.remove(style.gridActiveBG);
        setSelectedDates((prev) => prev.filter((date) => date !== cell.dataset.date));
      } else {
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
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-other)",
    );
    const cells = [];
    calendarDayCell.forEach((cell) => {
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
    });
    checkAndActiveCell(cells);
    // setSelectedDates((prev) => prev.concat(selectedDays));
  };

  useEffect(() => {
    rectangleSelect();
  }, [endCoord]);

  const disabledCells = () => {
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day-past",
    );
    calendarDayCell.forEach((cell) => {
      cell.firstChild.classList.add(style.gridDisabledBG);
    });
  };

  const selectAllSimilarDayInMonth = (element) => {
    if (isDefaultSelect) return;
    const calendar = calendarRef.current.elRef.current;
    const days = calendar.querySelectorAll(
      `.fc-day.${element}.fc-daygrid-day:not(.fc-day-other)`,
    );
    checkAndActiveCell(days);
  };

  useEffect(() => {
    if (!calendarRef.current && !isDefaultSelect) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarHeaderCells = calendar.querySelectorAll(
      ".fc-col-header-cell",
    );
    calendarHeaderCells.forEach((element, index) => {
      element.onclick = function selectDays() { selectAllSimilarDayInMonth(element.classList[2]); };
      element.style.cursor = "pointer";
      if (index === 5 || index === 6) {
        element.style.color = "red";
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
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day",
    );
    calendarDayCell.forEach((cell) => {
      cell.firstChild.classList.remove(style.gridActiveBG);
    });
    let date1 = data.start;
    while (moment(date1).isBefore(data.end)) {
      if (moment(date1).isBefore(moment().startOf("day"))) {
        date1 = moment(date1).add(1, "d");
      } else {
        selectedDays.push(moment(date1).format("YYYY-MM-DD"));
        date1 = moment(date1).add(1, "d");
      }
    }

    setSelectedDates(selectedDays);
  };
  const handleSwitchChange = () => {
    setIsDefaultSelect((prev) => !prev);
    setSelectedDates([]);
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-other)",
    );
    calendarDayCell.forEach((cell) => {
      cell.firstChild.classList.remove(style.gridActiveBG);
    });
  };

  const handleChangeMonth = (time) => {
    disabledCells();
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-other)",
    );
    calendarDayCell.forEach((cell) => {
      if (moment(cell.dataset.date).isBefore(moment(time.end))
          && moment(cell.dataset.date).isSameOrAfter(moment(time.start))
          && selectedDates.includes(cell.dataset.date)) {
        checkShiftPerDay(cell);
      }
    });
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
            className="unselectable"
            datesSet={(e) => handleChangeMonth(e)}
            height={500}
            fixedWeekCount={false}
            ref={calendarRef}
            plugins={[dayGridPlugin, interaction, timeGrid, calenderList]}
            // showNonCurrentDates={false}
            selectable={isDefaultSelect && isActiveCalendar}
            selectMirror
            select={(data) => handleSelect(data)}
            // initialView="dayGridMonth"
            // dayHeaderContent={injectDayHeaderContent}
            locale="ru"
            firstDay="1"
            weekends
            selectAllow={(date) => {
              const calendar = calendarRef.current;
              const range = calendar.calendar.currentData.dateProfile.currentRange;
              return !!moment(date.start).isSameOrAfter(moment().startOf("day")) && !!moment(date.end).isSameOrBefore(moment(range.end).startOf("day")) && !!moment(date.start).isSameOrAfter(moment(range.start).startOf("day"));
            }}
            eventClick={handleEventClick}
            events={event}
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
