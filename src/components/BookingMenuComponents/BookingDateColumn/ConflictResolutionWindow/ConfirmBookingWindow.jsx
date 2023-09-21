/* eslint-disable */
/* eslint-disable react/prop-types */
import React from "react";
import "moment/locale/ru";
import "../../../style.css";
import WindowTimeline from "./WindowTimeline";

export default function ConfirmBookingWindow({
  items,
  groups,
  itemsPreOrder,
  setItemsPreOrder,
  editOrderData,
  setCopyEditItems,
  setUpdatedItems,
  isEditMode,
  currentDevice,
  orderDatePlanning,
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  showStartDisplayConflict,
  pushOrderInBasePreOrder,
  keyRerenderConflictResolutionWindow,
}) {
// console.log("selectedConflictDate", selectedConflictDate);

  return (
    <>
      {showStartDisplayConflict &&
        // <div className={style.containerTimeline} style=
        //{{ width: "45vw", height: "50vh", backgroundColor: "gray", zIndex: "2", border: "1px solid gray" }}>
        <div style={{ width: "45vw", margin: "0 auto", padding: "0 0 0 20px", fontSize: "20px", backgroundColor: "rgb(215, 215, 215)", border: "1px solid gray", borderRadius: "5%" }}>
          <h3>Для начала бронирования выполните следующия шаги:</h3>
          <p>1. Выберите подходящее Вам оборудования;</p>
          <p>2. Укажите подходящие Вам время и колличество смен;</p>
          <p>3. Выделите нужные даты;</p>
          <p>4. Нажмите <span style={{ fontStyle: "italic" }}>`Рассчитать`</span>;</p>
          <p>5. Если вы ошибочно выбрали даты, нажмите <span style={{ fontStyle: "italic" }}>`Очистить`</span>.</p>
          <h4>После этого, если выбранные Вами даты были заняты, вы иожете разрешить эти конфликты выбором других смен.</h4>
          <h4>При успешном бронировании вы можете подтвердить его.</h4>
        </div>
      }

      {!showStartDisplayConflict &&
        <div style={{ width: "45vw", margin: "0 auto", padding: "0 10px 0 20px", fontSize: "20px" }}>
          {baseOrder.equipment.hasOwnProperty("conflicts") //КОСТЫЛЬ
          ? <p>
              У Вас на данный момент <span style={{ fontWeight: "bold" }}>{baseOrder.equipment?.conflicts.length}</span> конфликтов. Нажмите на нужные даты в календаре и разрешите их.
          </p>
          : <p>
              Подсчет дат прошло успешно. Вы можете завершить бронирование нажав на кнопку "Подтвердить" или внести изменения нажав на день в календаре.
          </p>
          }
        </div>}

      {selectedConflictDate && <WindowTimeline
        key={keyRerenderConflictResolutionWindow}
        items={items}
        groups={groups}
        setItemsPreOrder={setItemsPreOrder}
        editOrderData={editOrderData}
        setCopyEditItems={setCopyEditItems}
        setUpdatedItems={setUpdatedItems}
        isEditMode={isEditMode}
        selectedConflictDate={selectedConflictDate}
        setSelectedConflictDate={setSelectedConflictDate}
        baseOrder={baseOrder}
        pushOrderInBasePreOrder={pushOrderInBasePreOrder}
      />}
      {/* {!selectedConflictDate &&
        <div className={style.containerTimeline} style={{ width: "45vw", height: "50vh", backgroundColor: "gray", border: "1px solid gray" }}>
          {`Конфликтов ${baseOrder.equipment?.conflicts.length}`}
        </div>} */}
    </>
  );
}
