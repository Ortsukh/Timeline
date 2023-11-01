import React from "react";
import "./style.css";

export default function StatsDashboard() {
  return (
    <div className="statsDashboardContainer">
      <div className="statsItem">
        <span>Прибыль за день</span>
        <span>2600</span>
      </div>
      <div className="statsItem">
        <span>Прибыль за период</span>
        <span>{Math.floor(Math.random() * 30000 + 15000)}</span>
      </div>
      <div className="statsItem">
        <span>Просроченные платежи</span>
        <span>0</span>
      </div>
      <div className="statsItem">
        <span>Количество транзакций</span>
        <span>200</span>
      </div>
    </div>
  );
}
