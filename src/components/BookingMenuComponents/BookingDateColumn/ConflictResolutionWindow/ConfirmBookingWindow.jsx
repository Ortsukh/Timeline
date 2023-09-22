/* eslint-disable */
/* eslint-disable react/prop-types */
import React from "react";
import "moment/locale/ru";
import "../../../style.css";
import styleConflict from "./Conflict.module.css";
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
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  showStartDisplayConflict,
  pushOrderInBasePreOrder,
  keyRerenderConflictResolutionWindow,
  statusCheckboxSelected,
  handleSetSelectedConflictDate,
}) {

  return (
    <>
      {showStartDisplayConflict &&
        // <div className={style.containerTimeline} style=
        //{{ width: "45vw", height: "50vh", backgroundColor: "gray", zIndex: "2", border: "1px solid gray" }}>
        <div style={{ width: "45vw", margin: "0 auto", padding: "0 30px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "30px" }}>
          <h3>Для начала бронирования выполните следующие шаги:</h3>
          <p style={{marginLeft: "20px"}}>1. Выберите подходящее Вам оборудование;</p>
          <p style={{marginLeft: "20px"}}>2. Укажите подходящее Вам время и количество смен;</p>
          <p style={{marginLeft: "20px"}}>3. Выделите нужные даты;</p>
          {/* <p style={{marginLeft: "20px"}}>4. Нажмите <span style={{ fontStyle: "italic", fontWeight: "700", color: "#2780fc" }}>`Рассчитать`</span>;</p> */}
          <p style={{marginLeft: "20px"}}>4. Нажмите кнопку <button className={styleConflict.reserveBtnForText}>Рассчитать</button> ;</p>
          {/* <p style={{marginLeft: "20px"}}>5. Если вы ошибочно выбрали даты, нажмите <span style={{ fontStyle: "italic", fontWeight: "700", color: "#f03333" }}>`Очистить`</span>.</p> */}
          <p style={{marginLeft: "20px"}}>5. Если вы ошибочно выбрали даты, нажмите кнопку <button className={styleConflict.closeBtnForText}>Очистить</button> .</p>
          <h4 style={{fontWeight: "400", marginBottom:"0"}}>После этого, если <span style={{fontWeight: "700"}}>выбранные Вами смены были заняты</span>, вы можете <span style={{fontWeight: "700"}}>разрешить эти конфликты</span> путем выбора других смен.</h4>
          <h4 style={{marginTop:"10px"}}>При успешном бронировании вы можете подтвердить его.</h4>
        </div>
      }

      {!showStartDisplayConflict &&
        <div style={{ width: "45vw", margin: "0 auto", padding: "10px 30px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "20px", textAlign: "center" }}>
          {baseOrder.equipment.hasOwnProperty("conflicts") && baseOrder.equipment?.conflicts.length
          ? <p>
              У Вас на данный момент <span style={{ fontWeight: "bold", color: "#f03333" }}>{baseOrder.equipment?.conflicts.length}</span> конфликтов. Нажмите на нужные даты в календаре и разрешите их.
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
        statusCheckboxSelected={statusCheckboxSelected}
        handleSetSelectedConflictDate={handleSetSelectedConflictDate}
      />}
      {/* {!selectedConflictDate &&
        <div className={style.containerTimeline} style={{ width: "45vw", height: "50vh", backgroundColor: "gray", border: "1px solid gray" }}>
          {`Конфликтов ${baseOrder.equipment?.conflicts.length}`}
        </div>} */}
    </>
  );
}
