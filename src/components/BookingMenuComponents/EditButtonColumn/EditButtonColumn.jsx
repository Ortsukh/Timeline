import React, { useState } from "react";
import Select from "react-select";
import FiltersForOrder from "./components/FiltersForOrder";
import style from "./EditButtonColumn.module.css";
import BookingCalendar from "./components/BookingCalendar";

export default function EditButtonColumn({
  setIsBookingMenu,
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
  setSelectedDates,
  handleSetSelectedConflictDate,
  generateCalendarEvents,
  calendarEvent,
  isActiveCalendar,
  handleClear,
  setShowStartDisplayConflict,
  handleChangeEquipmentBeforeCalculation,
  statusCheckboxSelected,
  setStatusCheckboxSelected,
  selectedGroups,
  setSelectedPreferredDevice,
  selectedCompany,
  user,
}) {
  // eslint-disable-next-line no-unused-vars
  const [shiftsCount, setShiftsCount] = useState(1);
  const [isShowConflictNotification, setIsShowConflictNotification] = useState(false);

  const back = "< Назад";

  const showNotification = (type) => {
    setIsShowConflictNotification(type);
    setTimeout(() => {
      setIsShowConflictNotification(false);
    }, 2000);
  };

  const createBook = () => {
    if (isEditMode) {
      setIsEditMode(false);
    }
    handleClear();
    setIsBookingMenu(false);
    setCurrentDevice([]);
    setShowButtonClear(true);
  };

  const getOptionsForSearch = (allGroups) => allGroups.map((group) => ({
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
      setSelectedPreferredDevice(
        getOptionsForSearch(groups)[groups.length - 1],
      );
    }
  };
  const notification = () => {
    if (isShowConflictNotification === "company") {
      return <div style={{ color: "red" }}>Выберите компанию</div>;
    }
    return (
      <div style={{ color: "red" }}>
        {`У вас осталось ${baseOrder.equipment.conflicts.length} конфликт(ов)`}
      </div>
    );
  };

  return (
    <div>
      <div className={style.backButtonBlock}>
        <button type="button" className={style.backButton} onClick={createBook}>
          {back}
        </button>
        <div className="category-count-box">
          <div className="choose-category">
            <span>
              {" "}
              Выбранная категория:
              {" "}
              <span className="choose-category_item">
                {selectedGroups}
              </span>
              {" "}
            </span>
          </div>
          <div className="choose-category">
            <span>
              {" "}
              Компания:
              {" "}
              <span className="choose-category_item">
                {selectedCompany.name}
              </span>
              {" "}
            </span>
          </div>
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
            {"Общая стоимость: "}
            <b>
              {(baseOrder.preOrders.length) * currentDevice.price}
            </b>
            р
          </span>
        </div>
      </div>
      {!baseOrder.equipment.id && (
      <div className="input-count-box">
        <label htmlFor="auto" className="input-checkbox">
          <input
            type="checkbox"
            id="auto"
            name="auto"
            checked={statusCheckboxSelected === "AUTO"}
            onChange={() => handleChangeSelectedStatus("AUTO")}
          />
          Автоматический выбор
        </label>
        <div className="select-count-box">
          <Select
            isDisabled={statusCheckboxSelected !== "MYSELF"}
            className="select-filter"
            options={getOptionsForSearch(groups)}
            onChange={handleChangeEquipmentBeforeCalculation}
            defaultValue={getOptionsForSearch(groups)[groups.length - 1]}
          />
        </div>
      </div>
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
        {isShowConflictNotification && notification()}
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
            <div className={style.btnContEdit}>
              {user.role === "ROLE_MANAGER" && isEditMode ? (
                <>
                  <button
                    type="button"
                    className={style.reserveBtn}
                    onClick={() => {
                      if (isEditMode) {
                        // editOrder()
                        setIsConfirmWindowOpen("accepted");
                        return;
                      }
                      if (baseOrder.equipment.conflicts.length > 0) {
                        showNotification("conflicts");
                        return;
                      }
                      // sendNewOrder();
                      setIsConfirmWindowOpen(true);
                    }}
                  >
                    Подтвердить бронирование
                  </button>
                  <button
                    type="button"
                    className={style.reserveBtn}
                    onClick={() => {
                      if (isEditMode) {
                        // editOrder()
                        setIsConfirmWindowOpen("pending");
                        return;
                      }
                      if (baseOrder.equipment.conflicts.length > 0) {
                        showNotification("conflicts");
                        return;
                      }
                      // sendNewOrder();
                      setIsConfirmWindowOpen(true);
                    }}
                  >
                    Сохранить
                  </button>
                </>
              ) : (
                <div>
                  {user.role === "ROLE_MANAGER" ? (
                    <button
                      type="button"
                      className={style.reserveBtn}
                      onClick={() => {
                        if (isEditMode) {
                          // editOrder()
                          setIsConfirmWindowOpen(true);
                          return;
                        }
                        if (baseOrder.equipment.conflicts.length > 0) {
                          showNotification("conflicts");
                          return;
                        }
                        // sendNewOrder();
                        setIsConfirmWindowOpen("accepted");
                      }}
                    >
                      Сохранить
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={style.reserveBtn}
                      onClick={() => {
                        if (isEditMode) {
                          // editOrder()
                          setIsConfirmWindowOpen(true);
                          return;
                        }
                        if (baseOrder.equipment.conflicts.length > 0) {
                          showNotification("conflicts");
                          return;
                        }
                        // sendNewOrder();
                        setIsConfirmWindowOpen("accepted");
                      }}
                    >
                      Сохранить и отправить заявку
                    </button>
                  )}
                </div>
              )}
            </div>
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
