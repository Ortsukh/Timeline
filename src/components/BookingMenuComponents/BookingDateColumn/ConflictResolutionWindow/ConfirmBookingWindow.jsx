/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import { v4 as uuidv4 } from "uuid";
import style from "../BookingTimeline.module.css";
import "../../../style.css";
import { addGrid } from "../../../../common/DataConvertHelper";
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
}) {

console.log("selectedConflictDate", selectedConflictDate);
  const textCountConflict = baseOrder.equipment?.conflicts.length !== 0 
  ? `У Вас на данный момент ${baseOrder.equipment?.conflicts.length} 
  конфликтов. Нажмите на нужные даты в календаре и разрешите их.`
  : `Подсчет дат прошло успешно. Вы можете завершить бронирование нажав на кнопку 
  "Подтвердить" или внести изменения нажав на день в календаре.`;

  return (
    <>
      {showStartDisplayConflict &&
        // <div className={style.containerTimeline} style=
        //{{ width: "45vw", height: "50vh", backgroundColor: "gray", zIndex: "2", border: "1px solid gray" }}>
        <div style={{ width: "45vw", margin: "0 auto", padding: "0 0 0 20px", fontSize: "20px" }}>
          <h3>Для начала бронирования выполните следующия шаги:</h3>
          <p>1. Выберите подходящее Вам оборудования;</p>
          <p>2. Укажите подходящие Вам время и колличество смен;</p>
          <p>3. Выделите нужные даты;</p>
          <p>4. Нажмите "Рассчитать";</p>
          <p>5. Если вы ошибочно выбрали даты, нажмите "Очистить".</p>
          <h4>После этого, если выбранные Вами даты были заняты, вы иожете разрешить эти конфликты выбором других смен.</h4>
          <h4>При успешном бронировании вы можете подтвердить его.</h4>
        </div>
      }

      {!showStartDisplayConflict &&
        <div style={{ width: "45vw", margin: "0 auto", padding: "0 10px 0 20px", fontSize: "20px" }}>
          {textCountConflict}
        </div>}

      {selectedConflictDate && <WindowTimeline
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
