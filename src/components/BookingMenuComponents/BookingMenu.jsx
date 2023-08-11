import { BookingTimeline } from "./BookingDateColumn/BookingTimeline";
import style from "./BookingMenu.module.css";
import { EditButtonColumn } from "./EditButtonColumn/EditButtonColumn";

export const BookingMenu = ({
  setIsBookingMenu,
  selectedGroups,

  groups,
  toolsCount,
  isActiveDate,
  orderDate,
  openBookingWindow,
  items,
  clickOnEmptySpace,
  clickOnItem,
}) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn setIsBookingMenu={setIsBookingMenu} />
        </div>

        <div className={style.bookingDateColumn}>
          <BookingTimeline
            selectedGroups={selectedGroups}
            groups={groups}
            
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
