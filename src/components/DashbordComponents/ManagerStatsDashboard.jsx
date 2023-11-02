import React from "react";
import "./style.css";

export default function ManagerStatsDashboard() {
  return (
    <div className="statsDashboardContainer">
      <div className="statsItem item-green-bg">
        <span>Прибыль за день</span>
        <span className="positive-values values">2600</span>
      </div>
      <div className="statsItem item-green-bg">
        <span>Прибыль за период</span>
        <span className="positive-values values">
          {Math.floor(Math.random() * 30000 + 15000)}
        </span>
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
  );
}
