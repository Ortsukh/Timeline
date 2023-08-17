import React from "react";
import "../style.css";

export default function CountTools({ choseCount, groupsCount }) {
  
  return (
    <div className="select-count-box">
    <span>Количество оборудования</span>
    <select onChange={choseCount}>
      {new Array(groupsCount.length)
        .fill("")
        .map((_el, index) => {
          const last = groupsCount.length - 1;
          return (
            <option
              value={index + 1}
              key={index}
              selected={index === last ? true : false}
            >
              {index + 1}
            </option>
          );
        })}
    </select>
  </div>
  );
}
