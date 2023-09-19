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

const events = [];
function renderEventContent(eventInfo) {
  const color = eventInfo.backgroundColor || "#ffa4a4";
  console.log(eventInfo);
  const obj = {
    height: 30,
    backgroundColor: color,
    width: 50,
  };
  return <div style={obj} />;
}

const handleEventClick = (clickInfo) => {
  console.log(clickInfo);

  console.log("event tıklandı.");
};

const handleEvents = (events1) => {
  console.log(events1);

  console.log("handleEvents tıklandı.");
};
export default function BookingCalendar({ items, currentDevice }) {
  const [startCoord, setStartCoord] = useState(0);
  const [isDefaultSelect, setIsDefaultSelect] = useState(true);
  const [endCoord, setEndCoord] = useState(0);
  const calendarRef = useRef();
  const [event, setEvent] = useState(events);
  const currentItems = groupByDateItems(
    items.filter((item) => moment(item.date).isSameOrAfter(moment().startOf("day"))),
  );
  const startShift = 8;
  console.log(items);
  const checkShiftPerDay = (day) => {
    if (moment(day).isBefore(moment().startOf("day"))) {
      setEvent((prev) => [...prev, { start: day, backgroundColor: "#c3cddd" }]);
    } else if (!currentItems[day]) {
      setEvent((prev) => [...prev, { start: day, backgroundColor: "#90ef90" }]);
    } else if (
      currentItems[day][startShift] === "1"
      && (startShift - currentDevice.shiftLength < 0
        || currentItems[day][startShift - currentDevice.shiftLength] === "1")
      && (startShift - currentDevice.shiftLength > 24
        || currentItems[day][startShift + currentDevice.shiftLength]) === "1"
    ) {
      setEvent((prev) => [...prev, { start: day, backgroundColor: "#3a3a3a" }]);
    } else if (currentItems[day][startShift] === "1") {
      setEvent((prev) => [...prev, { start: day, backgroundColor: "#ffa4a4" }]);
    } else {
      setEvent((prev) => [...prev, { start: day, backgroundColor: "#90ef90" }]);
    }
  };
  useEffect(() => {
    setEvent([]);

    // 👇️ call method in useEffect hook
    if (!calendarRef.current) return;
    const calendar = calendarRef.current.elRef.current;
    const calendarDayCell = calendar.querySelectorAll(
      ".fc-day.fc-daygrid-day:not(.fc-day-disabled)",
    );
    const SelectedCell = [];
    calendarDayCell.forEach((cell) => {
      const cellCoord = cell.getBoundingClientRect();
      if (
        ((cellCoord.right > startCoord[0] && cellCoord.right < endCoord[0])
          || (cellCoord.left > startCoord[0] && cellCoord.left < endCoord[0])
          || (cellCoord.right > startCoord[0]
            && cellCoord.right > endCoord[0]
            && cellCoord.left < startCoord[0]
            && cellCoord.left < endCoord[0]))
        && (((cellCoord.top > startCoord[1] && cellCoord.top < endCoord[1])
          || (cellCoord.bottom > startCoord[1] && cellCoord.bottom < endCoord[1]))
              || (cellCoord.top < startCoord[1]
              && cellCoord.top < endCoord[1]
              && cellCoord.bottom > startCoord[1]
              && cellCoord.bottom > endCoord[1]))
      ) {
        checkShiftPerDay(cell.dataset.date);
      }
    });
    console.log(SelectedCell);
  }, [endCoord]);

  const handleSelect = (data) => {
    setEvent([]);
    const selectedDays = [];
    let date1 = data.start;
    while (moment(date1).isBefore(data.end)) {
      selectedDays.push(moment(date1).format("YYYY-MM-DD"));
      date1 = moment(date1).add(1, "d");
    }
    selectedDays.forEach((day) => {
      if (moment(day).isBefore(moment().startOf("day"))) {
        setEvent((prev) => [...prev, { start: day, backgroundColor: "#c3cddd" }]);
      } else if (!currentItems[day]) {
        setEvent((prev) => [...prev, { start: day, backgroundColor: "#90ef90" }]);
      } else if (
        currentItems[day][startShift] === "1"
        && (startShift - currentDevice.shiftLength < 0
          || currentItems[day][startShift - currentDevice.shiftLength] === "1")
        && (startShift - currentDevice.shiftLength > 24
          || currentItems[day][startShift + currentDevice.shiftLength]) === "1"
      ) {
        setEvent((prev) => [...prev, { start: day, backgroundColor: "#3a3a3a" }]);
      } else if (currentItems[day][startShift] === "1") {
        setEvent((prev) => [...prev, { start: day, backgroundColor: "#ffa4a4" }]);
      } else {
        setEvent((prev) => [...prev, { start: day, backgroundColor: "#90ef90" }]);
      }
    });
    console.log(selectedDays);
  };
  return (
    <RectangleSelection
      onSelect={(e, coords) => {
        setStartCoord(coords.origin);
        setEndCoord(coords.target);
      }}
      disabled={isDefaultSelect}
      style={{
        backgroundColor: "rgba(0,0,255,0.4)",
        borderColor: "blue",
      }}
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interaction, timeGrid, calenderList]}
        showNonCurrentDates={false}
        selectHelper
        selectable={isDefaultSelect}
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
        headerToolbar={
          {
            left: "today changeSelectType",
            center: "title",
            right: "prev,next",
          }
        }
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
  );
}
