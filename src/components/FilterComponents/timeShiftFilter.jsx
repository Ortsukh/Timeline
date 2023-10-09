import React, { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function TimeShift({
  currentDevice, setBaseOrder, isActiveCalendar, baseOrder,
}) {
  console.log(currentDevice.workTime.shiftTimes);
  const startWorkDay = Number(currentDevice.workTime.shiftTimes.start.split(":")[0]);
  const endWorkDay = Number(currentDevice.workTime.shiftTimes.end.split(":")[0]);
  console.log(startWorkDay, endWorkDay);
  const [value, setValue] = useState([
    {
      value: startWorkDay,
      label: `${startWorkDay} - ${+currentDevice.shiftLength}`,
    }]);

  const generateShiftTime = (shift) => {
    const options = [];
    for (let i = startWorkDay; i < endWorkDay; i += shift) {
      options.push({ value: i, label: `${i} - ${i + shift}` });
    }
    return options;
  };

  const animatedComponents = makeAnimated();
  useEffect(() => {
    setValue(baseOrder.shiftTime);
  }, [baseOrder.shiftTime]);

  const handleChangeTime = (e) => {
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
