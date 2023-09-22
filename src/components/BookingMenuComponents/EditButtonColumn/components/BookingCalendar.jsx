/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import moment from "moment";
import RectangleSelection from "react-rectangle-selection";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import style from "../EditButtonColumn.module.css";
import { generateClue } from "../../../../common/GenerateElementsData";

const events = [];
function renderEventContent(eventInfo) {
  const color = eventInfo.backgroundColor || "#ffa4a4";
  const obj = {
    height: 30,
    backgroundColor: color,
    width: 50,
  };
  return <div style={obj} />;
}

export default function BookingCalendar({
  handleSetSelectedConflictDate,
  setSelectedDates,
  calendarEvent,

  selectedDates,
  isActiveCalendar,
}) {
  const [startCoord, setStartCoord] = useState(0);
  const [isDefaultSelect, setIsDefaultSelect] = useState(true);
  const [endCoord, setEndCoord] = useState(0);
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
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
    );
    calendarDayCell.forEach((cell) => {
      cell.classList.remove(style.gridActiveBG);
    });
  }, [isActiveCalendar]);

  const checkShiftPerDay = (cell) => {
    cell.classList.add(style.gridActiveBG);
  };

  const rectangleSelect = () => {
    setEvent([]);
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
    );
    const selectedDays = [];

    calendarDayCell.forEach((cell) => {
      const cellCoord = cell.getBoundingClientRect();
      if (
        ((cellCoord.right > startCoord[0] && cellCoord.right < endCoord[0])
              || (cellCoord.left > startCoord[0] && cellCoord.left < endCoord[0])
              || (cellCoord.right > startCoord[0]
                  && cellCoord.right > endCoord[0]
                  && cellCoord.left < startCoord[0]
                  && cellCoord.left < endCoord[0]))
          && ((cellCoord.top > startCoord[1] && cellCoord.top < endCoord[1])
              || (cellCoord.bottom > startCoord[1]
                  && cellCoord.bottom < endCoord[1])
              || (cellCoord.top < startCoord[1]
                  && cellCoord.top < endCoord[1]
                  && cellCoord.bottom > startCoord[1]
                  && cellCoord.bottom > endCoord[1]))
      ) {
        checkShiftPerDay(cell);

        if (selectedDates.find((date) => date === cell.dataset.date) || moment(cell.dataset.date).isBefore(moment().startOf("day"))) {
          cell.classList.remove(style.gridActiveBG);
          setSelectedDates((prev) => prev.filter((date) => date !== cell.dataset.date));
        } else {
          selectedDays.push(cell.dataset.date);
        }
      }
    });

    setSelectedDates((prev) => prev.concat(selectedDays));
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
      cell.classList.remove(style.gridActiveBG);
    });
  };
  return (
    <div className="calendar-count">
      <label className="switch">
        <span>Выделение по календарю</span>
        {" "}
        <Switch
          disabled={!isActiveCalendar}
          checked={isDefaultSelect}
          onChange={handleSwitchChange}
        />
      </label>
      <div
        onMouseUp={(e) => handleChangeMouse(e)}
        onMouseDown={(e) => handleChangeMouse(e)}
      >
        <RectangleSelection
          onSelect={() => {}}
          disabled={(isDefaultSelect && isActiveCalendar) || !isActiveCalendar}
          style={{
            backgroundColor: "rgba(0,0,255,0.4)",
            borderColor: "blue",
          }}
        >
          <FullCalendar
            height={475}
            fixedWeekCount={false}
            ref={calendarRef}
            plugins={[dayGridPlugin, interaction, timeGrid, calenderList]}
            showNonCurrentDates={false}
            selectable={isDefaultSelect && isActiveCalendar}
            dateClick={(e) => console.log(e)}
            selectMirror
            select={(data) => handleSelect(data)}
            initialView="dayGridMonth"
            locale="ru"
            firstDay="1"
            weekends
            selectAllow={(date) => {
              if (moment(date.start).isSameOrAfter(moment().startOf("day"))) {
                console.log(true);
                return true;
              }
              return false;
            }}
            eventClick={handleEventClick}
            events={event}
            eventContent={renderEventContent}
            headerToolbar={{
              left: "today",
              center: "title",
              right: "prev,next, clue",
            }}
            customButtons={{
              clue: {
                text: "?",

              },
            }}
          />
          <Tooltip anchorSelect=".fc-clue-button" openOnClick place="right">
            {generateClue()}
          </Tooltip>
        </RectangleSelection>
      </div>
    </div>
  );
}
