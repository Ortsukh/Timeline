import React from "react";
import PluralizeWordConflict from "../../../../../common/PluralizeWordConflict";

export default function ManagerFailConfInfo({
  countConflicts, calculatedOrSelectedDevice, selectedCompany,
}) {
  return (
    <>
      <p style={{ fontSize: "14px" }}>
        {"Рассчёт производился по оборудованию "}
        <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
        {" компании "}
        <span style={{ fontWeight: "bold", color: "#f03333" }}>{selectedCompany.name}</span>
        .
      </p>
      <p style={{ fontSize: "14px" }}>
        {"Для него у Вас на данный момент "}
        <span style={{ fontWeight: "bold", color: "#f03333" }}>{countConflicts}</span>
        {" "}
        {PluralizeWordConflict(countConflicts, "конфликт")}
        . Нажмите на нужные даты в календаре и разрешите их.
      </p>
    </>

  );
}
