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
  setItems,
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
  setOrderContent,
  user,
  companies,
  setSelectedCompany,
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
}) {
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isShowConflictNotification, setIsShowConflictNotification] =
    useState(false);
  const [isClickedOnConfirm, setIsClickedOnConfirm] = useState(false);

  useEffect(() => {
    setShowButtonClear(false);
  }, []);

  const back = "< Назад";

  const showNotification = () => {
    setIsShowConflictNotification(true);
    setTimeout(() => {
      setIsShowConflictNotification(false);
    }, 2000);
  };
  const createBook = () => {
    if (isEditMode) {
      setItems((previousUpdate) =>
        previousUpdate.concat(
          copyEditItems.map((el) => {
            el.group = el.deviceGroup;
            return el;
          }) // хз
        )
      );
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
      </div>
      <div className={style.filterContainer}>
        {user.role === "ROLE_MANAGER" && (
          <CompaniesSelect
            companies={companies}
            setSelectedCompany={setSelectedCompany}
            isClickedOnConfirm={isClickedOnConfirm}
          />
        )}
        {/*{!isEditMode && (*/}
        {/*  <div className="selects-block">*/}
        {/*    <FiltersForOrder*/}
        {/*      baseOrder={baseOrder}*/}
        {/*      setBaseOrder={setBaseOrder}*/}
        {/*      isActiveCalendar={isActiveCalendar}*/}
        {/*      setShiftsCount={setShiftsCount}*/}
        {/*      currentDevice={currentDevice}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*)}*/}
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
      {user.role === "ROLE_MANAGER" && (
        <CompaniesSelect
          companies={companies}
          setSelectedCompany={setSelectedCompany}
          isClickedOnConfirm={isClickedOnConfirm}
        />
      )}

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
          <div style={{ color: "red" }}>
            {`У вас осталось ${baseOrder.equipment.conflicts.length} конфликт(ов)`}
          </div>
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
                  if (baseOrder.equipment.conflicts.length > 0) {
                    showNotification();
                    return;
                  }

                  setIsClickedOnConfirm(true);
                  sendNewOrder();
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
