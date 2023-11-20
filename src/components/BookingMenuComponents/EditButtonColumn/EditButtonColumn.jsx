import React, { useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import FiltersForOrder from "./components/FiltersForOrder";
import style from "./EditButtonColumn.module.css";
import BookingCalendar from "./components/BookingCalendar";
import buttonTitleConstants from "../../../constants/buttonTitleConstants";
import ToolsFilter from "../../FilterComponents/ToolsFilter";
import CompaniesSelect from "../../FilterComponents/CompaniesSelect";
import BackButton from "../../Button/BackButton";

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
  setSelectedPreferredDevice,
  selectedCompany,
  user,
  deactivatedCell,
  addAnotherDay,
  selectedConflictDate, isFromDashboard,
  filterProps,
  handleConfirmChangesBM,
  handleCancelChangesBM,
  isDayEditing,
}) {
  const [isShowConflictNotification, setIsShowConflictNotification] = useState("");
  const back = buttonTitleConstants.BACK;
  const isViewMode = window.location.search.substring(1).split("&").find((query) => query.startsWith("view"))?.split("=")[1];

  const showNotification = (type) => {
    setIsShowConflictNotification(type);
    setTimeout(() => {
      setIsShowConflictNotification("");
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
      return <div style={{ color: "red" }}>Выберите арендатора</div>;
    }
    if (isShowConflictNotification === "shift") {
      return <div style={{ color: "red" }}>Выберите смену</div>;
    }
    return (
      <div style={{ color: "red" }}>
        {`У вас осталось ${baseOrder.equipment.countConflicts} конфликт(ов)`}
      </div>
    );
  };
  return (
    <div>
      <div className={style.backButtonBlock}>
        {isFromDashboard ? <BackButton /> : (
          <button type="button" className={style.backButton} onClick={createBook}>
            {back}
          </button>
        )}
        <div className="category-count-box">
          { isFromDashboard && !isEditMode
            ? (
              <div className="sort-box_item">
                <ToolsFilter
                  toolNames={filterProps.mapToolsNames()}
                  onInputChange={filterProps.handleInputChange}
                  clearFilter={() => {}}
                  isClickingOnEmptyFilter={filterProps.isClickingOnEmptyFilter}
                  setIsClickingOnEmptyFilter={filterProps.setIsClickingOnEmptyFilter}
                  showButtonClear={filterProps.showButtonClear}
                  isFromDashboard={isFromDashboard}
                  isActiveCalendar={isActiveCalendar}
                  currentDevice={currentDevice}
                />
              </div>
            )
            : (
              <div className="choose-category">
                <span>
                  {" "}
                  Выбранная категория:
                  {" "}
                  <span className="choose-category_item">
                    { currentDevice.category}
                  </span>
                  {" "}
                </span>
              </div>
            )}
          {isFromDashboard && user.role === "ROLE_MANAGER" && !isEditMode ? (
            <div className="sort-box_item">
              <CompaniesSelect
                selectedCompany={selectedCompany}
                companies={filterProps.companies}
                setSelectedCompany={filterProps.setSelectedCompany}
                isClickedOnNew={filterProps.isClickedOnNew}
                isFromDashboard={isFromDashboard}
                isActiveCalendar={isActiveCalendar}
              />
            </div>

          )
            : (
              <div className="choose-category">

                <span>
                  {" "}
                  Арендатор:
                  {" "}
                  <span className="choose-category_item">
                    {selectedCompany ? selectedCompany.name : "name"}
                  </span>
                  {" "}
                </span>

              </div>
            )}
        </div>
      </div>
      <div className={style.filterContainer}>
        <div className="selects-block" style={{ maxWidth: 510 }}>
          {currentDevice
            ? (
              <FiltersForOrder
                baseOrder={baseOrder}
                setBaseOrder={setBaseOrder}
                isActiveCalendar={isActiveCalendar}
                currentDevice={currentDevice}
              />
            ) : null}
        </div>
        <div className="select-count-box price-count">
          <span className="price-item">
            {`Цена за смену: ${currentDevice ? +currentDevice.price : 0}р`}
          </span>
          <span className={style.fullPrice}>
            {"Общая стоимость: "}
            <b>
              {(baseOrder.preOrders.length) * (currentDevice ? +currentDevice.price : 0)}
            </b>
            р
          </span>
        </div>
      </div>
      {!baseOrder.equipment.id && (
      <div className="input-count-box">
        <span style={{ marginTop: "15px" }}>Подбираемое оборудование:</span>
        <div>
          <div className="select-count-box">
            <Select
              isDisabled={statusCheckboxSelected !== "MYSELF"}
              className="select-filter"
              options={getOptionsForSearch(groups)}
              onChange={handleChangeEquipmentBeforeCalculation}
              defaultValue={getOptionsForSearch(groups)[groups.length - 1]}
            />
          </div>
          <label
            htmlFor="auto"
            className="input-checkbox"
            style={{ marginTop: "5px" }}
            title="Автоматически подобрать свободное оборудование"
          >
            <input
              type="checkbox"
              id="auto"
              name="auto"
              checked={statusCheckboxSelected === "AUTO"}
              onChange={() => handleChangeSelectedStatus("AUTO")}
            />
            Авто
          </label>
        </div>
      </div>
      )}
      {currentDevice
        ? (
          <BookingCalendar
            items={items}
            selectedDates={selectedDates}
            currentDevice={currentDevice}
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            setSelectedDates={setSelectedDates}
            calendarEvent={calendarEvent}
            isActiveCalendar={isActiveCalendar}
            deactivatedCell={deactivatedCell}
            addAnotherDay={addAnotherDay}
            selectedConflictDate={selectedConflictDate}
            isEditMode={isEditMode}
            groups={groups.filter((group) => currentDevice.category === group.category)}
            isDayEditing={isDayEditing}
            handleCancelChangesBM={handleCancelChangesBM}
            handleConfirmChangesBM={handleConfirmChangesBM}
          />
        ) : null}
      <div>
        {isShowConflictNotification && notification()}
        {!isViewMode && (
        <div className={style.btnCont}>
          {isActiveCalendar ? (
            <button
              type="button"
              className={style.reserveBtn}
              onClick={() => {
                if (!selectedCompany) {
                  showNotification("company");
                  return;
                }
                if (selectedDates.length < 1) {
                  return;
                }
                if (baseOrder.shiftTime.length < 1) {
                  showNotification("shift");
                  return;
                }

                generateCalendarEvents();
                setShowStartDisplayConflict(false);
              }}
            >
              {buttonTitleConstants.CALCULATE}
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
                      if (baseOrder.equipment.countConflicts > 0) {
                        showNotification("conflicts");
                        return;
                      }
                      // sendNewOrder();
                      setIsConfirmWindowOpen(true);
                    }}
                  >
                    {buttonTitleConstants.CONFIRM_ORDER}
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
                      if (baseOrder.equipment.countConflicts > 0) {
                        showNotification("conflicts");
                        return;
                      }
                      // sendNewOrder();
                      setIsConfirmWindowOpen(true);
                    }}
                  >
                    {buttonTitleConstants.SAVE}
                  </button>
                </>
              ) : (
                <div>
                  {user.role === "ROLE_MANAGER" ? (
                    <button
                      type="button"
                      className={style.reserveBtn}
                      onClick={() => {
                        console.log("click", isDayEditing);
                        if (isDayEditing) {
                          Swal.fire({
                            title: "У вас остались неподтверждённые изменения. Желаете их сохранить?",
                            showDenyButton: true,
                            showCancelButton: false,
                            confirmButtonText: buttonTitleConstants.CONFIRM_CHANGES,
                            denyButtonText: buttonTitleConstants.CANCEL_CHANGES,
                            didClose: () => {
                              if (baseOrder.equipment.countConflicts > 0) {
                                showNotification("conflicts");
                                return;
                              }
                              setIsConfirmWindowOpen("accepted");
                            },
                          }).then((result) => {
                            if (result.isConfirmed) {
                              handleConfirmChangesBM();
                            } else if (result.isDenied) {
                              handleCancelChangesBM();
                            }
                          });
                          return;
                        }
                        if (baseOrder.equipment.countConflicts > 0) {
                          showNotification("conflicts");
                          return;
                        }
                        setIsConfirmWindowOpen("accepted");
                      }}
                    >
                      {buttonTitleConstants.CONFIRM_ORDER}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={style.reserveBtn}
                      onClick={() => {
                        if (isEditMode) {
                          // editOrder()
                          setIsConfirmWindowOpen("pending");
                          return;
                        }
                        if (baseOrder.equipment.countConflicts > 0) {
                          showNotification("conflicts");
                          return;
                        }

                        // sendNewOrder();
                        setIsConfirmWindowOpen("pending");
                      }}
                    >
                      {buttonTitleConstants.SAVE_ORDER}
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
            {buttonTitleConstants.CLEAN}
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
