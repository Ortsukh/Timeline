import React from "react";
import moment from "moment";
import TableComponent from "./Table/TableComponent";

export default function ManagerTransactionsTableDashboard({ transactions }) {
  const headerTransactions = [
    { value: "№", style: {} },
    { value: "Компания", style: {} },
    { value: "Дата", style: {} },
    { value: "Стоимость", style: {} },
  ];

  const rowsTransactions = transactions.map((transaction) => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const cells = [
      { value: transaction.id, class: "centerCell" },
      { value: transaction.contract?.lesseeCompany?.name, class: "lesseeCell", idCompany: transaction?.contract?.lesseeCompany?.id },
      { value: moment(transaction.updatedAt?.date).format("D MMM"), class: "centerCell" },
      { value: roundedPrice(transaction.amount), class: "moneyCell" },
    ];
    return { key: transaction.id, date: cells };
  });

  return (
    <TableComponent
      title="Последние транзакции"
      headers={headerTransactions}
      rows={rowsTransactions}
      isBtnTimeline={false}
    />
  );
}
