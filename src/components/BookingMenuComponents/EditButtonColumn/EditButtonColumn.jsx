import { useState } from "react";
import { createOrder, sendEditOrder } from "../../../Api/API";
import { createOrderGrid, formatOrder } from "../../../DataConvertHelper";
import { CheckFormOrder } from "./components/CheckFormOrder";
import { FiltersForOrder } from "./components/FiltersForOrder";
import style from "./EditButtonColumn.module.css";

export const EditButtonColumn = ({
  setIsBookingMenu,
  setItemsPreOrder,
  itemsPreOrder,
  setUpdate,
  setItems,
  copyEditItems,
  setCopyEditItems,
  isEditMode,
  setIsEditMode,
  operAlertWindow,
  setCurrentDevice,
  currentDevice,
  orderDate,
  setOrderDate,
  items,
}) => {
  const [blockCreateButton, setBlockCreateButton] = useState(false);

  const [shiftsCount, setShiftsCount] = useState(1);
  const back = "< Назад";

  const createBook = () => {
    if (isEditMode) {
      setItems((previousUpdate) =>
        previousUpdate.concat(
          copyEditItems.map((item) => (item.group = item.deviceGroup))
        )
      );
      setItemsPreOrder([]);
      setCopyEditItems([]);
      setIsEditMode(false);
    }
    setIsBookingMenu(false);
    setCurrentDevice([]); // очистить текущий выбор, для верноного отображения при клике на "Добавить новый"
  };

  const clearAndChangeMode = () => {
    setItemsPreOrder([]);
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
        operAlertWindow("success");
        setItemsPreOrder([]);
        setIsBookingMenu(false);
        setUpdate((previousUpdate) => !previousUpdate);
      })
      .catch(operAlertWindow("error"));
  };

  const editOrder = () => {
    if (itemsPreOrder.length < 1) return;
    itemsPreOrder = itemsPreOrder.map((item) => {
      item.group = item.deviceGroup;
      return item;
    });
    const orderItem = copyEditItems[0];
    const orderItemsGrid = createOrderGrid(itemsPreOrder);
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
        operAlertWindow("success");
        setUpdate((previousUpdate) => !previousUpdate);
        setItemsPreOrder([]);
        setCopyEditItems([]);
      })
      .catch(() => operAlertWindow("error"));
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

  return (
    <>
      <div className={style.containerEditMenu}>
        <div className={style.backButtonBlock}>
          <button className={style.backButton} onClick={createBook}>
            {back}
          </button>
        </div>
        <div className="selects-block">
          <FiltersForOrder
            orderDate={orderDate}
            setOrderDate={setOrderDate}
            setShiftsCount={setShiftsCount}
          />
        </div>
        <div className={style.editButtons}>
          <div className={style.selects}>
            <div className={style.editButtonColumn}>
              <p>Button</p>
            </div>
            <div className={style.bookingDateColumn}>
              <p>Date</p>
            </div>
          </div>
          <div className="date-block">
            <CheckFormOrder
              items={items}
              currentDevice={currentDevice}
              orderDate={orderDate}
              shiftsCount={shiftsCount}
              setItemsPreOrder={setItemsPreOrder}
              itemsPreOrder= {itemsPreOrder}
            />
          </div>
          {isEditMode ? (
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
              <button
                className={style.closeBtn}
                onClick={() => restoreEditItems()}
              >
                Отменить
              </button>
            </div>
          ) : (
            <div className={style.editButtons}>
              <button className={style.reserveBtn} onClick={sendNewOrder}>
                Забронировать и выйти
              </button>
              <button
                className={style.closeBtn}
                onClick={() => clearAndChangeMode()}
              >
                Сбросить и Закрыть
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
