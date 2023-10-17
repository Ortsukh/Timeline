/* eslint-disable max-len */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createOrder, sendEditOrder } from "../../Api/API";
import {
  addGrid,
  createOrderGrid,
  formatOrder,
  groupByDateItems,
} from "../../common/DataConvertHelper";
import ConfirmWindow from "../Popup/ConfirmWindow";
import ConfirmBookingWindow from "./BookingDateColumn/ConflictResolutionWindow/ConfirmBookingWindow";
import style from "./BookingMenu.module.css";
import ITEMS_PREORDER_COLOR from "../../constants/itemsPreOrderColor";
import EditButtonColumn from "./EditButtonColumn/EditButtonColumn";
import Overlay from "./BookingDateColumn/components/Overlay";
// import EquipmentInfoWindow from "../Popup/EquipmentInfoWindow";

export default function BookingMenu({
  setIsBookingMenu,
  selectedGroups,
  setUpdate,
  groups,
  items,
  editOrderData,
  isEditMode,
  currentDevice,
  setCurrentDevice,
  setIsEditMode,
  openAlertWindow,
  setShowButtonClear,
  selectedCompany,
  user,
  setIsEquipmentInfoWindowOpen,
  isOpenOverlay,
  setIsOpenOverlay,
}) {
  const startWorkDay = Number(currentDevice.workTime.shiftTimes.start.split(":")[0]);
  const [baseOrder, setBaseOrder] = useState({ shiftTime: [{ value: startWorkDay, label: `${startWorkDay} - ${startWorkDay + currentDevice.shiftLength}` }], preOrders: [], equipment: {} });
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [selectedConflictDate, setSelectedConflictDate] = useState(null);
  const [keyRerenderConflictResolutionWindow, setKeyRerenderConflictResolutionWindow] = useState(0);
  const [mapsEquipment, setMapsEquipment] = useState({});
  const [commonMapsEquipment, setCommonMapsEquipment] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);
  const [showStartDisplayConflict, setShowStartDisplayConflict] = useState(true);
  const [selectedPreferredDevice, setSelectedPreferredDevice] = useState(null);
  const [statusCheckboxSelected, setStatusCheckboxSelected] = useState("AUTO");
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
  const [deactivatedCell, setDeactivatedCell] = useState(false);
  const [isAddNewItem, setIsAddNewItem] = useState(false);

  const handleClear = () => {
    setBaseOrder({ shiftTime: [{ value: startWorkDay, label: `${startWorkDay} - ${startWorkDay + currentDevice.shiftLength}` }], preOrders: [], equipment: {} });
    setCalendarEvent([]);
    setSelectedConflictDate("");
    setIsActiveCalendar(true);
    setSelectedDates([]);
  };
  const handleSetSelectedConflictDate = (date) => {
    setKeyRerenderConflictResolutionWindow((prev) => prev + 1);
    setSelectedConflictDate(date);
  };
  const generatePreOrders = (group, date, shiftTime) => {
    const formatHour = Math.floor((shiftTime - startWorkDay) / group.shiftLength);
    return {
      id: uuidv4(),
      group: group.id,
      status: "preOrder",
      date,
      grid: addGrid(formatHour, group.shiftLength, startWorkDay),
      shiftTime,
    };
  };
  const generateEvents = (equipmentId, selectedDatesArr = selectedDates, isNew = false) => {
    const events = [];

    selectedDatesArr.forEach((selectedDate) => {
      const currentDate = moment(selectedDate);
      const baseOrderShiftTimes = baseOrder.shiftTime;
      const currentEquipment = isNew ? baseOrder.equipment : mapsEquipment[equipmentId];
      let resultColor = 0;
      baseOrderShiftTimes.forEach(({ value: baseOrderShiftTime }) => {
        if (currentDate.isBefore(moment().startOf("day"))) {
          events.push({
            start: selectedDate,
            backgroundColor: "#c3cddd",
          });
        } else if (!currentEquipment.dates[selectedDate]
            || (currentEquipment.dates[selectedDate]
                && currentEquipment.dates[selectedDate][baseOrderShiftTime] === "0")) {
          baseOrder.preOrders.push(generatePreOrders(currentEquipment, selectedDate, baseOrderShiftTime));
        } else {
          const commonMapsEquipmentSelectedDate = commonMapsEquipment[selectedDate];
          const { shiftTime } = baseOrder;
          const { shiftLength } = currentEquipment;
          const groupsLength = groups.length;

          if (
            commonMapsEquipmentSelectedDate[shiftTime] === groupsLength.toString()
          && (
            (shiftTime === 0 && commonMapsEquipmentSelectedDate[shiftTime + shiftLength] === groupsLength.toString())
            || (commonMapsEquipmentSelectedDate[shiftTime - shiftLength] === groupsLength.toString() && shiftTime === (24 - shiftLength))
            || (commonMapsEquipmentSelectedDate[shiftTime - shiftLength] === groupsLength.toString() && commonMapsEquipmentSelectedDate[shiftTime + shiftLength] === groupsLength.toString())
          )
          ) {
            resultColor += 3;
          } else if (commonMapsEquipmentSelectedDate[shiftTime] < groupsLength) {
            resultColor += 1;
          } else {
            resultColor += 2;
          }
        }
      });
      switch (resultColor) {
        case 0:
          events.push({
            start: selectedDate,
            extendedProps: {
              shortTitle: currentEquipment.shortTitle,
              shiftLength: currentDevice.shiftLength,
              conflicts: currentEquipment.conflicts[selectedDate],
              success: currentEquipment.success[selectedDate],
            },
            backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
          });
          break;
        case 1:
          events.push({
            start: selectedDate,
            extendedProps: {
              shortTitle: currentEquipment.shortTitle,
              shiftLength: currentDevice.shiftLength,
              conflicts: currentEquipment.conflicts[selectedDate],
              success: currentEquipment.success[selectedDate],
            },
            backgroundColor: ITEMS_PREORDER_COLOR.orderedButFreeInOtherEquipment.backgroundColor,
          });
          break;
        default:

          events.push({
            start: selectedDate,
            extendedProps: {
              shortTitle: currentEquipment.shortTitle,
              shiftLength: currentDevice.shiftLength,
              conflicts: currentEquipment.conflicts[selectedDate],
              success: currentEquipment.success[selectedDate],
            },
            backgroundColor: ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor,
          });
      }
    });
    console.log(events);
    setCalendarEvent((prev) => prev.concat(events));
    if (isNew) {
      handleSetSelectedConflictDate(events[0]);
    }
  };
  const addConflictsAndSuccessInMap = (groupId, selectedDate) => {
    baseOrder.shiftTime.forEach(({ value: shiftTime }) => {
      const { equipment } = baseOrder;

      if (!equipment.conflicts[selectedDate]) {
        equipment.conflicts[selectedDate] = [];
      }
      if (!equipment.success[selectedDate]) {
        equipment.success[selectedDate] = [];
      }
      if (
        equipment.dates[selectedDate]
          && equipment.dates[selectedDate][shiftTime] === "1"
      ) {
        equipment.countConflicts++;
        console.log("count", equipment.countConflicts);
        equipment.conflicts[selectedDate].push({ shiftTime, groupId });
      } else {
        equipment.success[selectedDate].push({ shiftTime, groupId });
      }
      setBaseOrder((prev) => ({ ...prev, equipment }));
    });
  };
  const addAnotherDay = (date) => {
    setSelectedDates((prev) => [...prev, date]);
    addConflictsAndSuccessInMap(baseOrder.equipment.id, date);
    generateEvents(baseOrder.equipment.id, [date], true);
  };

  const calcBestMap = () => {
    setIsActiveCalendar(false);
    Object.keys(mapsEquipment).forEach((group) => {
      mapsEquipment[group].countConflicts = 0;
      mapsEquipment[group].conflicts = { };
      mapsEquipment[group].success = { };
      selectedDates.forEach((selectedDate) => {
        if (!mapsEquipment[group].conflicts[selectedDate]) {
          mapsEquipment[group].conflicts[selectedDate] = [];
        }
        if (!mapsEquipment[group].success[selectedDate]) {
          mapsEquipment[group].success[selectedDate] = [];
        }
        baseOrder.shiftTime.forEach(({ value: shiftTime }) => {
          const equipment = mapsEquipment[group];
          console.log(equipment.dates[selectedDate]);
          if (
            equipment.dates[selectedDate]
              && equipment.dates[selectedDate][shiftTime] === "1"
          ) {
            console.log(123);
            mapsEquipment[group].countConflicts++;
            mapsEquipment[group].conflicts[selectedDate].push({ shiftTime, groupId: group });
          } else {
            mapsEquipment[group].success[selectedDate].push({ shiftTime, groupId: group });
          }
        });
      });
    });
    const min = Object.keys(mapsEquipment).reduce((acc, curr) => {
      const accConflictsLength = mapsEquipment[acc].countConflicts;
      const currConflictsLength = mapsEquipment[curr].countConflicts;
      return accConflictsLength < currConflictsLength ? acc : curr;
    });

    const selectedOrMinDevice = selectedPreferredDevice ? selectedPreferredDevice.value : min;
    setBaseOrder((prev) => ({
      ...prev,
      equipment: { ...mapsEquipment[selectedOrMinDevice] },
    }));

    generateEvents(selectedOrMinDevice);
    setSelectedPreferredDevice(null);
  };

  // console.log(mapsEquipment, commonMapsEquipment);
  const createEquipmentsMap = () => {
    const map = {};
    const commonMap = {};

    let filteredItemsByDate = items.filter((item) => moment(item.date).isSameOrAfter(moment().startOf("day")));

    if (isEditMode) {
      filteredItemsByDate = filteredItemsByDate.filter(
        (item) => item.rentOrderId !== editOrderData.rentOrderId,
      );
    }

    groups.forEach((group) => {
      map[group.id] = {};
      const dayGrids = groupByDateItems(
        filteredItemsByDate.filter((item) => item.group === group.id),
      );
      console.log(dayGrids);
      Object.keys(dayGrids).forEach((day) => {
        if (!commonMap[day]) {
          commonMap[day] = dayGrids[day];
        } else {
          let partA = 2000000000000 + Number(commonMap[day].slice(0, 12));
          let partB = 2000000000000 + Number(commonMap[day].slice(12, 24));
          partA += Number(dayGrids[day].slice(0, 12));
          partB += Number(dayGrids[day].slice(12, 24));
          commonMap[day] = String(partA).slice(1, 13) + String(partB).slice(1, 13);
        }
      });

      map[group.id] = {
        ...group,
        dates: dayGrids,
      };
    });
    setCommonMapsEquipment(commonMap);
    setMapsEquipment(map);
  };

  useEffect(() => {
    createEquipmentsMap();
  }, [groups]);

  useEffect(() => {
    if (!Object.keys(mapsEquipment).length) {
      return;
    }
    if (isEditMode) {
      const editItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId,
      );

      const editDates = {};
      const events = [];
      const successEvent = {};
      const conflictEvent = {};
      editItems.forEach((item) => {
        editDates[item.date] = [];
        if (!successEvent[item.date]) {
          successEvent[item.date] = [];
        }

        if (!conflictEvent[item.date]) {
          conflictEvent[item.date] = [];
        }
        const itemStartIndex = item.grid.indexOf("1");

        if (mapsEquipment[item.group].dates[item.date] && mapsEquipment[item.group].dates[item.date][itemStartIndex] === "1") {
          conflictEvent[item.date].push({ shiftTime: item.grid.indexOf("1"), groupId: item.group });
        } else {
          successEvent[item.date].push({ shiftTime: item.grid.indexOf("1"), groupId: item.group });
        }
      });

      Object.keys(editDates).forEach((date) => {
        events.push({
          start: date,
          extendedProps: {
            // shortTitle: groups.find((group) => group.id === item.group).shortTitle, //! хз
            shiftLength: currentDevice.shiftLength,
            conflicts: conflictEvent[date],
            success: successEvent[date],
          },
          backgroundColor: conflictEvent[date].length ? ITEMS_PREORDER_COLOR.orderedInAllEquipment : ITEMS_PREORDER_COLOR.empty.backgroundColor,
        });
      });

      setBaseOrder((prev) => ({
        ...prev,
        preOrders: editItems,
        equipment: {
          ...currentDevice,
          conflicts: conflictEvent,
          success: successEvent,
          countConflicts: Object.keys(conflictEvent).length,
          dates: mapsEquipment[currentDevice.id],
        },
      }));
      console.log(events);
      setSelectedDates(Object.keys(editDates));
      setIsActiveCalendar(false);
      setCalendarEvent(events);
      setShowStartDisplayConflict(false);
    }
  }, [editOrderData, isEditMode, mapsEquipment]);

  const editOrder = (status) => {
    const orderItemsGrid = createOrderGrid(baseOrder.preOrders);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: editOrderData.rentOrderId,
        company: editOrderData.company,
      },
      status,
      equipmentItems: dateIntervals,
    };

    sendEditOrder(editedOrder)
      .then(() => {
        openAlertWindow("success");
        setUpdate((previousUpdate) => !previousUpdate);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setIsEditMode(false);
      })
      .catch(() => openAlertWindow("error"));
  };

  const sendNewOrder = (status = "pending") => {
    if (baseOrder.preOrders.length < 1) return;
    const orderItems = createOrderGrid(baseOrder.preOrders);
    createOrder(orderItems, selectedCompany, status)
      .then(() => {
        openAlertWindow("success");
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setShowButtonClear(true);
        setUpdate((previousUpdate) => !previousUpdate);
      })
      .catch(() => openAlertWindow("error"));
  };

  const handleChangeEquipmentBeforeCalculation = (selectValueBeforeCalculation) => {
    setSelectedPreferredDevice(selectValueBeforeCalculation);
  };

  const deactivatedCells = () => {
    setDeactivatedCell((prev) => !prev);
  };

  const pushOrderInBasePreOrder = (newOrders) => {
    // console.log("newOrders", newOrders);

    const successArr = newOrders.success.map((item) => ({ shiftTime: item.shiftTime, groupId: item.group }));

    const newPreOrder = baseOrder.preOrders.filter((item) => item.date !== newOrders.date).concat(newOrders.success);

    const countResolveConflicts = baseOrder.equipment.countConflicts + newOrders.conflicts.length - baseOrder.equipment.conflicts[newOrders.date].length;

    setBaseOrder((prev) => ({
      ...prev,
      preOrders: newPreOrder,
      equipment: {
        ...prev.equipment,
        conflicts: { ...prev.equipment.conflicts, [newOrders.date]: newOrders.conflicts },
        success: { ...prev.equipment.success, [newOrders.date]: successArr },
        countConflicts: countResolveConflicts,
      },

    }));
    let backgroundColor;
    switch (newOrders.conflicts.length) {
      case 0:
        backgroundColor = ITEMS_PREORDER_COLOR.empty.backgroundColor;
        break;
      case 1:
        backgroundColor = ITEMS_PREORDER_COLOR.orderedButFreeInOtherEquipment.backgroundColor;
        break;
      default:
        backgroundColor = ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor;
    }
    if (newOrders.success.length === 0 && newOrders.conflicts.length === 0) {
      if (selectedDates.length === 1) {
        handleClear();
        setSelectedDates((prev) => prev.filter((date) => date !== newOrders.date));
        return;
      }
      setSelectedDates((prev) => prev.filter((date) => date !== newOrders.date));
      setCalendarEvent((prev) => prev.filter((event) => moment(event.start).format("YYYY-MM-DD") !== newOrders.date));
      return;
    }
    setCalendarEvent((prev) => prev.map((el) => (el.start === newOrders.date
      ? {
        ...el,
        extendedProps: {
          shift: baseOrder.shiftTime,
          shiftLength: currentDevice.shiftLength,
          conflicts: newOrders.conflicts,
          success: successArr,
        },
        backgroundColor,
      }
      : el)));
  };

  const openOverLay = (status) => {
    if (status === false) {
      setIsAddNewItem(false);
    }
    setIsOpenOverlay(status);
  };
  // console.log("baseOrder", baseOrder);
  // console.log(mapsEquipment);
  return (
    <>
      {isOpenOverlay && (
      <Overlay openOverLay={openOverLay} isAddNewItem={isAddNewItem} />
      )}
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
            setIsBookingMenu={setIsBookingMenu}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            setBaseOrder={setBaseOrder}
            items={items}
            groups={groups}
            setIsConfirmWindowOpen={setIsConfirmWindowOpen}
            setShowButtonClear={setShowButtonClear}
            baseOrder={baseOrder}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            generateCalendarEvents={calcBestMap}
            calendarEvent={calendarEvent}
            isActiveCalendar={isActiveCalendar}
            handleClear={handleClear}
            setShowStartDisplayConflict={setShowStartDisplayConflict}
            handleChangeEquipmentBeforeCalculation={handleChangeEquipmentBeforeCalculation}
            statusCheckboxSelected={statusCheckboxSelected}
            setStatusCheckboxSelected={setStatusCheckboxSelected}
            selectedGroups={selectedGroups}
            setSelectedPreferredDevice={setSelectedPreferredDevice}
            selectedCompany={selectedCompany}
            user={user}
            deactivatedCell={deactivatedCell}
            addAnotherDay={addAnotherDay}
            selectedConflictDate={selectedConflictDate}
          />
        </div>

        <div className={style.bookingDateColumn}>
          <ConfirmBookingWindow
            keyRerenderConflictResolutionWindow={keyRerenderConflictResolutionWindow}
            user={user}
            items={items}
            groups={groups}
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            selectedConflictDate={selectedConflictDate}
            setSelectedConflictDate={setSelectedConflictDate}
            baseOrder={baseOrder}
            showStartDisplayConflict={showStartDisplayConflict}
            pushOrderInBasePreOrder={pushOrderInBasePreOrder}
            statusCheckboxSelected={statusCheckboxSelected}
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            selectedCompany={selectedCompany}
            openAlertWindow={openAlertWindow}
            deactivatedCells={deactivatedCells}
            openOverLay={openOverLay}
            isAddNewItem={isAddNewItem}
            setIsAddNewItem={setIsAddNewItem}
            setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
          />
        </div>
      </div>
      {isConfirmWindowOpen && (
        <ConfirmWindow
          selectedCompany={selectedCompany}
          data={baseOrder.preOrders}
          groups={groups}
          closeBookingWindow={setIsConfirmWindowOpen}
          confirmFunc={() => (isEditMode ? editOrder(isConfirmWindowOpen) : sendNewOrder(isConfirmWindowOpen))}
        />
      )}
    </>
  );
}
