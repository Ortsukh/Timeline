import React, {useState} from "react";
import Select from "react-select";
import "./style.css";

export default function ToolsFilter({ toolNames, onInputChange, clearFilter }) {
  const [selectValue, setSelectValue] = useState(null)

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
    <div>
      <Select
        options={getOptionsForSearch(toolNames)}
        onChange={changeSearch}
        value={selectValue}
      />
      <button className="clear-button" onClick={handleReset}>
        clear
      </button>
    </div>
  );
}
