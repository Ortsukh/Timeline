import React, { useState } from "react";
import DateFilter from "../../../FilterComponents/DateFilter";

export default function FiltersForOrder({
  setShiftsCount,
  setOrderDate,
  orderDate,
}) {
  const [isActiveDate, setIsActiveDate] = useState(false);

  const showDatePicker = () => {
    setIsActiveDate((current) => !current);
  };

  const choseShiftsCount = (count) => {
    setShiftsCount(count.target.value);
  };

  return (
    <>
      <DateFilter
        showDatePicker={showDatePicker}
        isActiveDate={isActiveDate}
        setOrderDate={setOrderDate}
        orderDate={orderDate}
      />
      <div className="select-count-box">
        <span>Количество смен</span>
        <select onChange={choseShiftsCount}>
          <option value={1} selected>
            {1}
          </option>
          <option value={2}>{2}</option>
          <option value={3}>{3}</option>
        </select>
      </div>
    </>
  );
}
