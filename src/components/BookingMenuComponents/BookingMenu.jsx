import moment from "moment";
import { useState } from "react";
import { BookingTimeline } from "./BookingDateColumn/BookingTimeline";
import style from "./BookingMenu.module.css";
import { EditButtonColumn } from "./EditButtonColumn/EditButtonColumn";

export const BookingMenu = ({
  setIsBookingMenu,
  selectedGroups,
  setUpdate,
  groups,
  toolsCount,
  isActiveDate,
  orderDate,
  openBookingWindow,
  items,
  clickOnEmptySpace,
  clickOnItem,
  editOrderData,
  isEditMode,
  currentDevice,
  setCurrentDevice,
  setIsEditMode,
  operAlertWindow,
  //! ToolsFilter->
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  setShowButtonClear,
  showButtonClear,
  //! <-ToolsFilter
}) => {
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [updatedItems, setUpdatedItems] = useState(items);
  const [copyEditItems, setCopyEditItems] = useState([]);
  const [orderDatePlanning, setOrderDatePlanning] = useState({
    selection1: {
      startDate: new Date(),

      endDate: new Date(moment().add(2, "days").valueOf()),
      key: "selection1",
    },
  });
  console.log("updatedItems", updatedItems, itemsPreOrder);
  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
            setUpdate={setUpdate}
            setIsBookingMenu={setIsBookingMenu}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            setItems={setUpdatedItems}
            copyEditItems={copyEditItems}
            setCopyEditItems={setCopyEditItems}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            operAlertWindow={operAlertWindow}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            items={updatedItems}
            orderDate={orderDatePlanning}
            setOrderDate={setOrderDatePlanning}
            //! ToolsFilter->
            toolNames={toolNames}
            onInputChange={onInputChange}
            clearFilter={clearFilter}
            isClickingOnEmptyFilter={isClickingOnEmptyFilter}
            setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
            selectedGroups={selectedGroups}
            setShowButtonClear={setShowButtonClear}
            showButtonClear={showButtonClear}
            //! <-ToolsFilter
          />
        </div>

        <div className={style.bookingDateColumn}>
          <BookingTimeline
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            selectedGroups={selectedGroups}
            groups={groups}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            setUpdatedItems={setUpdatedItems}
            setCopyEditItems ={setCopyEditItems }
            toolsCount={toolsCount}
            isActiveDate={isActiveDate}
            orderDate={orderDate}
            openBookingWindow={openBookingWindow}
            items={items}
            clickOnEmptySpace={clickOnEmptySpace}
            clickOnItem={clickOnItem}
            orderDatePlanning={orderDatePlanning}
          />
        </div>
      </div>
    </>
  );
};
