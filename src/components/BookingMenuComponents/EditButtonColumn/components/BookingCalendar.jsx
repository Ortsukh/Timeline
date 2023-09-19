/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";
import calenderList from "@fullcalendar/list";
import interaction from "@fullcalendar/interaction";
import moment from "moment";
import RectangleSelection from "react-rectangle-selection";
import { groupByDateItems } from "../../../../common/DataConvertHelper";
import style from "../EditButtonColumn.module.css";

const events = [];
function renderEventContent(eventInfo) {
  const color = eventInfo.backgroundColor || "red";
  const obj = {
    height: 30,
    backgroundColor: color,
    width: 50,
  };
  return <div style={obj} />;
}

const handleEvents = (events1) => {
  console.log(events1);

  console.log("handleEvents tıklandı.");
};
export default function BookingCalendar({
  handleSetSelectedConflictDate,
  setSelectedDates,
  calendarEvent,
  isActiveCalendar,
}) {
  const [isMouseUp, setIsMouseUp] = useState(false);
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
    console.log(cell);
    cell.classList.add(style.gridActiveBG);
    // if (moment(day).isBefore(moment().startOf("day"))) {
    //   setEvent((prev) => [...prev, { start: day, backgroundColor: "gray" }]);
    // } else if (!currentItems[day]) {
    //   setEvent((prev) => [...prev, { start: day, backgroundColor: "green" }]);
    // } else if (
    //   currentItems[day][startShift] === "1"
    //   && (startShift - currentDevice.shiftLength < 0
    //     || currentItems[day][startShift - currentDevice.shiftLength] === "1")
    //   && (startShift - currentDevice.shiftLength > 24
    //     || currentItems[day][startShift + currentDevice.shiftLength]) === "1"
    // ) {
    //   setEvent((prev) => [...prev, { start: day, backgroundColor: "black" }]);
    // } else if (currentItems[day][startShift] === "1") {
    //   setEvent((prev) => [...prev, { start: day, backgroundColor: "red" }]);
    // } else {
    //   setEvent((prev) => [...prev, { start: day, backgroundColor: "green" }]);
    // }
  };
  const rectangleSelect = () => {
    console.log(123);
    setEvent([]);
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
    );
    console.log(startCoord, endCoord);
    const selectedDays = [];

    calendarDayCell.forEach((cell) => {
      cell.classList.remove(style.gridActiveBG);
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

        selectedDays.push(cell.dataset.date);
      }
    });
    setSelectedDates(selectedDays);
  };
  useEffect(() => { rectangleSelect(); }, [endCoord]);
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
    setIsMouseUp((prev) => !prev);
  };
  const handleSelect = (data) => {
    setEvent([]);
    const selectedDays = [];
    let date1 = data.start;
    while (moment(date1).isBefore(data.end)) {
      selectedDays.push(moment(date1).format("YYYY-MM-DD"));
      date1 = moment(date1).add(1, "d");
    }
    // selectedDays.forEach((day) => {
    //   if (moment(day).isBefore(moment().startOf("day"))) {
    //     setEvent((prev) => [...prev, { start: day, backgroundColor: "gray", status: "block" }]);
    //   } else if (!currentItems[day]) {
    //     setEvent((prev) => [...prev, { start: day, backgroundColor: "green" }]);
    //   } else if (
    //     currentItems[day][startShift] === "1"
    //     && (startShift - currentDevice.shiftLength < 0
    //       || currentItems[day][startShift - currentDevice.shiftLength] === "1")
    //     && (startShift - currentDevice.shiftLength > 24
    //       || currentItems[day][startShift + currentDevice.shiftLength]) === "1"
    //   ) {
    //     setEvent((prev) => [...prev, { start: day, backgroundColor: "black" }]);
    //   } else if (currentItems[day][startShift] === "1") {
    //     setEvent((prev) => [...prev, { start: day, backgroundColor: "red" }]);
    //   } else {
    //     setEvent((prev) => [...prev, { start: day, backgroundColor: "green" }]);
    //   }
    // });

    setSelectedDates(selectedDays);
  };
  return (
    <div
      onMouseUp={(e) => handleChangeMouse(e)}
      onMouseDown={(e) => handleChangeMouse(e)}
    >
      <RectangleSelection
        onSelect={() => {}}
        disabled={isDefaultSelect && !isActiveCalendar}
        style={{
          backgroundColor: "rgba(0,0,255,0.4)",
          borderColor: "blue",
        }}
      >
        <FullCalendar
          fixedWeekCount={false}
          ref={calendarRef}
          plugins={[dayGridPlugin, interaction, timeGrid, calenderList]}
          showNonCurrentDates={false}
          selectHelper
          selectable={isDefaultSelect && isActiveCalendar}
          dateClick={(e) => console.log(e)}
          selectMirror
          select={(data) => handleSelect(data)}
          initialView="dayGridMonth"
          locale="ru"
          firstDay="1"
          weekends
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          events={event}
          eventContent={renderEventContent}
          // style={{
          //   MozUserSelect: "none",
          //   WebkitUserSelect: "none",
          //   msUserSelect: "none",
          // }}
          headerToolbar={{
            left: "today changeSelectType",
            center: "title",
            right: "prev,next",
          }}
          customButtons={{
            changeSelectType: {
              text: "Изменить тип выделения",
              click: () => {
                setIsDefaultSelect((prev) => !prev);
              },
            },
          }}
        />
      </RectangleSelection>
    </div>
  );
}
