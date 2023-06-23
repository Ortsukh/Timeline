import React from "react";
import Select from "react-select";
import "./style.css";

export default function ToolsFilter({ toolNames, onInputChange, clearFilter }) {
  const chengeSearch = (e) => {
    onInputChange(e.value);
  };

  const getOptionsForSearch = (toolNames) => {
    return toolNames.map((tool) => {
      return { value: tool, label: tool };
    });
  };

  return (
    <div className="tools-filter">
      <Select
        options={getOptionsForSearch(toolNames)}
        onChange={chengeSearch}
      />
      <button className="clear-button" onClick={clearFilter}>
        clear
      </button>
    </div>
  );
}
