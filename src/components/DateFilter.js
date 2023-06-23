import React, {useRef} from "react";
import "./style.css";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateFilter({
  isActiveDate,
  showDatePicker,
  setOrderDate,
  orderDate,
}) {
  const datePicker = useRef(null);
  return (
    <div className="select-date-box">
      <button onClick={showDatePicker}>выбрать дату</button>

      <div className={isActiveDate ? "" : "hidden"} ref={datePicker}>
        <DateRangePicker
          onChange={(item) => setOrderDate({ ...orderDate, ...item })}
          ranges={[orderDate.selection1]}
        />
      </div>
    </div>
  );
}
