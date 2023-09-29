import React from "react";

export default function CompanyConfInfo({ baseOrder, calculatedOrSelectedDevice }) {
  return (
    <div>
      {"conflicts" in baseOrder.equipment && baseOrder.equipment?.conflicts.length
        ? (
          <>
            <p style={{ fontSize: "14px" }}>
              {"Рассчёт производился по оборудованию "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
            </p>
            <p style={{ fontSize: "14px" }}>
              {"Для него у Вас на данный момент "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{baseOrder.equipment?.conflicts.length}</span>
              {" конфликт(ов). Нажмите на нужные даты в календаре и разрешите их."}
            </p>
          </>
        )
        : (
          <p style={{ fontSize: "14px" }}>
            {"Подсчет смен для "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
            {" прошел успешно. Вы можете внести изменения нажав на день в календаре или завершить бронирование, нажав на кнопку"}
            <span style={{ fontStyle: "italic" }}>`Сохранить и отправить заявку`.</span>
          </p>
        )}
    </div>
  );
}
