import React from "react";
import PluralizeWordConflict from "../../../../../common/PluralizeWordConflict";
import buttonTitleConstants from "../../../../../constants/buttonTitleConstants";

export default function CompanyConfInfo({ baseOrder, calculatedOrSelectedDevice }) {
  const countCommonConflict = baseOrder.equipment?.countConflicts;
  return (
    <div>
      {countCommonConflict > 0
        ? (
          <>
            <p style={{ fontSize: "14px" }}>
              {"Рассчёт производился по оборудованию "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
            </p>
            <p style={{ fontSize: "14px" }}>
              {"Для него у Вас на данный момент "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{countCommonConflict}</span>
              {" "}
              {PluralizeWordConflict(countCommonConflict, "конфликт")}
              . Нажмите на нужные даты в календаре и разрешите их.
            </p>
          </>
        )
        : (
          <p style={{ fontSize: "14px" }}>
            {"Подсчет смен для "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
            {" прошел успешно. Вы можете внести изменения нажав на день в календаре или завершить бронирование, нажав на кнопку "}
            <span style={{ fontStyle: "italic" }}>
              `
              {buttonTitleConstants.SAVE_ORDER}
              `
            </span>
            .
          </p>
        )}
    </div>
  );
}
