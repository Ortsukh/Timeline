import React, { useEffect, useState } from "react";
import "../style.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function TimeShift({
  currentDevice, setBaseOrder, isActiveCalendar, baseOrder,
}) {
  // console.log(currentDevice.workTime.shiftTimes);
  let startWorkDay = Number(currentDevice.workTime.shiftTimes.start.split(":")[0]);
  let endWorkDay = Number(currentDevice.workTime.shiftTimes.end.split(":")[0]);

  const [value, setValue] = useState([
  ]);

  useEffect(() => {
    startWorkDay = Number(currentDevice.workTime.shiftTimes.start.split(":")[0]);
    endWorkDay = Number(currentDevice.workTime.shiftTimes.end.split(":")[0]);
    setValue([]);
  }, [currentDevice]);

  // console.log(startWorkDay, endWorkDay);

  const generateShiftTime = (shift) => {
    const options = [];
    for (let i = startWorkDay; i < endWorkDay; i += shift) {
      options.push({ value: i, label: `${i} - ${i + shift > 24 ? 24 : i + shift}` });
    }
    return options;
  };

  const animatedComponents = makeAnimated();
  useEffect(() => {
    // setValue(baseOrder.shiftTime);
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
      <span style={{ margin: "auto 0" }}>Время смены:</span>
      <Select
        allowSelectAll
        closeMenuOnSelect={false}
        components={animatedComponents}
        isDisabled={!isActiveCalendar}
        options={[selectAllOption, ...generateShiftTime(+currentDevice.shiftLength)]}
        onChange={handleChangeTime}
        value={value}
        isMulti
        defaultValue={[]}
        placeholder="Выбрать..."
      />
    </div>
  );
}
