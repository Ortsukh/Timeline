import React, { useEffect, useState } from "react";
import FiltersForOrder from "./components/FiltersForOrder";
import PreOrderTable from "./components/PreOrderTable";
import style from "./EditButtonColumn.module.css";
import ToolsFilter from "../../FilterComponents/ToolsFilter";
import CompaniesSelect from "../../FilterComponents/CompaniesSelect";
import BookingCalendar from "./components/BookingCalendar";
import TimeShift from "../../FilterComponents/timeShiftFilter";

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
  orderDate,
  setOrderDate,
  items,
  setCurrentDeviceIndex,
  groups,
  setIsConfirmWindowOpen,
  setOrderContent,
  user,
  companies,
  setSelectedCompany,
  selectedCompany,
  //! ToolsFilter->
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  setShowButtonClear,
  showButtonClear,
  baseOrder,
  handleSetSelectedConflictDate,
  generateCalendarEvents,
  setSelectedDates,
  calendarEvent,
  isActiveCalendar,
  handleClear,
  //! <-ToolsFilter,
  setShowStartDisplayConflict,
  // sendNewOrder,
  // sendItemFromeTable,
}) {
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isClickedOnConfirm, setIsClickedOnConfirm] = useState(false);
  console.log(currentDevice);
  useEffect(() => {
    setShowButtonClear(false);
  }, []);

  const back = "< Назад";

  const createBook = () => {
    if (isEditMode) {
      setItems((previousUpdate) => previousUpdate.concat(
        copyEditItems.map((el) => {
          el.group = el.deviceGroup;
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
      <div className={style.filterContainer}>
        <ToolsFilter
          toolNames={toolNames}
          onInputChange={onInputChange}
          clearFilter={clearFilter}
          isClickingOnEmptyFilter={isClickingOnEmptyFilter}
          setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
          showButtonClear={showButtonClear}
          setCurrentDeviceIndex={setCurrentDeviceIndex}
        />
        <span className={style.fullPrice}>
          Общая стоимость:
          {" "}
          <b>{itemsPreOrder.length * currentDevice.price}</b>
          р
        </span>
      </div>
      {user.role === "ROLE_MANAGER" && (
        <CompaniesSelect
          companies={companies}
          setSelectedCompany={setSelectedCompany}
          isClickedOnConfirm={isClickedOnConfirm}
        />
      )}
      {!isEditMode && (
        <>
          <div className="selects-block">
          <TimeShift
              currentDevice={currentDevice}
              setBaseOrder={setBaseOrder}
            />
            <FiltersForOrder
              orderDate={orderDate}
              setOrderDate={setOrderDate}
              setShiftsCount={setShiftsCount}
              currentDevice={currentDevice}
            />
          </div>
        </>
      )}
      <BookingCalendar
        items={items}
        currentDevice={currentDevice}
        handleSetSelectedConflictDate={handleSetSelectedConflictDate}
        setSelectedDates={setSelectedDates}
        calendarEvent={calendarEvent}
        isActiveCalendar={isActiveCalendar}
      />
      <div>
        {/* {!isEditMode && ( */}
        {/* <div className="date-block"> */}
        {/*   <CheckFormOrder */}
        {/*     items={items} */}
        {/*     currentDevice={currentDevice} */}
        {/*     orderDate={orderDate} */}
        {/*     shiftsCount={shiftsCount} */}
        {/*     setItemsPreOrder={setItemsPreOrder} */}
        {/*     itemsPreOrder={itemsPreOrder} */}
        {/*   /> */}
        {/* </div> */}
        {/* )} */}
        {baseOrder.equipment && (
          <>
            <div>Выбранное оборудование</div>
            {": "}
            <div>{baseOrder.equipment.title}</div>
          </>
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
          <div className={style.btnCont}>
            {/* <button */}
            {/*  type="button" */}
            {/*  className={style.reserveBtn} */}
            {/*  // onClick={() => { */}
            {/*  //   console.log("sendItemFromeTable", sendItemFromeTable); */}
            {/*  //   setItemsPreOrder(sendItemFromeTable); */}
            {/*  //   sendNewOrder(); */}
            {/*  // }} */}
            {/*  onClick={() => { */}
            {/*    setIsClickedOnConfirm(true); */}
            {/*    console.log(selectedCompany); */}
            {/*    // return itemsPreOrder[0] && selectedCompany && setIsConfirmWindowOpen(true); */}
            {/*  }} */}
            {/* > */}
            {/*  Подтвердить бронирование */}
            {/* </button> */}
            <button
              type="button"
              className={style.reserveBtn}
              // onClick={() => {
              //   console.log("sendItemFromeTable", sendItemFromeTable);
              //   setItemsPreOrder(sendItemFromeTable);
              //   sendNewOrder();
              // }}
              onClick={() => {
                generateCalendarEvents();
                setShowStartDisplayConflict(false);
              }}
            >
              Рассчитать
            </button>
            <button
              type="button"
              className={style.closeBtn}
              onClick={handleClear}
            >
              Очистить
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
