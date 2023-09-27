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

const events = [];

function renderEventContent(eventInfo) {
  const color = eventInfo.backgroundColor || "#ffa4a4";
  const obj = {
    height: 40,
    backgroundColor: color,
    width: 50,
    color: "#000000",
    display: "flex",
    flexDirection: "column",
  };
  return (<div style={obj} />
  // <div style={obj}>
  //   <span>{`Смена: ${eventInfo.event.extendedProps.shift}`}</span>
  //   <span>{eventInfo.event.extendedProps.title}</span>
  // </div>
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
    const day = moment(clickInfo.event.start).format("YYYY-MM-DD");
    handleSetSelectedConflictDate(day);
  };

  useEffect(() => {
    setEvent(calendarEvent);
  }, [calendarEvent]);

  useEffect(() => {
    if (!selectedDates.length || !isActiveCalendar) {
      const calendar = calendarRef.current.elRef.current;
      const calendarDayCell = calendar.querySelectorAll(
        ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
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
        ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
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
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
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
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
    );
    calendarDayCell.forEach((cell) => {
      cell.firstChild.classList.remove(style.gridActiveBG);
    });
  };
  const selectAllSimilarDayInMonth = (day) => {
    if (isDefaultSelect) return;
    const calendar = calendarRef.current.elRef.current;
    const days = calendar.querySelectorAll(
      `.fc-day.fc-day-${day.toLowerCase()}.fc-daygrid-day:not(.fc-day-disabled)`,
    );
    checkAndActiveCell(days);
  };
  const injectDayHeaderContent = (args) => (
    <span
      style={{ cursor: "pointer" }}
      onClick={() => {
        selectAllSimilarDayInMonth(moment(args.date).locale("en").format("ddd"));
      }}
      aria-hidden="true"
    >
      {moment(args.date).format("ddd")}
    </span>
  );

  const handleChangeMonth = (time) => {
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
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
            showNonCurrentDates={false}
            selectable={isDefaultSelect && isActiveCalendar}
            selectMirror
            select={(data) => handleSelect(data)}
            // initialView="dayGridMonth"
            dayHeaderContent={injectDayHeaderContent}
            locale="ru"
            firstDay="1"
            weekends
            selectAllow={(date) => (!!moment(date.start).isSameOrAfter(moment().startOf("day")))}
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
