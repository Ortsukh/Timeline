import React from "react";
import TableComponent from "./Table/TableComponent";

export default function LesseeTableDashboard({ lesseeCompanies }) {
  const headerRentCompanies = [
    { value: "Название", style: {} },
    { value: "Контактное лицо", style: {} },
    { value: "Баланс", style: {} },
    { value: "Забронировано", style: {} },
  ];

  const rowsRentCompanies = lesseeCompanies.map((el) => {
    const cells = [
      { value: el.company.name || "Компания", class: "lesseeCell", idCompany: el.company.id },
      { value: el.company.contactPerson || "Неизвестно", class: "" },
      { value: el.balance > 0 ? el.balance : "0.00", class: "moneyCell", style: { color: el.balance <= 0 ? "red" : "black" } },
      { value: el.reservedBalance > 0 ? el.reservedBalance : "0.00", class: "moneyCell" },
    ];
    return { key: el.company.id, date: cells };
  });

  return (
    <TableComponent
      title="Арендаторы"
      headers={headerRentCompanies}
      rows={rowsRentCompanies}
      isBtnTimeline={false}
    />
  );
}
