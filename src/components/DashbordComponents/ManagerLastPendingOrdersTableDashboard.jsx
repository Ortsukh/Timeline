import React from "react";
import moment from "moment";
import TableComponent from "./Table/TableComponent";
// import { getClassStatus } from "../../common/GenerateElementsData";

export default function ManagerLastPendingOrdersTableDashboard({ orderData }) {
  const headerLastOrders = [
    { value: "№", style: {} },
    { value: "Дата", style: { minWidth: "70px" } },
    { value: "Компания", style: {} },
    { value: "Категория", style: {} },
    // { value: "Статус", style: { minWidth: "70px" } },
    { value: "Сумма", style: {} },
    // { value: "Остаточная стоимость", style: {} },
  ];

  const rowsLastOrders = orderData.map((order) => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const cells = [
      { value: order.id, class: "centerCell lesseeCell", idOrder: order.id },
      { value: moment(order.date).format("D MMM"), class: "centerCell", style: { padding: "8px 2px" } },
      { value: order.company, class: "" },
      { value: order.category, class: "" },
      // { value: order.status, class: getClassStatus(order.status) },
      { value: roundedPrice(order.price), class: "moneyCell" },
      // { value: roundedPrice(order.price), class: "moneyCell" },
    ];
    return { key: order.id, date: cells };
  });

  return (
    <TableComponent
      title="Список ожидающих заказов"
      headers={headerLastOrders}
      rows={rowsLastOrders}
      isBtnTimeline
    />
  );
}
