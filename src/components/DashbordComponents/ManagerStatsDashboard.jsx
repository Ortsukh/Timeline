import React from "react";
import "./style.css";

export default function ManagerStatsDashboard({ profitItems, userInfo }) {
  const calcAllProfit = () => {
    console.log(profitItems);
    let result = 0;
    result = profitItems.reduce((acc, cur) => Number(cur.y) + acc, 0);
    console.log(result);
    return result;
  };

  return (
    !profitItems.length ? <>Загрузка</>
      : (
        <div className="statsDashboardContainer">
          <div className="statsItem item-green-bg">
            <span>Прибыль за день</span>
            <span className="positive-values values">
              {profitItems[profitItems.length - 1].y}

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
            <span className="positive-values values">{userInfo.reservedBalance}</span>
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
      )
  );
}
