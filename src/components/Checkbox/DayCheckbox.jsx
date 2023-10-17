import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function DayCheckbox({
  isActiveCalendar, checkDay, selectedWeekdays, currentDevice,
}) {
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
    value: "monday",
  }, {
    label: "вт",
    value: "tuesday",
  }, {
    label: "ср",
    value: "wednesday",
  }, {
    label: "чт",
    value: "thursday",
  }, {
    label: "пт",
    value: "friday",
  }, {
    label: "сб",
    value: "saturday",
  }, {
    label: "вс",
    value: "sunday",
  }];

  const toRender = (
    <div className="dayCheckbox">
      {dayArray.map((day) => (
        <label htmlFor={day.value} key={day.value}>
          {day.label}
          <input
            id={day.value}
            type="checkbox"
            checked={selectedWeekdays.includes(day.value)
                && currentDevice.workTime.dayMap[(day.value)]}
            onChange={checkDay}
            disabled={!isActiveCalendar || !currentDevice.workTime.dayMap[(day.value)]}
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
