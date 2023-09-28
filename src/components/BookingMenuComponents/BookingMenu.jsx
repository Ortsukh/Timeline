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
}) {
  // new
  const [baseOrder, setBaseOrder] = useState({ shiftTime: 0, preOrders: [], equipment: {} });
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
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [copyEditItems, setCopyEditItems] = useState([]);
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const editItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId,
      );
      setBaseOrder((prev) => ({ ...prev, preOrders: editItems, equipment: { ...currentDevice, conflicts: [] } }));

      const editDates = [];
      const events = [];
      editItems.forEach((item) => {
        editDates.push(item.date);
        events.push({
          start: item.date,
          extendedProps: { shift: item.grid.indexOf("1"), shiftLength: currentDevice.shiftLength, shortTitle: groups.find((group) => group.id === item.group).shortTitle },
          backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
        });
      });
      setSelectedDates(editDates);
      setCalendarEvent(events);
      setIsActiveCalendar(false);
      setShowStartDisplayConflict(false);
    }
  }, [editOrderData, isEditMode]);
  const initialCurrentDeviceIndex = groups
    .map((current) => current.id)
    .indexOf(currentDevice.id);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(
    initialCurrentDeviceIndex,
  );
  const handleClear = () => {
    setBaseOrder({ shiftTime: 0, preOrders: [], equipment: {} });
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
  const generatePreOrders = (group, date) => {
    const formatHour = Math.floor(baseOrder.shiftTime / group.shiftLength);
    return {
      id: uuidv4(),
      group: group.id,
      status: "preOrder",
      date,
      grid: addGrid(formatHour, group.shiftLength),
    };
  };
  const generateEvents = (equipmentId) => {
    const events = [];

    selectedDates.forEach((selectedDate) => {
      const currentDate = moment(selectedDate);
      const baseOrderShiftTime = baseOrder.shiftTime;
      const currentEquipment = mapsEquipment[equipmentId];

      if (currentDate.isBefore(moment().startOf("day"))) {
        events.push({
          start: selectedDate,
          backgroundColor: "#c3cddd",
        });
      } else if (!currentEquipment.dates[selectedDate] || (currentEquipment.dates[selectedDate] && currentEquipment.dates[selectedDate][baseOrderShiftTime] === "0")) {
        events.push({
          start: selectedDate,
          extendedProps: {
            shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
          },
          backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
        });
        baseOrder.preOrders.push(generatePreOrders(currentEquipment, selectedDate));
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
          events.push({
            start: selectedDate,
            extendedProps: {
              shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            },
            backgroundColor: ITEMS_PREORDER_COLOR.orderedInThisShiftAndNear.backgroundColor,
          });
        } else if (commonMapsEquipmentSelectedDate[shiftTime] < groupsLength) {
          events.push({
            start: selectedDate,
            extendedProps: {
              shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            },
            backgroundColor: ITEMS_PREORDER_COLOR.orderedButFreeInOtherEquipment.backgroundColor,
          });
        } else {
          events.push({
            start: selectedDate,
            extendedProps: {
              shift: baseOrderShiftTime, shortTitle: currentEquipment.shortTitle, shiftLength: currentDevice.shiftLength, groupId: equipmentId,
            },
            backgroundColor: ITEMS_PREORDER_COLOR.orderedInAllEquipment.backgroundColor,
          });
        }
      }
    });

    setCalendarEvent(events);
  };
  const calcBestMap = () => {
    setIsActiveCalendar(false);

    Object.keys(mapsEquipment).forEach((group) => {
      mapsEquipment[group].conflicts = selectedDates.filter((selectedDate) => {
        const equipment = mapsEquipment[group];
        return (
          equipment.dates[selectedDate]
            && equipment.dates[selectedDate][baseOrder.shiftTime] === "1"
        );
      });
    });

    const min = Object.keys(mapsEquipment).reduce((acc, curr) => {
      const accConflictsLength = mapsEquipment[acc].conflicts.length;
      const currConflictsLength = mapsEquipment[curr].conflicts.length;
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

  const editOrder = () => {
    const orderItemsGrid = createOrderGrid(baseOrder.preOrders);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: editOrderData.rentOrderId,
        company: editOrderData.company,
      },
      status: editOrderData.status,
      equipmentItems: dateIntervals,
    };

    sendEditOrder(editedOrder)
      .then(() => {
        openAlertWindow("success");
        setUpdate((previousUpdate) => !previousUpdate);
        setItemsPreOrder([]);
        setCopyEditItems([]);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setIsEditMode(false);
      })
      .catch(() => openAlertWindow("error"));
  };

  const sendNewOrder = () => {
    if (baseOrder.preOrders.length < 1) return;
    const orderItems = createOrderGrid(baseOrder.preOrders);
    createOrder(orderItems, selectedCompany)
      .then(() => {
        openAlertWindow("success");
        setItemsPreOrder([]);
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
  const pushOrderInBasePreOrder = (newOrder) => {
    let isNew = false;
    let newPreOrder;
    newPreOrder = baseOrder.preOrders.map((order) => {
      if (order.date === newOrder.date) {
        isNew = true;
        return newOrder;
      }
      return order;
    });
    if (!isNew) {
      newPreOrder = [...baseOrder.preOrders, newOrder];
    }
    setBaseOrder((prev) => ({
      ...prev,
      preOrders: newPreOrder,
      equipment: {
        ...prev.equipment,
        conflicts: prev.equipment.conflicts.filter((conflict) => conflict !== newOrder.date),
      },
    }));
    setCalendarEvent((prev) => prev.map((el) => {
      if (el.start === newOrder.date) {
        return {
          ...el,
          backgroundColor: ITEMS_PREORDER_COLOR.empty.backgroundColor,
          extendedProps: {
            shift: newOrder.grid.indexOf("1"), shiftLength: currentDevice.shiftLength, shortTitle: groups.find((group) => newOrder.group === group.id).shortTitle, groupId: newOrder.group,
          },
        };
      }
      return el;
    }));
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            setIsBookingMenu={setIsBookingMenu}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            copyEditItems={copyEditItems}
            setCopyEditItems={setCopyEditItems}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            baseOrder={baseOrder}
            setBaseOrder={setBaseOrder}
            items={items}
            groups={groups}
            setIsConfirmWindowOpen={setIsConfirmWindowOpen}
            selectedGroups={selectedGroups}
            setShowButtonClear={setShowButtonClear}
            setSelectedDates={setSelectedDates}
            generateCalendarEvents={calcBestMap}
            calendarEvent={calendarEvent}
            isActiveCalendar={isActiveCalendar}
            handleClear={handleClear}
            selectedDates={selectedDates}
            setShowStartDisplayConflict={setShowStartDisplayConflict}
            sendNewOrder={sendNewOrder}
            handleChangeEquipmentBeforeCalculation={handleChangeEquipmentBeforeCalculation}
            statusCheckboxSelected={statusCheckboxSelected}
            setStatusCheckboxSelected={setStatusCheckboxSelected}
            setSelectedPreferredDevice={setSelectedPreferredDevice}
            editOrder={editOrder}
            selectedCompany={selectedCompany}
            user={user}
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
            user={user}
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            setCurrentDevice={setCurrentDevice}
            groups={groups}
            setItemsPreOrder={setItemsPreOrder}
            setCopyEditItems={setCopyEditItems}
            items={items}
            currentDeviceIndex={currentDeviceIndex}
            setCurrentDeviceIndex={setCurrentDeviceIndex}
            selectedCompany={selectedCompany}
            selectedConflictDate={selectedConflictDate}
            setSelectedConflictDate={setSelectedConflictDate}
            baseOrder={baseOrder}
            showStartDisplayConflict={showStartDisplayConflict}
            pushOrderInBasePreOrder={pushOrderInBasePreOrder}
            keyRerenderConflictResolutionWindow={keyRerenderConflictResolutionWindow}
            statusCheckboxSelected={statusCheckboxSelected}
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
          />

        </div>
      </div>
      {isConfirmWindowOpen && (
        <ConfirmWindow
          selectedCompany={selectedCompany}
          data={baseOrder.preOrders}
          groups={groups}
          closeBookingWindow={setIsConfirmWindowOpen}
          confirmFunc={isEditMode ? editOrder : sendNewOrder}
        />
      )}
    </>
  );
}
