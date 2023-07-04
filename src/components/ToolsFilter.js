import React, {useState, useEffect} from "react";
import Select from "react-select";
import "./style.css";

export default function ToolsFilter({ toolNames, onInputChange, clearFilter }) {

  const [selectValue, setSelectValue] = useState(null)

  useEffect(() => {
    const value = localStorage.getItem('toolsFilter') || null
    if(value){
    setSelectValue({ value: value, label: value })
    onInputChange(value)}
  },[])

  const changeSearch = (e) => {
    setSelectValue(e)
    onInputChange(e.value);
  };

  const getOptionsForSearch = (toolNames) => {
    return toolNames.map((tool) => {
      return { value: tool, label: tool };
    });
  };

  const handleReset = () => {
    setSelectValue(null)
    clearFilter()
  }

  return (
    <div className="tools-filter">
    <span> Выбрать оборудование</span>
      <Select className="select-filter"
        options={getOptionsForSearch(toolNames)}
        onChange={changeSearch}
        value={selectValue}
      />
      <button className="clear-button" onClick={handleReset}>
        Очистить
      </button>
    </div>
  );
}
