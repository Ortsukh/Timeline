import React from "react";
import "moment/locale/ru";
import "../../../style.css";
import { Tooltip } from "react-tooltip";
import styleConflict from "./Conflict.module.css";
import WindowTimeline from "./WindowTimeline";
import { generateClue } from "../../../../common/GenerateElementsData";

export default function ConfirmBookingWindow({
  user,
  items,
  groups,
  editOrderData,
  isEditMode,
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  showStartDisplayConflict,
  pushOrderInBasePreOrder,
  statusCheckboxSelected,
  handleSetSelectedConflictDate,
  selectedCompany,
}) {
  let calculatedOrSelectedDevice = null;
  if ("id" in baseOrder.equipment) {
    calculatedOrSelectedDevice = groups.find(
      (group) => group.id === baseOrder.equipment.id,
    );
  }
  // console.log("user", user);

  return (
    <>
      {showStartDisplayConflict
        && (
        <div style={{
          width: "auto", margin: "0 auto", padding: "0 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "30px",
        }}
        >
          <h3 style={{ fontSize: "18px" }}>Для начала бронирования выполните следующие шаги:</h3>
          <p style={{ marginLeft: "20px", fontSize: "14px" }}>1. Выберите подходящее Вам оборудование;</p>
          <p style={{ marginLeft: "20px", fontSize: "14px" }}>2. Укажите подходящее Вам время и количество смен;</p>
          <p style={{ marginLeft: "20px", fontSize: "14px" }}>3. Выделите нужные даты;</p>
          <p style={{ marginLeft: "20px", fontSize: "14px" }}>
            {"4. Нажмите кнопку "}
            <span style={{ fontStyle: "italic" }}>`Рассчитать`;</span>
          </p>
          <p style={{ marginLeft: "20px", fontSize: "14px" }}>
            {"5. Если вы ошибочно выбрали даты, нажмите кнопку "}
            <span style={{ fontStyle: "italic" }}>`Очистить`.</span>
          </p>
          <h4 style={{ fontWeight: "400", marginBottom: "0", fontSize: "16px" }}>
            {"После этого, если "}
            <span style={{ fontWeight: "700" }}>выбранные Вами смены были заняты</span>
            {", вы можете "}
            <span style={{ fontWeight: "700" }}>разрешить эти конфликты</span>
            {" путем выбора других смен."}
          </h4>
          <h4 style={{ marginTop: "10px", fontSize: "14px" }}>При успешном бронировании вы можете подтвердить его.</h4>
        </div>
        )}

      {!showStartDisplayConflict && user.role === "ROLE_COMPANY"
        && (
        <div style={{
          width: "auto", margin: "0 auto", padding: "10px 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "20px", textAlign: "center", position: "relative",
        }}
        >
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
          <div id="riddler" className={styleConflict.riddler}>?</div>
          <Tooltip anchorSelect="#riddler" openOnClick place="bottom">
            {generateClue("TIMELINE_ROLE_COMPANY_CONFLICT")}
          </Tooltip>
        </div>
        )}

      {user.role === "ROLE_MANAGER"
        && (
        <div style={{
          width: "auto", margin: "0 auto", padding: "10px 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "20px", textAlign: "center", position: "relative",
        }}
        >
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
          <div id="riddler" className={styleConflict.riddler}>?</div>
          <Tooltip anchorSelect="#riddler" openOnClick place="bottom">
            {generateClue("TIMELINE_ROLE_MANAGER_CONFLICT")}
          </Tooltip>
        </div>
        )}

      {selectedConflictDate && (
      <WindowTimeline
        items={items}
        groups={groups}
        editOrderData={editOrderData}
        isEditMode={isEditMode}
        selectedConflictDate={selectedConflictDate}
        setSelectedConflictDate={setSelectedConflictDate}
        baseOrder={baseOrder}
        pushOrderInBasePreOrder={pushOrderInBasePreOrder}
        statusCheckboxSelected={statusCheckboxSelected}
        handleSetSelectedConflictDate={handleSetSelectedConflictDate}
      />
      )}
    </>
  );
}
