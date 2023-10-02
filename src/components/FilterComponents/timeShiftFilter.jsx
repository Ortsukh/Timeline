import React, { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const getOptionsForSearch = (tools) => tools.map((tool) => ({ value: tool, label: tool }));

const generateShiftTime = (shift) => {
  const options = [];
  for (let i = 0; i < 24; i += shift) {
    options.push({ value: i, label: `${i} - ${i + shift}` });
  }
  return options;
};

export default function TimeShift({
  currentDevice, setBaseOrder, isActiveCalendar, baseOrder,
}) {
  const [value, setValue] = useState([{ value: 0, label: `0 - ${+currentDevice.shiftLength}` }]);
  const animatedComponents = makeAnimated();
  useEffect(() => {
    setValue(baseOrder.shiftTime);
  }, [baseOrder.shiftTime]);
  const handleChangeTime = (e) => {
    setValue(e);
    console.log(e);
    setBaseOrder((prev) => ({
      ...prev, shiftTime: e,
    }));
  };

  return (
    <div className="select-count-box">
      <span>Время смены</span>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isDisabled={!isActiveCalendar}
        options={generateShiftTime(+currentDevice.shiftLength)}
        onChange={handleChangeTime}
        value={value}
        isMulti
        defaultValue={[{ value: 0, label: `0 - ${+currentDevice.shiftLength}` }]}
      />
    </div>
  );
}
