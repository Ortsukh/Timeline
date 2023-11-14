import React from "react";
import "./style.css";

export default function LesseeStatsDashboard({ profitItems }) {
  const calcAllProfit = () => {
    let result = 0;
    result = profitItems.reduce((acc, cur) => cur.y + acc, 0);
    return result;
  };
  return !profitItems.length ? <>Загрузка</>
    : (
      <div className="statsDashboardContainer">
        <div className="statsItem item-green-bg">
          <span>Затраты за день</span>
          <span className="positive-values values">
            {/* {profitItems[profitItems.length - 1].y.toFixed(2)} */}
            -999
          </span>
        </div>
        <div className="statsItem item-green-bg">
          <span>Затраты за период</span>
          <span className="positive-values values">
            {/* {calcAllProfit().toFixed(2)} */}
            -999
          </span>
        </div>
        <div className="statsItem item-red-bg">
          <span>Забронировано</span>
          <span className="negative-values values">-999</span>
        </div>
        <div className="statsItem item-red-bg">
          <span>Просроченные платежи</span>
          <span className="negative-values values">-999</span>
        </div>
        <div className="statsItem item-green-bg">
          <span>Количество транзакций</span>
          <span className="positive-values values">-999</span>
        </div>
      </div>
    );
}
