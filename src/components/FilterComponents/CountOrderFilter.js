import React from "react";
import "./style.css";

export default function CountOrderFilter({ choseCount, groupsCount }) {
  const maxOrdersPerDay = 12;

  return (
    <div className="select-count-order-box">
      <span>Количество смен</span>

      <select>
        {new Array(maxOrdersPerDay).fill("").map((_el, index) => {
          return (
            <option value={index + 1} key={index}>
              {index + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
}
