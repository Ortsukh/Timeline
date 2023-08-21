/* eslint-disable react/no-array-index-key */
import React from "react";
import "../style.css";

export default function CountTools({ choseCount, groupsCount, toolsCount }) {
  return (
    <div className="select-count-box">
      <span>Количество оборудования</span>
      <select onChange={choseCount} value={toolsCount || groupsCount.length}>
        {new Array(groupsCount.length)
          .fill("")
          .map((_el, index) => (
            <option
              value={index + 1}
              key={index}
            >
              {index + 1}
            </option>
          ))}
      </select>
    </div>
  );
}
