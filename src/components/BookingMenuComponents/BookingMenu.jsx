import { useEffect, useState } from "react";
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
  setCurrentDevice
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
          />
        </div>

        <div className={style.bookingDateColumn}>
          <BookingTimeline
            selectedGroups={selectedGroups}
            groups={groups}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            toolsCount={toolsCount}
            isActiveDate={isActiveDate}
            orderDate={orderDate}
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            openBookingWindow={openBookingWindow}
            setCopyEditItems={setCopyEditItems}
            setUpdatedItems={setUpdatedItems}
            items={updatedItems}
            clickOnEmptySpace={clickOnEmptySpace}
            clickOnItem={clickOnItem}
            currentDevice={currentDevice}
            setCurrentDevice={setCurrentDevice}
          />
        </div>
      </div>
    </>
  );
};
