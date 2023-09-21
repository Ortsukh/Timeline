import React from "react";
import TimeShift from "../../../FilterComponents/timeShiftFilter";

export default function FiltersForOrder({
  setShiftsCount,
  currentDevice,
  isActiveCalendar,
  setBaseOrder,
  baseOrder,
}) {
  // const [isActiveDate, setIsActiveDate] = useState(false);
  // const showDatePicker = () => {
  //   setIsActiveDate((current) => !current);
  // };
  const choseShiftsCount = (count) => {
    setShiftsCount(count.target.value);
  };

  return (
    <>
      <TimeShift
        isActiveCalendar={isActiveCalendar}
        currentDevice={currentDevice}
        setBaseOrder={setBaseOrder}
        baseOrder={baseOrder}
      />
      {/* <DateFilter */}
      {/*  showDatePicker={showDatePicker} */}
      {/*  isActiveDate={isActiveDate} */}
      {/*  setOrderDate={setOrderDate} */}
      {/*  orderDate={orderDate} */}
      {/* /> */}
      <div className="select-count-box">
        <span>Количество смен</span>
        <select onChange={choseShiftsCount} defaultValue={1} disabled={!isActiveCalendar}>
          <option value={1}>{1}</option>
          {/* <option value={2}>{2}</option> */}
          {/* <option value={3}>{3}</option> */}
        </select>
      </div>
    </>
  );
}
