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
  openOverLay,
}) {
  const { workTime } = currentDevice;
  // new
  const [baseOrder, setBaseOrder] = useState({ shiftTime: [{ value: workTime.start, label: `${workTime.start} - ${workTime.start + currentDevice.shiftLength}` }], preOrders: [], equipment: {} });
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [selectedConflictDate, setSelectedConflictDate] = useState(null);
  const [keyRerenderConflictResolutionWindow, setKeyRerenderConflictResolutionWindow] = useState(0);
  const [mapsEquipment, setMapsEquipment] = useState([]);
  const [commonMapsEquipment, setCommonMapsEquipment] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);
  const [showStartDisplayConflict, setShowStartDisplayConflict] = useState(true);
  const [selectedPreferredDevice, setSelectedPreferredDevice] = useState(null);
  const [statusCheckboxSelected, setStatusCheckboxSelected] = useState("AUTO");
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
  const [deactivatedCell, setDeactivatedCell] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const editItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId,
      );

      const editDates = [];
      const events = [];
      const successEvent = {};
      editItems.forEach((item) => {
        editDates.push(item.date);
        if (!successEvent[item.date]) {
          successEvent[item.date] = [];
        }
        successEvent[item.date].push({ shiftTime: item.grid.indexOf("1"), groupId: item.group });
      });
      // console.log("successEvent", successEvent);
      Object.keys(successEvent).forEach((date) => {
        events.push({
          start: date,
          extendedProps: {
            // shortTitle: groups.find((group) => group.id === item.group).shortTitle, //! хз
            shiftLength: currentDevice.shiftLength,
            conflicts: [],
            success: successEvent[date],
          },
          backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
        });
      });
      setBaseOrder((prev) => ({
        ...prev,
        preOrders: editItems,
        equipment: {
          ...currentDevice, conflicts: [], success: successEvent, countConflicts: 0,
        },
      }));

      setSelectedDates(editDates);
      setCalendarEvent(events);
      setIsActiveCalendar(false);
      setShowStartDisplayConflict(false);
    }
  }, [editOrderData, isEditMode]);
  const initialCurrentDeviceIndex = groups
    .map((current) => current.id)
    .indexOf(currentDevice.id);
  // eslint-disable-next-line
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(
    initialCurrentDeviceIndex,
  );
  const handleClear = () => {
    setBaseOrder({ shiftTime: [{ value: workTime.start, label: `${workTime.start} - ${workTime.start + currentDevice.shiftLength}` }], preOrders: [], equipment: {} });
    setCalendarEvent([]);
    setSelectedConflictDate("");
    setIsActiveCalendar(true);
    setMapsEquipment([]);
    setCommonMapsEquipment([]);
    setSelectedDates([]);
  };
  const handleSetSelectedConflictDate = (date) => {
    setKeyRerenderConflictResolutionWindow((prev) => prev + 1);
    setSelectedConflictDate(date);
  };
  const generatePreOrders = (group, date, shiftTime) => {
    const formatHour = Math.floor(shiftTime / group.shiftLength);
    return {
      id: uuidv4(),
      group: group.id,
      status: "preOrder",
      date,
      grid: addGrid(formatHour, group.shiftLength),
      shiftTime,
    };
  };
  const generateEvents = (equipmentId) => {
    const events = [];

    selectedDates.forEach((selectedDate) => {
      const currentDate = moment(selectedDate);
      const baseOrderShiftTimes = baseOrder.shiftTime;
      const currentEquipment = mapsEquipment[equipmentId];
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
          // events.push({
          //   start: selectedDate,
          //   extendedProps: {
          //     shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
          //   },
          //   backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
          // });

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
            // events.push({
            //   start: selectedDate,
            //   extendedProps: {
            //     shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            //   },
            //   backgroundColor: ITEMS_PREORDER_COLOR.orderedInThisShiftAndNear.backgroundColor,
            // });
          } else if (commonMapsEquipmentSelectedDate[shiftTime] < groupsLength) {
            resultColor += 1;

            // events.push({
            //   start: selectedDate,
            //   extendedProps: {
            //     shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            //   },
            //   backgroundColor: ITEMS_PREORDER_COLOR.orderedButFreeInOtherEquipment.backgroundColor,
            // });
          } else {
            resultColor += 2;

            // events.push({
            //   start: selectedDate,
            //   extendedProps: {
            //     shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            //   },
            //   backgroundColor: ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor,
            // });
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

    setCalendarEvent(events);
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
          if (
            equipment.dates[selectedDate]
              && equipment.dates[selectedDate][shiftTime] === "1"
          ) {
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

  const createEquipmentsMap = () => {
    const map = {};
    const commonMap = {};
    const filteredItemsByDate = items.filter((item) => moment(item.date).isSameOrAfter(moment().startOf("day")));

    groups.forEach((group) => {
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
      };
    });

    setCommonMapsEquipment(commonMap);
    setMapsEquipment(map);
  };

  useEffect(() => {
    createEquipmentsMap();
  }, [groups, baseOrder.equipment]);

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
    console.log(newOrders);
    if (newOrders.success.length === 0) {
      return;
    }

    const successArr = newOrders.success.map((item) => ({ shiftTime: item.shiftTime, groupId: item.group }));

    const newPreOrder = baseOrder.preOrders.filter((item) => item.date !== newOrders.date).concat(newOrders.success);

    const countResolveConflicts = isEditMode ? 0
      : baseOrder.equipment.countConflicts + newOrders.conflicts.length - baseOrder.equipment.conflicts[newOrders.date].length;

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
    // let newPreOrder;
    // let isNew = false;
    // newPreOrder = baseOrder.preOrders.map((order) => {
    //   if (order.date === newOrder.date) {
    //     isNew = true;
    //     return newOrder;
    //   }
    //   return order;
    // });
    // if (!isNew) {
    //   newPreOrder = [...baseOrder.preOrders, newOrder];
    // }
    // setBaseOrder((prev) => ({
    //   ...prev,
    //   preOrders: newPreOrder,
    //   equipment: {
    //     ...prev.equipment,
    //     conflicts: prev.equipment.conflicts.filter((conflict) => conflict !== newOrder.date),
    //   },
    // }));
    // setCalendarEvent((prev) => prev.map((el) => {
    //   if (el.start === newOrder.date) {
    //     return {
    //       ...el,
    //       backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
    //       extendedProps: {
    //         shiftLength: currentDevice.shiftLength,
    //         shortTitle: groups.find((group) => newOrder.group === group.id).shortTitle,
    //         groupId: newOrder.group,
    //       },
    //     };
    //   }
    //   return el;
    // }));
  };
  // console.log(baseOrder);
  return (
    <>
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
          />
        </div>

        <div className={style.bookingDateColumn}>
          {/* {isEditMode ? ( */}
          {/*  <div> */}
          {/*    <BookingTimeline */}
          {/*      editOrderData={editOrderData} */}
          {/*      isEditMode={isEditMode} */}
          {/*      setCurrentDevice={setCurrentDevice} */}
          {/*      currentDevice={currentDevice} */}
          {/*      groups={groups} */}
          {/*      itemsPreOrder={itemsPreOrder} */}
          {/*      setItemsPreOrder={setItemsPreOrder} */}
          {/*      setCopyEditItems={setCopyEditItems} */}
          {/*      items={items} */}
          {/*      orderDatePlanning={orderDatePlanning} */}
          {/*      currentDeviceIndex={currentDeviceIndex} */}
          {/*      setCurrentDeviceIndex={setCurrentDeviceIndex} */}
          {/*      selectedCompany={selectedCompany} */}
          {/*    /> */}
          {/*  </div> */}
          {/* ) */}
          {/*  : ( */}
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
