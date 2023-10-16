import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function DayCheckbox({ isActiveCalendar, checkDay, selectedWeekdays }) {
  const containerRef = useRef(null);
  const portalContainer = document.createElement("div");

  useEffect(() => {
    const container = document.querySelector(".fc-header-toolbar.fc-toolbar.fc-toolbar-ltr");
    if (container) {
      container.prepend(portalContainer);
      containerRef.current = container;
    }
    return () => {
      container.removeChild(portalContainer);
    };
  }, [containerRef, portalContainer]);
  const dayArray = [{
    label: "пн",
    value: "mon",
  }, {
    label: "вт",
    value: "tue",
  }, {
    label: "ср",
    value: "wed",
  }, {
    label: "чт",
    value: "thu",
  }, {
    label: "пт",
    value: "fri",
  }, {
    label: "сб",
    value: "sat",
  }, {
    label: "вс",
    value: "sun",
  }];

  const toRender = (
    <div className="dayCheckbox">
      {dayArray.map((day) => (
        <label htmlFor={day.value}>
          {day.label}
          <input
            id={day.value}
            type="checkbox"
            checked={selectedWeekdays.includes(day.value)}
            onChange={checkDay}
            disabled={!isActiveCalendar}
            value={day.value}
          />
        </label>
      ))}

    </div>
  );

  if (containerRef) {
    return ReactDOM.createPortal(
      toRender,
      portalContainer,
    );
  }
  return null;
}

export default DayCheckbox;
