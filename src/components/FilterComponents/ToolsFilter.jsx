import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../style.css";
import EQUIPMENT_COLOR from "../../constants/equipmentColor";

export default function ToolsFilter({
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  showButtonClear,
  isFromDashboard,
  isActiveCalendar,
  currentDevice,
}) {
  const [selectValue, setSelectValue] = useState(null);
  useEffect(() => {
    const value = localStorage.getItem("toolsFilter") || currentDevice?.category || null;
    if (value) {
      setSelectValue({ value, label: value });
      onInputChange(value);
    }
  }, []);
  const changeSearch = (e) => {
    setSelectValue(e);
    onInputChange(e.value);
  };

  const formatOptionLabel = ({ label }) =>
  // const color = EQUIPMENT_COLOR[label] || "#622525";

    (
      <div style={{ display: "flex" }}>
        <div className="equipment_color_block" />
        <div>{label }</div>

      </div>
    )
  ;

  // eslint-disable-next-line max-len
  const getOptionsForSearch = (tools) => tools.map((tool) => ({ value: tool, label: tool }));

  const handleReset = () => {
    setSelectValue(null);
    clearFilter();
    setIsClickingOnEmptyFilter(false);
  };

  return (
    <div className="tools-filter">
      <span> Выбрать категорию оборудования</span>
      <Select
        isDisabled={!isActiveCalendar}
        formatOptionLabel={formatOptionLabel}
        className="select-filter choose-product"
        options={getOptionsForSearch(toolNames)}
        onChange={changeSearch}
        value={selectValue}
      />
      {!selectValue && isClickingOnEmptyFilter && (
        <div className="tooltip">Пожалуйста, выберите группу</div>
      )}
      {showButtonClear && !isFromDashboard && (
        <button type="button" className="clear-button" onClick={handleReset}>
          Очистить
        </button>
      )}
    </div>
  );
}
