import React from "react";
import "./style.css";

export default function LesseeStatsDashboard() {
  return (
    <div className="statsDashboardContainer">
      <div className="statsItem">
        <span>Затраты за день</span>
        <span className="positive-values values">2600</span>
      </div>
      <div className="statsItem">
        <span>Затраты за период</span>
        <span className="positive-values values">
          {Math.floor(Math.random() * 30000 + 15000)}
        </span>
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
