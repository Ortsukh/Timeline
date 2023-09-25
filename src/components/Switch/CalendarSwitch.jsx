import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import Switch from "react-switch";

function CalendarSwitch({ isActiveCalendar, setIsDefaultSelect, isDefaultSelect }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = document.querySelector(".fc-header-toolbar.fc-toolbar.fc-toolbar-ltr");
    if (container) containerRef.current = container;
  }, []);

  const handleSwitchChange = () => {
    setIsDefaultSelect(!isDefaultSelect);
  };

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

  if (containerRef.current) {
    return ReactDOM.createPortal(
      toRender,
      containerRef.current,
    );
  }
  return null;
}

export default CalendarSwitch;
