import React, { useState, useEffect } from "react";
import Select from "react-select";
import "../style.css";

export default function ToolsFilter({
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  showButtonClear,
  setCurrentDeviceIndex,
}) {
  const [selectValue, setSelectValue] = useState(null);

  useEffect(() => {
    const value = localStorage.getItem("toolsFilter") || null;
    if (value) {
      setSelectValue({ value, label: value });
      onInputChange(value);
    }
  }, []);

  const changeSearch = (e) => {
    setSelectValue(e);
    onInputChange(e.value);
    setCurrentDeviceIndex(0);
  };

  // eslint-disable-next-line max-len
  const getOptionsForSearch = (tools) => tools.map((tool) => ({ value: tool, label: tool }));

  const handleReset = () => {
    setSelectValue(null);
    clearFilter();
    setIsClickingOnEmptyFilter(false);
  };

  return (
    <div className="tools-filter">
      <span> Выбрать оборудование</span>
      <Select
        className="select-filter"
        options={getOptionsForSearch(toolNames)}
        onChange={changeSearch}
        value={selectValue}
      />
      {!selectValue && isClickingOnEmptyFilter && (
        <div className="tooltip">Пожалуйста, выберите группу</div>
      )}
      {showButtonClear && (
        <button type="button" className="clear-button" onClick={handleReset}>
          Очистить
        </button>
      )}
    </div>
  );
}