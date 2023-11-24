import React from "react";
import moment from "moment";
import { getClassStatus } from "../../common/GenerateElementsData";
import TableComponent from "./Table/TableComponent";

export default function RepairKitchenTableDashboard({ updatedEquipment }) {
  const headerRepairEquip = [
    { value: "Категория", style: {} },
    { value: "Оборудование", style: {} },
    { value: "Обновление по статусу", style: {} },
    { value: "Дата", style: { minWidth: "70px" } },
  ];

  const rowsRepairEquip = updatedEquipment.map((equipment) => {
    const cells = [
      { value: equipment.name, class: "lesseeCell", idCategory: equipment.id },
      { value: equipment.name, class: "" },
      { value: equipment.status, class: getClassStatus(equipment.status) },
      { value: moment(equipment.updatedAt?.date).format("D MMM"), class: "centerCell", style: { padding: "8px 2px" } },
    ];
    return { key: equipment.id, date: cells };
  });

  return (
    <TableComponent
      title="Обновление статуса оборудования"
      headers={headerRepairEquip}
      rows={rowsRepairEquip}
      isBtnTimeline={false}
    />
  );
}
