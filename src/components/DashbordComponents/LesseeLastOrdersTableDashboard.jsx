import React from "react";
import moment from "moment";
import { getClassStatus } from "../../common/GenerateElementsData";
import TableComponent from "./Table/TableComponent";

export default function LesseeLastOrdersTableDashboard({ ordersData }) {
  const headerLastOrders = [
    { value: "№", style: {} },
    { value: "Дата", style: {} },
    { value: "Категория", style: {} },
    { value: "Статус", style: { minWidth: "70px" } },
    { value: "Сумма", style: {} },
    { value: "Остаточная стоимость", style: {} },
  ];

  const rowsLastOrders = ordersData.map((order) => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const cells = [
      { value: order.id, class: "centerCell" },
      { value: moment(order.date).format("D MMM"), class: "centerCell", style: { padding: "8px 2px" } },
      { value: order.category, class: "" },
      { value: order.status, class: getClassStatus(order.status) },
      { value: roundedPrice(order.price), class: "moneyCell" },
      { value: roundedPrice(order.price), class: "moneyCell" },
    ];
    return { key: order.id, date: cells };
  });

  return (
    <TableComponent
      title="Последние заказы"
      headers={headerLastOrders}
      rows={rowsLastOrders}
      isBtnTimeline
    />
  );
}
