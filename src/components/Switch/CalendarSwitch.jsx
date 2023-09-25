import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Switch from "react-switch";

function CalendarSwitch({ isActiveCalendar, handleSwitchChange, isDefaultSelect }) {
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

  const toRender = (
    <div className="switch">
      <span>Выделение по календарю</span>
      {" "}
      <Switch
        disabled={!isActiveCalendar}
        checked={isDefaultSelect}
        onChange={handleSwitchChange}
      />
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

export default CalendarSwitch;
