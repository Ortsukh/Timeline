import { useEffect, useState } from "react";
import { createOrder, sendEditOrder } from "../../../Api/API";
import { createOrderGrid, formatOrder } from "../../../DataConvertHelper";
import { CheckFormOrder } from "./components/CheckFormOrder";
import { FiltersForOrder } from "./components/FiltersForOrder";
import style from "./EditButtonColumn.module.css";
import ToolsFilter from "../../ToolsFilter";
import { PreOrderTable } from "./components/PreOrderTable";

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
  setCurrentDeviceIndex,
  groups,
  setIsConfirmWindowOpen,
  setOrderContent,
  //! ToolsFilter->
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  onDataFromChild,
  setShowButtonClear,
  showButtonClear,
  //! <-ToolsFilter
}) => {
  const [shiftsCount, setShiftsCount] = useState(1);

  useEffect(() => {
    setShowButtonClear(false);
  }, []);

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
    setShowButtonClear(true);
  };

  const clearAndChangeMode = () => {
    setItemsPreOrder([]);
    setIsBookingMenu(false);
    setCurrentDevice([]);
    setShowButtonClear(true);
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
        <ToolsFilter
          toolNames={toolNames}
          onInputChange={onInputChange}
          clearFilter={clearFilter}
          isClickingOnEmptyFilter={isClickingOnEmptyFilter}
          setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
          onDataFromChild={onDataFromChild}
          showButtonClear={showButtonClear}
          setCurrentDeviceIndex={setCurrentDeviceIndex}
        />
        {!isEditMode && (
          <div className="selects-block">
            <FiltersForOrder
              orderDate={orderDate}
              setOrderDate={setOrderDate}
              setShiftsCount={setShiftsCount}
            />
          </div>
        )}
        <div className={style.editButtons}>
          {!isEditMode && (
            <div className="date-block">
              <CheckFormOrder
                items={items}
                currentDevice={currentDevice}
                orderDate={orderDate}
                shiftsCount={shiftsCount}
                setItemsPreOrder={setItemsPreOrder}
                itemsPreOrder={itemsPreOrder}
              />
            </div>
          )}
          <div className="preOrderTable">
            <PreOrderTable
              itemsPreOrder={itemsPreOrder}
              groups={groups}
              setItemsPreOrder={setItemsPreOrder}
              setOrderContent={setOrderContent}
            />
          </div>
          {isEditMode ? (
            <div>
              <button
                className={"reserved-btn"}
                onClick={() => itemsPreOrder[0] && setIsConfirmWindowOpen(true)}
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
              <button
                className={style.reserveBtn}
                onClick={() => itemsPreOrder[0] && setIsConfirmWindowOpen(true)}
              >
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
