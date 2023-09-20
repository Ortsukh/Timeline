import React, { useEffect, useState } from "react";
import "../style.css";

const generateShiftTime = (shift) => {
  const options = [];
  for (let i = 0; i < 24; i += shift) {
    options.push(
      <option
        value={i}
        key={i}
      >
        {`${i} - ${i + shift}`}
      </option>,
    );
  }
  return options;
};

export default function TimeShift({
  currentDevice, setBaseOrder, isActiveCalendar, baseOrder,
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setValue(baseOrder.shiftTime);
  }, [baseOrder.shiftTime]);
  const handleChangeTime = (e) => {
    setValue(e.target.value);
    setBaseOrder((prev) => ({
      ...prev, shiftTime: e.target.value,
    }));
  };
  return (
    <div className="select-count-box">
      <span>Время смены</span>
      <select onChange={handleChangeTime} value={value} disabled={!isActiveCalendar}>
        {generateShiftTime(+currentDevice.shiftLength)}
      </select>
    </div>
  );
}
