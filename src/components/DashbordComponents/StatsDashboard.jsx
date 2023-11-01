import React from "react";
import "./style.css";

export default function StatsDashboard() {
  return (
    <div className="statsDashboardContainer">
      <div className="statsItem">
        <span>Прибыль за день</span>
        <span className="positive-values values">2600</span>
      </div>
      <div className="statsItem">
        <span>Прибыль за период</span>
        <span className="positive-values values">23300</span>
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
