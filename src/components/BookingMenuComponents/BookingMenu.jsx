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
}) => {
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
          setUpdate={setUpdate}
            setIsBookingMenu={setIsBookingMenu}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
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
