import React, { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function TimeShift({
  currentDevice, setBaseOrder, isActiveCalendar, baseOrder,
}) {
  const [value, setValue] = useState([{ value: currentDevice.workTime.start, label: `${currentDevice.workTime.start} - ${+currentDevice.shiftLength}` }]);

  const generateShiftTime = (shift) => {
    const options = [];
    for (let i = currentDevice.workTime.start; i < currentDevice.workTime.end; i += shift) {
      options.push({ value: i, label: `${i} - ${i + shift}` });
    }
    return options;
  };

  const animatedComponents = makeAnimated();
  useEffect(() => {
    setValue(baseOrder.shiftTime);
  }, [baseOrder.shiftTime]);
  const handleChangeTime = (e) => {
    console.log(e);
    if (e.find((el) => el.value === "*")) {
      setValue(generateShiftTime(+currentDevice.shiftLength));
      setBaseOrder((prev) => ({
        ...prev, shiftTime: (generateShiftTime(+currentDevice.shiftLength)),
      }));
      return;
    }
    setValue(e);
    setBaseOrder((prev) => ({
      ...prev, shiftTime: e,
    }));
  };
  const selectAllOption = { label: "Выбрать все", value: "*" };
  return (
    <div className="select-count-box select-choose-time">
      <span>Время смены</span>
      <Select
        allowSelectAll
        closeMenuOnSelect={false}
        components={animatedComponents}
        isDisabled={!isActiveCalendar}
        options={[selectAllOption, ...generateShiftTime(+currentDevice.shiftLength)]}
        onChange={handleChangeTime}
        value={value}
        isMulti
        // defaultValue={[{ value: 0, label: `0 - ${+currentDevice.shiftLength}` }]}
      />
    </div>
  );
}
