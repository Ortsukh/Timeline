import React from "react";
import "./style.css";

export default function ManagerStatsDashboard({ profitItems }) {
  const calcAllProfit = () => {
    let result = 0;
    result = profitItems.reduce((acc, cur) => cur.y + acc, 0);
    return result;
  };

  return (
    !profitItems.length ? <>Загрузка</>
      : (
        <div className="statsDashboardContainer">
          <div className="statsItem item-green-bg">
            <span>Прибыль за день</span>
            <span className="positive-values values">
              {profitItems[profitItems.length - 1].y.toFixed(2)}
            </span>
          </div>
          <div className="statsItem item-green-bg">
            <span>Прибыль за период</span>
            <span className="positive-values values">
              {calcAllProfit().toFixed(2)}
            </span>
          </div>
          <div className="statsItem item-green-bg">
            <span>Забронировано</span>
            <span className="positive-values values">224.00</span>
          </div>
          <div className="statsItem item-red-bg">
            <span>Просроченные платежи</span>
            <span className="negative-values values">0</span>
          </div>
          <div className="statsItem item-green-bg">
            <span>Количество транзакций</span>
            <span className="positive-values values">200</span>
          </div>
        </div>
      )
  );
}
