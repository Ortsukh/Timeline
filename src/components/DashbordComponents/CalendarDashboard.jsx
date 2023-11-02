import { DateRangePicker } from "react-date-range";
import React, { useState } from "react";
import moment from "moment/moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ru from "date-fns/locale/ru";

export default function CalendarDashboard({ setSelectedTime }) {
  const [orderDate, setOrderDate] = useState({
    selection1: {
      startDate: new Date(moment().add(-7, "days").valueOf()),
      endDate: new Date(),
      key: "selection1",
    },
  });
  const [isActiveCalendar, setIsActiveCalendar] = useState(false);
  const handleChangeDate = (time) => {
    setOrderDate({ ...orderDate, ...time });
    setSelectedTime(time.selection1);
  };

  const handleOpenCalendar = () => {
    setIsActiveCalendar((prev) => !prev);
  };

  return (
    <div className="containerCalendarDashboard">
      <div className="button-wrapper">
        <button type="button" className="btn btn-sm open-select-interval mobile-action" onClick={handleOpenCalendar}>
          <span className="p-desktop-only">

            {moment(orderDate.selection1.startDate).format("DD MMM")}
            {" "}
            —
            {" "}
            {moment(orderDate.selection1.endDate).format("DD MMM")}

          </span>
          <i className="date-range-icon p-desktop-only" />
        </button>
      </div>
      <div className={isActiveCalendar ? "active calendarContainer" : "hidden"}>
        <DateRangePicker
          locale={ru}
          onChange={(time) => handleChangeDate(time)}
          ranges={[orderDate.selection1]}
        />
      </div>
    </div>

  );
}
