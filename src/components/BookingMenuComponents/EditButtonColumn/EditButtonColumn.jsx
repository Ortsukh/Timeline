import { useState } from "react";
import { createOrder, sendEditOrder } from "../../../Api/API";
import { createOrderGrid, formatOrder } from "../../../DataConvertHelper";
import style from "./EditButtonColumn.module.css";

export const EditButtonColumn = ({
  setIsBookingMenu,
  setItemsPreOrder,
  itemsPreOrder,
  setUpdate,
  setItems,
  setCurrentDevice
}) => {
  const [blockCreateButton, setBlockCreateButton] = useState(false);
  const [copyEditItems, setCopyEditItems] = useState([]);


  const back = "< Назад";

  const createBook = () => {
    setIsBookingMenu(false);
    setCurrentDevice([]) // очистить текущий выбор, для верноного отображения при клике на "Добавить новый"
  };

  const clearAndChangeMode = () => {
    setItemsPreOrder([]);
    setIsBookingMenu(false);
  }

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

  const editOrder = () => {
    if (itemsPreOrder.length < 1) return;
    const orderItem = itemsPreOrder[0];
    const orderItemsGrid = createOrderGrid(itemsPreOrder);
    console.log(orderItemsGrid);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: orderItem.rentOrderId,
        company: orderItem.company,
      },
      status: orderItem.status,
      equipmentItems: dateIntervals,
    };

    setBlockCreateButton(true);

    sendEditOrder(editedOrder)
      .then(() => {
        setUpdate((previousUpdate) => !previousUpdate);
        setItemsPreOrder([]);
        setCopyEditItems([]);
        // operAlertWindow("success");
        // setIsEditMode(false);
      })
      // .catch(() => operAlertWindow("error"));
  };
  const restoreEditItems = () => {
    setItemsPreOrder(
      copyEditItems.map((el) => {
        return {
          ...el,
          itemProps: { style: { background: "gray" } },
        };
      })
    );
  };

  const restoreAndCloseEditMode = () => {
    setItems((previousUpdate) => previousUpdate.concat(copyEditItems));
    setItemsPreOrder([]);
    setCopyEditItems([]);
    // setIsEditMode((previousUpdate) => !previousUpdate);
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
          <button className="reserved-btn" onClick={() => clearAndChangeMode()}>
            Сбросить и Закрыть
          </button>

          <div>
         <button
            disabled={blockCreateButton}
            className={
              blockCreateButton ? "reserved-btn-locked" : "reserved-btn"
            }
            onClick={() => editOrder()}
          >
            Применить
          </button>
          <button className="reserved-btn" onClick={() => restoreEditItems()}>
            Отменить
          </button>
          <button
            className="reserved-btn"
            onClick={() => restoreAndCloseEditMode()}
          >
            Отменить и закрыть
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
