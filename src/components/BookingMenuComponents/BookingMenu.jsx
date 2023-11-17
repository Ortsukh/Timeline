/* eslint-disable max-len */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { createOrder, sendEditOrder } from "../../Api/API";
import {
  addGrid,
  createOrderGrid, createOrderGroup,
  formatOrder,
  groupByDateItems,
} from "../../common/DataConvertHelper";
import ConfirmWindow from "../Popup/ConfirmWindow";
import ConfirmBookingWindow from "./BookingDateColumn/ConflictResolutionWindow/ConfirmBookingWindow";
import style from "./BookingMenu.module.css";
import ITEMS_PREORDER_COLOR from "../../constants/itemsPreOrderColor";
import EditButtonColumn from "./EditButtonColumn/EditButtonColumn";
import Overlay from "./BookingDateColumn/components/Overlay";
import useGetOrdersByFilters from "../../hooks/useGetOrdersByFilters";
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
  isFromDashboard,
  filterProps,
}) {
  const startWorkDay = currentDevice?.workTime ? Number(currentDevice.workTime.shiftTimes.start.split(":")[0]) : 0;
  const [baseOrder, setBaseOrder] = useState(
    {
      shiftTime:
            [],
      preOrders: [],
      equipment: {},
    },
  );
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [selectedConflictDate, setSelectedConflictDate] = useState(null);
  const [keyRerenderConflictResolutionWindow, setKeyRerenderConflictResolutionWindow] = useState(0);
  const [, setMapsEquipment] = useState({});
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
    setBaseOrder({ shiftTime: [], preOrders: [], equipment: {} });
    setCalendarEvent([]);
    setSelectedConflictDate("");
    setIsActiveCalendar(true);
    setSelectedDates([]);
  };
  const handleSetSelectedConflictDate = (date) => {
    console.log(date);
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
  useEffect(() => {
    setBaseOrder(
      {
        shiftTime: [],
        preOrders: [],
        equipment: {},
      },
    );
    setMapsEquipment({});
  }, [currentDevice]);
  const generateEvents = (equipmentId, mapsEquipment1, commonMap = commonMapsEquipment, selectedDatesArr = selectedDates, isNew = false) => {
    const events = [];
    selectedDatesArr.forEach((selectedDate) => {
      const currentDate = moment(selectedDate);
      const baseOrderShiftTimes = baseOrder.shiftTime;
      // const currentEquipment = mapsEquipment1[equipmentId];
      const currentEquipment = baseOrder.equipment?.id ? baseOrder.equipment : mapsEquipment1[equipmentId];
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
          const commonMapsEquipmentSelectedDate = commonMap[selectedDate];
          const { shiftTime } = baseOrder;
          const { shiftLength } = currentEquipment;
          const groupsLength = groups.filter((group) => group.category === currentDevice.category).length;

          if (
            commonMapsEquipmentSelectedDate[shiftTime] === groupsLength.toString()
              && (
                (shiftTime === 0 && commonMapsEquipmentSelectedDate[shiftTime[0].value + shiftLength] === groupsLength.toString())
                  || (commonMapsEquipmentSelectedDate[shiftTime[0].value - shiftLength] === groupsLength.toString() && shiftTime[0].value === (24 - shiftLength))
                  || (commonMapsEquipmentSelectedDate[shiftTime[0].value - shiftLength] === groupsLength.toString() && commonMapsEquipmentSelectedDate[shiftTime[0].value + shiftLength] === groupsLength.toString())
              )
          ) {
            resultColor += 3;
          } else if (commonMapsEquipmentSelectedDate[shiftTime[0].value] < groupsLength) {
            resultColor += 1;
          } else {
            resultColor += 2;
          }
        }
      });
      console.log("resultColor", resultColor);
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
            backgroundType: "gridWithoutConflictBG",
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
            backgroundType: "gridWithConflictInThisShiftBG",
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
            backgroundType: "gridWithConflictBG",
            backgroundColor: ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor,
          });
      }
    });
    setCalendarEvent((prev) => prev.concat(events));
    if (isNew) {
      handleSetSelectedConflictDate(events[0]);
    }
  };
  const addConflictsAndSuccessInMap = (groupId, selectedDate, equip, shortTitle) => {
    // const equipment = equip;
    const { equipment } = baseOrder;
    console.log(baseOrder);
    baseOrder.shiftTime.forEach(({ value: shiftTime }) => {
      if (!equipment.conflicts[selectedDate]) {
        equipment.conflicts[selectedDate] = [];
      }
      if (!equipment.success[selectedDate]) {
        equipment.success[selectedDate] = [];
      }
      if (
        equip.dates[selectedDate]
          && equip.dates[selectedDate][shiftTime] === "1"
      ) {
        equipment.countConflicts++;
        console.log("count", equipment.countConflicts);
        equipment.conflicts[selectedDate].push({ shiftTime, groupId, shortTitle });
      } else {
        equipment.success[selectedDate].push({ shiftTime, groupId, shortTitle });
      }
      console.log(equipment);
      setBaseOrder((prev) => ({ ...prev, equipment }));
    });
  };
  const createEquipmentsMap = (items2 = items) => {
    const map = {};
    const commonMap = {};
    const filteredGroups = groups.filter((group) => group.category === currentDevice.category);
    let filteredItemsByDate = items2.filter((item) => moment(item.date).isSameOrAfter(moment().startOf("day")));
    if (isEditMode) {
      filteredItemsByDate = filteredItemsByDate.filter(
        (item) => item.rentOrderId !== editOrderData.rentOrderId,
      );
    }
    filteredGroups.forEach((group) => {
      map[group.id] = {};
      const dayGrids = groupByDateItems(
        filteredItemsByDate.filter((item) => item.group === group.id),
      );
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
        conflicts: {},
        success: {},
      };
    });
    setCommonMapsEquipment(commonMap);
    setMapsEquipment(map);
    return { map, commonMap };
  };

  const { execute } = useGetOrdersByFilters(undefined, true);
  const addAnotherDay = async (date) => {
    const ordersByDate = await execute({ category: "hook" });
    const items1 = createOrderGroup(ordersByDate);
    const { map, commonMap } = createEquipmentsMap(items1);
    setSelectedDates((prev) => [...prev, date]);
    addConflictsAndSuccessInMap(baseOrder.equipment.id, date, map[baseOrder.equipment.id], baseOrder.equipment.shortTitle);
    generateEvents(baseOrder.equipment.id, map, commonMap, [date], true);
  };

  const calcBestMap = () => {
    setIsActiveCalendar(false);
    const { map: mapsEquipment1 } = createEquipmentsMap();
    Object.keys(mapsEquipment1).forEach((group) => {
      console.log(mapsEquipment1[group]);
      mapsEquipment1[group].countConflicts = 0;
      mapsEquipment1[group].conflicts = { };
      mapsEquipment1[group].success = { };
      selectedDates.forEach((selectedDate) => {
        if (!mapsEquipment1[group].conflicts[selectedDate]) {
          mapsEquipment1[group].conflicts[selectedDate] = [];
        }
        if (!mapsEquipment1[group].success[selectedDate]) {
          mapsEquipment1[group].success[selectedDate] = [];
        }
        baseOrder.shiftTime.forEach(({ value: shiftTime }) => {
          const equipment = mapsEquipment1[group];
          if (
            equipment.dates[selectedDate]
              && equipment.dates[selectedDate][shiftTime] === "1"
          ) {
            mapsEquipment1[group].countConflicts++;
            mapsEquipment1[group].conflicts[selectedDate].push({ shiftTime, groupId: group, shortTitle: mapsEquipment1[group].shortTitle });
          } else {
            mapsEquipment1[group].success[selectedDate].push({ shiftTime, groupId: group, shortTitle: mapsEquipment1[group].shortTitle });
          }
        });
      });
    });
    const min = Object.keys(mapsEquipment1).reduce((acc, curr) => {
      const accConflictsLength = mapsEquipment1[acc].countConflicts;
      const currConflictsLength = mapsEquipment1[curr].countConflicts;
      return accConflictsLength < currConflictsLength ? acc : curr;
    });

    const selectedOrMinDevice = selectedPreferredDevice ? selectedPreferredDevice.value : min;
    setBaseOrder((prev) => ({
      ...prev,
      equipment: { ...mapsEquipment1[selectedOrMinDevice] },
    }));

    generateEvents(selectedOrMinDevice, mapsEquipment1);
    setSelectedPreferredDevice(null);
  };

  // console.log(mapsEquipment, commonMapsEquipment);

  // useEffect(() => {
  //   createEquipmentsMap();
  // }, [groups, currentDevice]);

  useEffect(() => {
    // if (!Object.keys(mapsEquipment).length) {
    //     //   return;
    //     // }
    const { map: mapsEquipment1 } = createEquipmentsMap();
    if (isEditMode) {
      const editItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId,
      );
      const editDates = {};
      const events = [];
      const successEvent = {};
      const conflictEvent = {};
      let countConflict = 0;
      editItems.forEach((item) => {
        console.log(item);
        editDates[item.date] = [];
        if (!successEvent[item.date]) {
          successEvent[item.date] = [];
        }

        if (!conflictEvent[item.date]) {
          conflictEvent[item.date] = [];
        }
        const itemStartIndex = item.grid.indexOf("1");
        if (mapsEquipment1[item.group].dates[item.date] && mapsEquipment1[item.group].dates[item.date][itemStartIndex] === "1") {
          conflictEvent[item.date].push({ shiftTime: item.grid.indexOf("1"), groupId: item.group, shortTitle: item.groupShortTitle });
          countConflict++;
        } else {
          successEvent[item.date].push({ shiftTime: item.grid.indexOf("1"), groupId: item.group, shortTitle: item.groupShortTitle });
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
          backgroundType: conflictEvent[date].length ? "gridWithConflictBG" : "gridWithoutConflictBG",
        });
      });
      setBaseOrder((prev) => ({
        ...prev,
        preOrders: editItems,
        equipment: {
          ...currentDevice,
          conflicts: conflictEvent,
          success: successEvent,
          countConflicts: countConflict,
          dates: mapsEquipment1[currentDevice.id],
        },
      }));
      setSelectedDates(Object.keys(editDates));
      setIsActiveCalendar(false);
      setCalendarEvent(events);
      setShowStartDisplayConflict(false);
    }
  }, [editOrderData, isEditMode]);

  const editOrder = (commentToOrder, status) => {
    const orderItemsGrid = createOrderGrid(baseOrder.preOrders);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: editOrderData.rentOrderId,
        company: editOrderData.company,
        comment: commentToOrder,
      },
      status,
      equipmentItems: dateIntervals,
    };

    sendEditOrder(editedOrder)
      .then(() => {
        if (isFromDashboard) {
          Swal.fire({
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            didClose: () => {
              const { origin } = window.location;
              const { pathname } = window.location;
              window.location.replace(`${origin}${pathname}?page=main_dashboard`);
            },
          });
          return;
        }
        openAlertWindow("success");
        setUpdate((previousUpdate) => !previousUpdate);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setIsEditMode(false);
      })
      .catch(() => Swal.fire({
        icon: "error",
        text: "ошибка сети",

      }));
  };

  const sendNewOrder = (commentToOrder, status = "pending") => {
    if (baseOrder.preOrders.length < 1) return;
    const orderItems = createOrderGrid(baseOrder.preOrders);
    createOrder(orderItems, selectedCompany, commentToOrder, status)
      .then(() => {
        if (isFromDashboard) {
          Swal.fire({
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            didClose: () => {
              const { origin } = window.location;
              const { pathname } = window.location;
              window.location.replace(`${origin}${pathname}?page=main_dashboard`);
            },
          });
          return;
        }
        setUpdate((previousUpdate) => !previousUpdate);
        openAlertWindow("success");
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setShowButtonClear(true);
      })
      .catch(() => Swal.fire({
        icon: "error",
        text: "ошибка сети",
      }));
  };

  const handleChangeEquipmentBeforeCalculation = (selectValueBeforeCalculation) => {
    setSelectedPreferredDevice(selectValueBeforeCalculation);
  };

  const deactivatedCells = () => {
    setDeactivatedCell((prev) => !prev);
  };

  const pushOrderInBasePreOrder = (newOrders) => {
    // console.log("newOrders", newOrders);

    const successArr = newOrders.success.map((item) => ({ shiftTime: item.shiftTime, groupId: item.group, shortTitle: item.shortTitle }));

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
    let backgroundType;
    switch (newOrders.conflicts.length) {
      case 0:
        backgroundColor = ITEMS_PREORDER_COLOR.empty.backgroundColor;
        backgroundType = "gridWithoutConflictBG";
        break;
      case 1:
        backgroundColor = ITEMS_PREORDER_COLOR.orderedButFreeInOtherEquipment.backgroundColor;
        backgroundType = "gridWithConflictInThisShiftBG";
        break;
      default:
        backgroundColor = ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor;
        backgroundType = "gridWithConflictBG";
    }
    if (newOrders.success?.length === 0 && newOrders.conflicts?.length === 0) {
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
        backgroundType,
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
            isFromDashboard={isFromDashboard}
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
            filterProps={filterProps}
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
          confirmFunc={(commentToOrder) => (isEditMode ? editOrder(commentToOrder, isConfirmWindowOpen) : sendNewOrder(commentToOrder, isConfirmWindowOpen))}
        />
      )}
    </>
  );
}
