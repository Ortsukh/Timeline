/* eslint-disable */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import FiltersForOrder from "./components/FiltersForOrder";
import PreOrderTable from "./components/PreOrderTable";
import style from "./EditButtonColumn.module.css";
import CompaniesSelect from "../../FilterComponents/CompaniesSelect";
import BookingCalendar from "./components/BookingCalendar";

export default function EditButtonColumn({
  setIsBookingMenu,
  setItemsPreOrder,
  itemsPreOrder,
  copyEditItems,
  setCopyEditItems,
  isEditMode,
  setIsEditMode,
  setCurrentDevice,
  currentDevice,
  setBaseOrder,
  items,
  groups,
  setIsConfirmWindowOpen,
  setShowButtonClear,
  baseOrder,
  selectedDates,
  handleSetSelectedConflictDate,
  generateCalendarEvents,
  setSelectedDates,
  calendarEvent,
  isActiveCalendar,
  handleClear,
  setShowStartDisplayConflict,
  sendNewOrder,
  handleChangeEquipmentBeforeCalculation,
  statusCheckboxSelected,
  setStatusCheckboxSelected,
  selectedGroups,
  setSelectedPreferredDevice,
                                           selectedCompany,
                                           editOrder,
}) {
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isShowConflictNotification, setIsShowConflictNotification] =
    useState(false);

  useEffect(() => {
    setShowButtonClear(false);
  }, []);

  const back = "< Назад";

  const showNotification = (type) => {
    setIsShowConflictNotification(type);
    setTimeout(() => {
      setIsShowConflictNotification(false);
    }, 2000);
  };

  const createBook = () => {
    if (isEditMode) {
      setItemsPreOrder([]);
      setCopyEditItems([]);
      setIsEditMode(false);
    }
    handleClear();
    setIsBookingMenu(false);
    setCurrentDevice([]);
    setShowButtonClear(true);
  };

  const restoreEditItems = () => {
    setItemsPreOrder(
      copyEditItems.map((el) => ({
        ...el,
        itemProps: { style: { background: "gray" } },
      }))
    );
  };

  const getOptionsForSearch = (groups) =>
    groups.map((group) => ({
      value: group.id,
      label: group.title,
    }));

  const handleChangeSelectedStatus = (status) => {
    if (statusCheckboxSelected !== "AUTO") {
    // if (status === "AUTO") {
      setStatusCheckboxSelected(status);
      setSelectedPreferredDevice(null);
    } else {
      // setStatusCheckboxSelected(status);
      setStatusCheckboxSelected("MYSELF");
      setSelectedPreferredDevice(getOptionsForSearch(groups)[groups.length - 1]);
    }
  };
