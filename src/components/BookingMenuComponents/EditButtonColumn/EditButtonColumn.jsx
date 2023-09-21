import React, { useEffect, useState } from "react";
import Select from "react-select";
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
  selectedDates,
  handleSetSelectedConflictDate,
  generateCalendarEvents,
  setSelectedDates,
  calendarEvent,
  isActiveCalendar,
  handleClear,
  //! <-ToolsFilter,
  setShowStartDisplayConflict,
  sendNewOrder,
  handleChangeEquipment,
  handleChangeEquipmentBeforeCalculation,
  // sendItemFromeTable,
}) {
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isShowConflictNotification, setIsShowConflictNotification] = useState(false);
  const [isClickedOnConfirm, setIsClickedOnConfirm] = useState(false);
  const statusesSelected = {
    auto: "AUTO",
    myself: "MYSELF"
  }
  const [statusCheckboxSelected, setStatusCheckboxSelected] = useState(statusesSelected.auto);
  console.log(currentDevice);
  useEffect(() => {
    setShowButtonClear(false);
  }, []);

  const back = "< Назад";

  const showNotification = () => {
    setIsShowConflictNotification(true);
    setTimeout(() => { setIsShowConflictNotification(false); }, 2000);
  };
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
    handleClear();
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
  const getOptionsForSearch = (groups) => groups.map((group) => ({
    value: group.id,
    label: group.title,
  }));

  const handleChangeSelectedStatus = (status) => {
    if (status === "AUTO") {
      setStatusCheckboxSelected(statusesSelected.auto);
    } else {
      setStatusCheckboxSelected(statusesSelected.myself);
    }
  }

  return (
    <div>
      <div className={style.backButtonBlock}>
        <button type="button" className={style.backButton} onClick={createBook}>
          {back}
        </button>
      </div>
      <div className={style.filterContainer}>
        <ToolsFilter
          isActiveCalendar={isActiveCalendar}
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
          <b>{baseOrder.preOrders.length * currentDevice.price}</b>
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
        <div className="selects-block">

          <FiltersForOrder
            baseOrder={baseOrder}
            setBaseOrder={setBaseOrder}
            isActiveCalendar={isActiveCalendar}
            orderDate={orderDate}
            setOrderDate={setOrderDate}
            setShiftsCount={setShiftsCount}
            currentDevice={currentDevice}
          />
        </div>
      )}
      {/* {baseOrder.equipment && (
      <>
        <div>
          Выбранное оборудование
          {": "}
          {" "}
          {baseOrder.equipment.title}
          {" "}
        </div>

        <span> Выбрать компанию</span>

        <Select
          className="select-filter"
          options={getOptionsForSearch(groups)}
          onChange={handleChangeEquipment}
          value={{ value: baseOrder.equipment.id, label: baseOrder.equipment.title }}
        />
      </>
      )} */}
      {!baseOrder.equipment && (
        <>
          <div>
            <input type="checkbox" id="auto" name="auto"
              checked={statusCheckboxSelected === "AUTO"}
              onChange={() => handleChangeSelectedStatus("AUTO")} />
            <label for="auto">Автоматический выбор</label>
          </div>
          <div>
            <input type="checkbox" id="myself" name="myself"
              checked={statusCheckboxSelected === "MYSELF"}
              onChange={() => handleChangeSelectedStatus("MYSELF")} />
            <label for="myself">Выбрать оборудование самостоятельно</label>
          </div>
          <Select
            isDisabled={statusCheckboxSelected === "AUTO"}
            className="select-filter"
            options={getOptionsForSearch(groups)}
            onChange={handleChangeEquipmentBeforeCalculation}
            defaultValue={getOptionsForSearch(groups)[0]}
          />
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

        <div className="preOrderTable">
          <PreOrderTable
            itemsPreOrder={itemsPreOrder}
            groups={groups}
            setItemsPreOrder={setItemsPreOrder}
            setOrderContent={setOrderContent}
          />
        </div>
        {isShowConflictNotification && (
        <div style={{ color: "red" }}>
          У вас осталось
          {" "}
          {/* {baseOrder.equipment.conflicts.length} */}
          //! ВЕРНУТЬ baseOrder.equipment.conflicts.length !!!!!!!!!!!!!!!!!!!!!
          {" "}
          конфликт(ов)
        </div>
        )}
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

            {isActiveCalendar ? (
              <button
                type="button"
                className={style.reserveBtn}
              // onClick={() => {
              //   console.log("sendItemFromeTable", sendItemFromeTable);
              //   setItemsPreOrder(sendItemFromeTable);
              //   sendNewOrder();
              // }}
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
            // onClick={() => {
            //   console.log("sendItemFromeTable", sendItemFromeTable);
            //   setItemsPreOrder(sendItemFromeTable);
            //   sendNewOrder();
            // }}
                onClick={() => {
                  if (baseOrder.equipment.conflicts.length > 0) {
                    showNotification();
                    return;
                  }

                  setIsClickedOnConfirm(true);
                  console.log(selectedCompany);
                  sendNewOrder();
                  // return itemsPreOrder[0] && selectedCompany && setIsConfirmWindowOpen(true);
                }}
              >
                Подтвердить бронирование
              </button>
            ) }
            <button
              type="button"
              className={style.closeBtn}
              onClick={() => {
                handleClear();
                setShowStartDisplayConflict(true);
              }}
            >
              Очистить
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
