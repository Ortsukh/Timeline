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
  
}) => {
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [updatedItems, setUpdatedItems] = useState(items);
  const [copyEditItems, setCopyEditItems] = useState([]);

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
          />
        </div>

        <div className={style.bookingDateColumn}>
          <BookingTimeline
            setCurrentDevice={setCurrentDevice}

          currentDevice={currentDevice}
            selectedGroups={selectedGroups}
            groups={groups}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            toolsCount={toolsCount}
            isActiveDate={isActiveDate}
            orderDate={orderDate}
            openBookingWindow={openBookingWindow}
            items={items}
            clickOnEmptySpace={clickOnEmptySpace}
            clickOnItem={clickOnItem}
          />
        </div>
      </div>
    </>
  );
};
