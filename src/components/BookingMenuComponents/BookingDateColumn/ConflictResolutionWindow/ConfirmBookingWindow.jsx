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
  return (
    <>
      {showStartDisplayConflict &&
        <div className={style.containerTimeline} style={{ width: "45vw", height: "50vh", backgroundColor: "gray", zIndex: "2", border: "1px solid gray" }}>
          
        </div>
      }

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

      {!selectedConflictDate &&
        <div className={style.containerTimeline} style={{ width: "45vw", height: "50vh", backgroundColor: "gray", border: "1px solid gray" }}>
          {`Конфликтов ${baseOrder.equipment?.conflicts.length}`}
        </div>}
    </>
  );
}
