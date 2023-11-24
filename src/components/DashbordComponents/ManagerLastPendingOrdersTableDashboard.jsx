import React from "react";
import moment from "moment";
import TableComponent from "./Table/TableComponent";
// import { getClassStatus } from "../../common/GenerateElementsData";

export default function ManagerLastPendingOrdersTableDashboard({ orderData }) {
  const headerLastOrders = [
    { value: "№", style: {} },
    { value: "Дата", style: { minWidth: "70px" } },
    { value: "Арендатор", style: {} },
    { value: "Категория", style: {} },
    // { value: "Статус", style: { minWidth: "70px" } },
    { value: "Сумма", style: {} },
  ];
  console.log(orderData);
  const rowsLastOrders = orderData.map((order) => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const cells = [
      { value: order.id, class: "centerCell lesseeCell", idOrder: order.id },
      { value: moment(order.date).format("D MMM"), class: "centerCell", style: { padding: "8px 2px" } },
      { value: order.company, class: "" },
      { value: order.category, class: "lesseeCell", idCategory: order.categoryId },
      // { value: order.status, class: getClassStatus(order.status) },
      { value: roundedPrice(order.total), class: "moneyCell" },
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
