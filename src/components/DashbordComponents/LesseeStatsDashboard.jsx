import React from "react";
import "./style.css";

export default function LesseeStatsDashboard({ profitItems }) {
  const calcAllProfit = () => {
    let result = 0;
    result = profitItems.reduce((acc, cur) => cur.y + acc, 0);
    return result;
  };
  return (
    <div className="statsDashboardContainer">
      <div className="statsItem">
        <span>Затраты за день</span>
        <span className="positive-values values">
          {profitItems[profitItems.length - 1].y.toFixed(2)}
        </span>
      </div>
      <div className="statsItem">
        <span>Затраты за период</span>
        <span className="positive-values values">
          {calcAllProfit().toFixed(2)}
        </span>
      </div>
      <div className="statsItem">
        <span>Забронировано</span>
        <span className="negative-values values">124.00</span>
      </div>
      <div className="statsItem">
        <span>Просроченные платежи</span>
        <span className="negative-values values">0</span>
      </div>
      <div className="statsItem">
        <span>Количество транзакций</span>
        <span className="positive-values values">200</span>
      </div>
    </div>
  );
}
