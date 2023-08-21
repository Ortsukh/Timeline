import React, { useEffect, useState } from "react";
import CheckFormOrder from "./components/CheckFormOrder";
import FiltersForOrder from "./components/FiltersForOrder";
import PreOrderTable from "./components/PreOrderTable";
import style from "./EditButtonColumn.module.css";
import ToolsFilter from "../../FilterComponents/ToolsFilter";

export default function EditButtonColumn({
  setIsBookingMenu,
  setItemsPreOrder,
  itemsPreOrder,
  setItems,
  copyEditItems,
  setCopyEditItems,
  isEditMode,
  setIsEditMode,
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
  setShowButtonClear,
  showButtonClear,
  //! <-ToolsFilter
}) {
  const [shiftsCount, setShiftsCount] = useState(1);

  useEffect(() => {
    setShowButtonClear(false);
  }, []);

  const back = "< Назад";

  const createBook = () => {
    if (isEditMode) {
      setItems((previousUpdate) => previousUpdate.concat(
        copyEditItems.map((el) => {
          (el.group = el.deviceGroup);
          return el;
        }), // хз
      ));
      setItemsPreOrder([]);
      setCopyEditItems([]);
      setIsEditMode(false);
    }
    setIsBookingMenu(false);
    setCurrentDevice([]);
    // очистить текущий выбор, для верноного отображения при клике на "Добавить новый"
    setShowButtonClear(true);
  };

  const restoreEditItems = () => {
    setItemsPreOrder(
      copyEditItems.map((el) => ({
        ...el,
        itemProps: { style: { background: "gray" } },
      })),
    );
  };

  return (
    <div>
      <div className={style.backButtonBlock}>
        <button type="button" className={style.backButton} onClick={createBook}>
          {back}
        </button>
      </div>
      <ToolsFilter
        toolNames={toolNames}
        onInputChange={onInputChange}
        clearFilter={clearFilter}
        isClickingOnEmptyFilter={isClickingOnEmptyFilter}
        setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
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
      <div>
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
              type="button"
              className="reserved-btn"
              onClick={() => itemsPreOrder[0] && setIsConfirmWindowOpen(true)}
            >
              Применить
            </button>
            <button
              type="button"
              className={style.closeBtn}
              onClick={() => restoreEditItems()}
            >
              Отменить изменения
            </button>
          </div>
        ) : (
          <div>
            <button
              type="button"
              className={style.reserveBtn}
              onClick={() => itemsPreOrder[0] && setIsConfirmWindowOpen(true)}
            >
              Подтвердить бронирование
            </button>

          </div>
        )}
      </div>
    </div>
  );
}
