import React, { useState } from "react";
import DateFilter from "../../../FilterComponents/DateFilter";

export default function FiltersForOrder({
  setShiftsCount,
  setOrderDate,
  orderDate,
  currentDevice,
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
        <select onChange={choseShiftsCount} defaultValue={1}>
          <option value={1}>{1}</option>
          {/* <option value={2}>{2}</option> */}
          {/* <option value={3}>{3}</option> */}
        </select>
        <span className="price-item">
          Цена за смену:
          {" "}
          {+currentDevice.price}
          р
        </span>

      </div>
    </>
  );
}
