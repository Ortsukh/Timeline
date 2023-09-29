import React from "react";

export default function ManagerSuccessConfInfo({
  isEditMode, calculatedOrSelectedDevice, selectedCompany,
}) {
  return (
    <div>
      {isEditMode
        ? (
          <>
            <p style={{ fontSize: "14px" }}>
              {"Для оборудования "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
              {" компании "}
              <span style={{ fontWeight: "bold", color: "#f03333" }}>{selectedCompany.name}</span>
              , Вы можете редактировать заказ изменив смену и после нажать на кнопку
              <span style={{ fontStyle: "italic" }}>`Сохранить`.</span>
            </p>
            <p style={{ fontSize: "14px" }}>
              Также вы можете подтвердить заказ, нажав на кнопку
              <span style={{ fontStyle: "italic" }}> `Подтвердить бронирование`.</span>
            </p>
          </>
        )
        : (
          <p style={{ fontSize: "14px" }}>
            {"Подсчет смен для "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{calculatedOrSelectedDevice && calculatedOrSelectedDevice.title}</span>
            {" компании "}
            <span style={{ fontWeight: "bold", color: "#f03333" }}>{selectedCompany.name}</span>
            {/* eslint-disable-next-line */}
            , прошел успешно. Вы можете внести изменения нажав на день в календаре или завершить бронирование, нажав на кнопку
            <span style={{ fontStyle: "italic" }}>`Сохранить`.</span>
          </p>
        )}
    </div>

  );
}
