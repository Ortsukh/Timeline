import React, { useRef } from "react";
import "../style.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateFilter({
  isActiveDate,
  showDatePicker,
  setOrderDate,
  orderDate,
  isAdmin,
}) {
  const datePicker = useRef(null);
  const className = isAdmin
    ? "button-select-date"
    : "button-select-date btn-date";
  return (
    <div className="select-date-box ">
      <button type="button" className={className} onClick={showDatePicker}>
        {isActiveDate ? "Закрыть" : "Выбрать дату"}
      </button>

      <div className={isActiveDate ? "active" : "hidden"} ref={datePicker}>
        <DateRangePicker
          onChange={(item) => setOrderDate({ ...orderDate, ...item })}
          ranges={[orderDate.selection1]}
        />
      </div>
    </div>
  );
}
