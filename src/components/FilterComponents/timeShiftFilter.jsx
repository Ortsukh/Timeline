import React from "react";
import "../style.css";

const generateShiftTime = (shift) => {
  const options = [];
  for (let i = 0; i < 24; i += shift) {
    console.log(i);
    options.push(
      <option
        value={i + 1}
        key={i}
      >
        {i}
      </option>,
    );
  }
  return options;
};

export default function TimeShift({ currentDevice, choseTime }) {
  console.log(generateShiftTime(currentDevice.shiftLength), currentDevice);
  return (
    <div className="select-count-box">
      <span>Время смены</span>
      <select onChange={choseTime} value={0}>
        {generateShiftTime(+currentDevice.shiftLength)}
      </select>
    </div>
  );
}
