import { createOrder } from "../../../Api/API";
import { createOrderGrid } from "../../../DataConvertHelper";
import style from "./EditButtonColumn.module.css";

export const EditButtonColumn = ({
  setIsBookingMenu,
  setItemsPreOrder,
  itemsPreOrder,
  setUpdate
}) => {
  const back = "< Назад";

  const createBook = () => {
    setIsBookingMenu(false);
  };
  const sendNewOrder = () => {
    if (itemsPreOrder.length < 1) return;
    itemsPreOrder = itemsPreOrder.map((item) => {
      item.group = item.deviceGroup;
      return item;
    });
    const orderItems = createOrderGrid(itemsPreOrder);
    createOrder(orderItems)
      .then((response) => {
        console.log(true);
        setItemsPreOrder([]);
        setIsBookingMenu(false);
        setUpdate((previousUpdate) => !previousUpdate);
        // operAlertWindow("success");
      })
      .catch((errror) => console.log(errror));
  };
  return (
    <>
      <div className={style.containerEditMenu}>
        <div className={style.backButtonBlock}>
          <button className={style.backButton} onClick={createBook}>
            {back}
          </button>
        </div>

        <div className={style.editButtons}>
          <div className={style.editButtonColumn}>
            <p>Button</p>
          </div>

          <div className={style.editButtons}>
            <button className={style.reserveBtn} onClick={sendNewOrder}>
              Забронировать и выйти
            </button>
          </div>

          <div className={style.bookingDateColumn}>
            <p>Date</p>
          </div>
        </div>
      </div>
    </>
  );
};
