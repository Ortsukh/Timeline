import React from "react";
import moment from "moment";
import { getClassStatus } from "../../common/GenerateElementsData";
import TableComponent from "./Table/TableComponent";

export default function LesseeRentalZoneTableDashboard({ rentZone }) {
  const headerRentZone = [
    { value: "№", style: {} },
    { value: "Название", style: {} },
    { value: "Дата", style: {} },
    { value: "Стоимость", style: {} },
    { value: "Статус", style: {} },
  ];

  const rowsRentZone = rentZone.map((zone) => {
    const roundedPrice = (price) => {
      const numPrice = +price;
      return numPrice.toFixed(2);
    };
    const cells = [
      { value: zone.id, class: "centerCell" },
      { value: zone.contract?.marketPlace?.kitchensEquipment[0]?.name, class: "" }, // TODO посмотреть почему kitchensEquipment - массив
      { value: moment(zone.createdAt?.date).format("D MMM"), class: "centerCell" },
      { value: roundedPrice(zone.totalSum), class: "moneyCell" },
      { value: zone.status, class: getClassStatus(zone.status) },
    ];
    return { key: zone.id, date: cells };
  });

  return (
    <TableComponent
      title="Арендованные зоны"
      headers={headerRentZone}
      rows={rowsRentZone}
      isBtnTimeline={false}
    />
  );
}
