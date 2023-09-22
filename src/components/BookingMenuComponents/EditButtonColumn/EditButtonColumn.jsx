/* eslint-disable */

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
                                           selectedGroups,
  setShowStartDisplayConflict,
  sendNewOrder,
  handleChangeEquipment,
  handleChangeEquipmentBeforeCalculation,
  statusCheckboxSelected,
  setStatusCheckboxSelected,
  // sendItemFromeTable,
}) {
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isShowConflictNotification, setIsShowConflictNotification] = useState(false);
  const [isClickedOnConfirm, setIsClickedOnConfirm] = useState(false);

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
      setStatusCheckboxSelected(status);
    } else {
      setStatusCheckboxSelected(status);
    }
  }

  return (
    <div>
      <div className={style.backButtonBlock}>
        <button type="button" className={style.backButton} onClick={createBook}>
          {back}
        </button>
        <div className="choose-category">
          <span> Выбранная категория: <span className="choose-category_item">{selectedGroups}</span> </span>
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
        <div className="select-count-box price-count">
          <span className="price-item">
            Цена за смену:
            {" "}
            {+currentDevice.price}
            р
          </span>
          <span className={style.fullPrice}>
            Общая стоимость:
            {" "}
            <b>{baseOrder.preOrders.length * currentDevice.price}</b>
            р
          </span>
        </div>
      </div>
     
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
          <div className="input-count-box">
            <div className="input-checkbox">
              <input type="checkbox" id="auto" name="auto"
                checked={statusCheckboxSelected === "AUTO"}
                onChange={() => handleChangeSelectedStatus("AUTO")} />
              <label htmlFor="auto">Автоматический выбор</label>
            </div>
            <div className="select-count-box">
              <div className="input-checkbox">
                <input type="checkbox" id="myself" name="myself"
                  checked={statusCheckboxSelected === "MYSELF"}
                  onChange={() => handleChangeSelectedStatus("MYSELF")} />
                <label className="label-checkbox" htmlFor="myself">Выбрать оборудование самостоятельно</label>
              </div>
              <Select
                isDisabled={statusCheckboxSelected !== "MYSELF"}
                className="select-filter"
                options={getOptionsForSearch(groups)}
                onChange={handleChangeEquipmentBeforeCalculation}
                defaultValue={getOptionsForSearch(groups)[groups.length - 1]}
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
           {baseOrder.equipment.conflicts.length}
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