const natification = () => {
  if(isShowConflictNotification === 'company'){
  return  <div style={{ color: "red" }}>
      {`Выберите компанию`}
    </div>
  }
 return <div style={{ color: "red" }}>
    {`У вас осталось ${baseOrder.equipment.conflicts.length} конфликт(ов)`}
  </div>
}

  return (
    <div>
      <div className={style.backButtonBlock}>
        <button type="button" className={style.backButton} onClick={createBook}>
          {back}
        </button>
        <div className="choose-category">
          <span>
            {" "}
            Выбранная категория:{" "}
            <span className="choose-category_item">{selectedGroups}</span>{" "}
          </span>
        </div>
        <div className="choose-category">
          <span>
            {" "}
             Компания:{" "}
            <span className="choose-category_item">{selectedCompany.name}</span>{" "}
          </span>
        </div>
      </div>
      <div className={style.filterContainer}>
         <div className="selects-block">
           <FiltersForOrder
             baseOrder={baseOrder}
             setBaseOrder={setBaseOrder}
             isActiveCalendar={isActiveCalendar}
             setShiftsCount={setShiftsCount}
             currentDevice={currentDevice}
           />
         </div>
        <div className="select-count-box price-count">
          <span className="price-item">
            {`Цена за смену: ${+currentDevice.price}р`}
          </span>
          <span className={style.fullPrice}>
            {`Общая стоимость: `}
            <b>{(isEditMode ? itemsPreOrder.length : baseOrder.preOrders.length) * currentDevice.price}</b>р
          </span>
        </div>
      </div>


      {/*{isEditMode ? (*/}
      {/*  <div className="preOrderTable">*/}
      {/*    <PreOrderTable*/}
      {/*      itemsPreOrder={itemsPreOrder}*/}
      {/*      groups={groups}*/}
      {/*      setItemsPreOrder={setItemsPreOrder}*/}
      {/*      setOrderContent={setOrderContent}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*) : (*/}
        <>
          {!baseOrder.equipment.id  && (
            <>
              <div className="input-count-box">
                <div className="input-checkbox">
                  <input
                    type="checkbox"
                    id="auto"
                    name="auto"
                    checked={statusCheckboxSelected === "AUTO"}
                    onChange={() => handleChangeSelectedStatus("AUTO")}
                  />
                  <label htmlFor="auto">Автоматический выбор</label>
                </div>
                <div className="select-count-box">
                  {/* <div className="input-checkbox">
                    <input
                      type="checkbox"
                      id="myself"
                      name="myself"
                      checked={statusCheckboxSelected === "MYSELF"}
                      onChange={() => handleChangeSelectedStatus("MYSELF")}
                    />
                    <label className="label-checkbox" htmlFor="myself">
                      Выбрать оборудование самостоятельно
                    </label>
                  </div> */}
                  <Select
                    isDisabled={statusCheckboxSelected !== "MYSELF"}
                    className="select-filter"
                    options={getOptionsForSearch(groups)}
                    onChange={handleChangeEquipmentBeforeCalculation}
                    defaultValue={
                      getOptionsForSearch(groups)[groups.length - 1]
                    }
                  />
                </div>
              </div>
            </>
          )}
          <BookingCalendar
            items={items}
            selectedDates={selectedDates}
            currentDevice={currentDevice}
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            setSelectedDates={setSelectedDates}
            calendarEvent={calendarEvent}
            isActiveCalendar={isActiveCalendar}
          />
        </>

      <div>
        {isShowConflictNotification && (
            natification()
        )}

        {/*{isEditMode ? (*/}
        {/*  <div>*/}
        {/*    <button*/}
        {/*      type="button"*/}
        {/*      className="reserved-btn"*/}
        {/*      onClick={() => itemsPreOrder[0] && setIsConfirmWindowOpen(true)}*/}
        {/*    >*/}
        {/*      Применить*/}
        {/*    </button>*/}
        {/*    <button*/}
        {/*      type="button"*/}
        {/*      className={style.closeBtn}*/}
        {/*      onClick={() => restoreEditItems()}*/}
        {/*    >*/}
        {/*      Отменить изменения*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*) : (*/}
          <div className={style.btnCont}>
            {isActiveCalendar ? (
              <button
                type="button"
                className={style.reserveBtn}
                onClick={() => {
                  if (selectedDates.length < 1) {
                    return;
                  }
                  generateCalendarEvents();
                  setShowStartDisplayConflict(false);
                }}
              >
                Рассчитать
              </button>
            ) : (
              <button
                type="button"
                className={style.reserveBtn}
                onClick={() => {
                  if(isEditMode) {
                    // editOrder()
                    setIsConfirmWindowOpen(true)
                    return
                  }
                  if (baseOrder.equipment.conflicts.length > 0) {
                    showNotification('conflicts');
                    return;
                  }
                  // sendNewOrder();
                  setIsConfirmWindowOpen(true)
                }}
              >
                Подтвердить бронирование
              </button>
            )}
            <button
              type="button"
              className={style.closeBtn}
              onClick={() => {
                handleClear();
                setStatusCheckboxSelected("AUTO");
                setShowStartDisplayConflict(true);
              }}
            >
              Очистить
            </button>
          </div>

      </div>
    </div>
  );
}
