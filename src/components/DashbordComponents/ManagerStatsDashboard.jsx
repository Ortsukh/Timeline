import React from "react";
import "./style.css";

export default function ManagerStatsDashboard({ financeReport, userInfo }) {
  console.log(userInfo);
  const calcAllProfit = () => {
    let result = 0;
    result = financeReport.chart?.reduce((acc, cur) => Number(cur.y) + acc, 0);
    return result;
  };
  const rout = window.location.search.substring(1).split("&").find((query) => query.startsWith("page"))?.split("=")[1];
  return (
    !financeReport.chart?.length ? <>Загрузка</>
      : (
        <div className="statsDashboardContainer">
          <div className="statsItem item-green-bg">
            <span>Прибыль за день</span>
            <span className="positive-values values">
              {financeReport.todayAmount}

            </span>
          </div>
          <div className="statsItem item-green-bg">
            <span>Прибыль за период</span>
            <span className="positive-values values">
              {calcAllProfit().toFixed(2)}
            </span>
          </div>
          {rout !== "category_dashboard"
            && (
            <div className="statsItem item-green-bg">
              <span>Забронировано</span>
              <span className="positive-values values">{userInfo.reservedBalance}</span>
            </div>
            )}
          <div className="statsItem item-red-bg">
            <span>Просроченные платежи</span>
            <span className="negative-values values">
              {financeReport.expiredTransactionCount}
            </span>
          </div>
          <div className="statsItem item-green-bg">
            <span>Количество транзакций</span>
            <span className="positive-values values">{financeReport.transactionCount}</span>
          </div>
        </div>
      )
  );
}
