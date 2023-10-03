import React from "react";
import moment from "moment";
import PluralizeWordConflict from "../../../../../common/PluralizeWordConflict";
import buttonTitleConstants from "../../../../../constants/buttonTitleConstants";

export default function CompanyDayConfInfo({ baseOrder, selectedConflictDate }) {
  const today = moment(selectedConflictDate.start);
  const countDayConflict = selectedConflictDate.extendedProps.conflicts.length;
  const countCommonConflict = baseOrder.equipment?.countConflicts;
  // console.log("today.format()", selectedConflictDate.extendedProps.conflicts.length);
  return (
    <div>
      {countDayConflict > 0
        ? (
          <p style={{ fontSize: "14px" }}>
            <span style={{ fontWeight: "bold", color: "#f03333" }}>
              {`${today.format("D")} ${today.format("MMMM").charAt(0).toUpperCase()}${today.format("MMMM").slice(1)}`}
            </span>
            {" у вас "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{countDayConflict}</span>
            {" "}
            { PluralizeWordConflict(countDayConflict, "конфликт")}
            {" из "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{countCommonConflict}</span>
            . Нажмите на нужную смену и измените её путём нажатия на пустую ячейку.
          </p>
        )
        : (
          <p style={{ fontSize: "14px" }}>
            {"Подсчет смен для "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>
              {`${today.format("D")} ${today.format("MMMM").charAt(0).toUpperCase()}${today.format("MMMM").slice(1)}`}
            </span>
            {" прошел успешно. Вы можете внести изменения нажав на нужную смену или завершить бронирование, нажав на кнопку "}
            <span style={{ fontStyle: "italic" }}>
              `
              {buttonTitleConstants.CONFIRM}
              `.
            </span>
          </p>
        )}
    </div>
  );
}
