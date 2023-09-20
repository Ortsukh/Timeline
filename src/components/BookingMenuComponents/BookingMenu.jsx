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
import BookingTimeline from "./BookingDateColumn/BookingTimeline";
import ConfirmBookingWindow from "./BookingDateColumn/ConflictResolutionWindow/ConfirmBookingWindow";
import style from "./BookingMenu.module.css";
import EditButtonColumn from "./EditButtonColumn/EditButtonColumn";
// import Table from "./WebDataRocks/Table";

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
  operAlertWindow,
  allGroups,
  user,
  companies,
  //! ToolsFilter->
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  setShowButtonClear,
  showButtonClear,
  //! <-ToolsFilter
}) {
  // new
  const [baseOrder, setBaseOrder] = useState({ shiftTime: 0, preOrders: [] });
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [selectedConflictDate, setSelectedConflictDate] = useState(null);
  const [mapsEquipment, setMapsEquipment] = useState([]);
  const [commonMapsEquipment, setCommonMapsEquipment] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [calendarEvent, setCalendarEvent] = useState([]);
  const [showStartDisplayConflict, setShowStartDisplayConflict] = useState(true);
  console.log(currentDevice);

  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [updatedItems, setUpdatedItems] = useState(items);
  const [copyEditItems, setCopyEditItems] = useState([]);
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
  const [orderContent, setOrderContent] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [orderDatePlanning, setOrderDatePlanning] = useState({
    selection1: {
      startDate: new Date(),
      endDate: new Date(moment().add(2, "days").valueOf()),
      key: "selection1",
    },
  });
  console.log(items);
  // const [sendItemFromeTable, setSendItemFromeTable] = useState([]);
  const initialCurrentDeviceIndex = groups
    .map((current) => current.id)
    .indexOf(currentDevice.id);
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(
    initialCurrentDeviceIndex,
  );
  useEffect(() => {
    if (user.role === "ROLE_COMPANY") {
      setSelectedCompany(user);
    }
  }, []);
  const handleClear = () => {
    setBaseOrder({ shiftTime: 0, preOrders: [] });
    setCalendarEvent([]);
    setSelectedConflictDate("");
    setIsActiveCalendar(true);
    setMapsEquipment([]);
    setCommonMapsEquipment([]);
  };
  const handleSetSelectedConflictDate = (date) => {
    setSelectedConflictDate(date);
  };
  const generatePreOrders = (group, date) => {
    const formatHour = Math.floor(baseOrder.shiftTime / group.shiftLength);
    const obj = {
      id: uuidv4(),
      group: group.id,
      status: "preOrder",
      date,
      grid: addGrid(formatHour, group.shiftLength),
    };
    return obj;
  };
  const generateCalendarEvents = () => {
    setIsActiveCalendar(false);
    console.log(commonMapsEquipment);
    console.log(mapsEquipment);
    Object.keys(mapsEquipment).forEach((group) => {
      const conflictDates = [];
      selectedDates.forEach((selectedDate) => {
        if (
          mapsEquipment[group].dates[selectedDate]
          && mapsEquipment[group].dates[selectedDate][baseOrder.shiftTime] === "1"
        ) {
          conflictDates.push(selectedDate);
        }
      });

      mapsEquipment[group].conflicts = conflictDates;
    });
    const min = Object.keys(mapsEquipment).reduce((acc, curr) => (mapsEquipment[acc].conflicts.length < mapsEquipment[curr].conflicts.length
      ? acc
      : curr));
    setBaseOrder((prev) => ({
      ...prev,
      equipment: { ...mapsEquipment[min] },
    }));

    const event = [];
    selectedDates.forEach((selectedDate) => {
      if (moment(selectedDate).isBefore(moment().startOf("day"))) {
        event.push({
          start: selectedDate, backgroundColor: "#c3cddd",
        });
      } else if (!mapsEquipment[min].dates[selectedDate] || (mapsEquipment[min].dates[selectedDate]
          && mapsEquipment[min].dates[selectedDate][baseOrder.shiftTime] === "0")) {
        event.push({
          start: selectedDate, backgroundColor: "#90ef90",
        });
        baseOrder.preOrders.push(generatePreOrders(mapsEquipment[min], selectedDate));
      } else if (
        commonMapsEquipment[selectedDate][baseOrder.shiftTime] < groups.length) {
        event.push({
          start: selectedDate, backgroundColor: "#ffd884",
        });
      } else {
        event.push({
          start: selectedDate, backgroundColor: "#ffa4a4",
        });
      }
    });
    setCalendarEvent(event);
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
          let partA = 2000000000000;
          let partB = 2000000000000;
          partA += Number(commonMap[day].slice(0, 12));
          partB += Number(commonMap[day].slice(12, 24));
          partA += Number(dayGrids[day].slice(0, 12));
          partB += Number(dayGrids[day].slice(12, 24));
          commonMap[day] = String(partA).slice(1, 13) + String(partB).slice(1, 13);
        }
      });
      map[group.id].dates = dayGrids;
      map[group.id] = { ...map[group.id], ...group };
    });
    setCommonMapsEquipment(commonMap);
    setMapsEquipment(map);
  };
  useEffect(() => {
    createEquipmentsMap();
  }, [groups]);

  const editOrder = () => {
    if (itemsPreOrder.length < 1) return;
    const itemsPreOrderCorrect = itemsPreOrder.map((item) => {
      item.group = item.deviceGroup;
      return item;
    });
    const orderItem = copyEditItems[0];
    const orderItemsGrid = createOrderGrid(itemsPreOrderCorrect);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: orderItem.rentOrderId,
        company: orderItem.company,
      },
      status: orderItem.status,
      equipmentItems: dateIntervals,
    };

    sendEditOrder(editedOrder)
      .then(() => {
        operAlertWindow("success");
        setUpdate((previousUpdate) => !previousUpdate);
        setItemsPreOrder([]);
        setCopyEditItems([]);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setIsEditMode(false);
      })
      .catch(() => operAlertWindow("error"));
  };

  const sendNewOrder = () => {
    if (baseOrder.preOrders.length < 1) return;
    const orderItems = createOrderGrid(baseOrder.preOrders);
    createOrder(orderItems, selectedCompany)
      .then(() => {
        operAlertWindow("success");
        setItemsPreOrder([]);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setShowButtonClear(true);
        setUpdate((previousUpdate) => !previousUpdate);
      })
      .catch(operAlertWindow("error"));
  };

  const pushOrderInBasePreOrder = (newOrder) => {
    const newPreOrder = [...baseOrder.preOrders, newOrder];
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
        return { ...el, backgroundColor: "#90ef90" };
      }
      return el;
    }));
  };
  console.log("END baseOrder", baseOrder);

  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
            handleSetSelectedConflictDate={handleSetSelectedConflictDate}
            setIsBookingMenu={setIsBookingMenu}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            setItems={setUpdatedItems}
            copyEditItems={copyEditItems}
            setCopyEditItems={setCopyEditItems}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            baseOrder={baseOrder}
            setBaseOrder={setBaseOrder}
            items={updatedItems}
            orderDate={orderDatePlanning}
            setOrderDate={setOrderDatePlanning}
            setCurrentDeviceIndex={setCurrentDeviceIndex}
            groups={allGroups}
            setIsConfirmWindowOpen={setIsConfirmWindowOpen}
            setOrderContent={setOrderContent}
            companies={companies}
            user={user}
            selectedCompany={selectedCompany}
            //! ToolsFilter->
            toolNames={toolNames}
            onInputChange={onInputChange}
            clearFilter={clearFilter}
            isClickingOnEmptyFilter={isClickingOnEmptyFilter}
            setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
            selectedGroups={selectedGroups}
            setShowButtonClear={setShowButtonClear}
            showButtonClear={showButtonClear}
            setSelectedCompany={setSelectedCompany}
            setSelectedDates={setSelectedDates}
            generateCalendarEvents={generateCalendarEvents}
            calendarEvent={calendarEvent}
            isActiveCalendar={isActiveCalendar}
            handleClear={handleClear}
            //! <-ToolsFilter
            setShowStartDisplayConflict={setShowStartDisplayConflict}
            sendNewOrder={sendNewOrder}
            // sendItemFromeTable={sendItemFromeTable}
          />
        </div>

        <div className={style.bookingDateColumn}>
          {/* <div>
            <Table
              items={items}
              currentDevice={currentDevice}
              selectedCompany={selectedCompany}
              groups={groups}
              setCurrentDevice={setCurrentDevice}
              currentDeviceIndex={currentDeviceIndex}
              setCurrentDeviceIndex={setCurrentDeviceIndex}
              setItemsPreOrder={setItemsPreOrder}
              setSendItemFromeTable={setSendItemFromeTable}
            />
          </div> */}
          <div style={{ display: "none" }}>
            <BookingTimeline
              editOrderData={editOrderData}
              isEditMode={isEditMode}
              setCurrentDevice={setCurrentDevice}
              currentDevice={currentDevice}
              groups={groups}
              itemsPreOrder={itemsPreOrder}
              setItemsPreOrder={setItemsPreOrder}
              setUpdatedItems={setUpdatedItems}
              setCopyEditItems={setCopyEditItems}
              items={items}
              orderDatePlanning={orderDatePlanning}
              currentDeviceIndex={currentDeviceIndex}
              setCurrentDeviceIndex={setCurrentDeviceIndex}
              selectedCompany={selectedCompany}
            />
          </div>
          <ConfirmBookingWindow
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            groups={groups}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            setUpdatedItems={setUpdatedItems}
            setCopyEditItems={setCopyEditItems}
            items={items}
            orderDatePlanning={orderDatePlanning}
            currentDeviceIndex={currentDeviceIndex}
            setCurrentDeviceIndex={setCurrentDeviceIndex}
            selectedCompany={selectedCompany}
            selectedConflictDate={selectedConflictDate}
            setSelectedConflictDate={setSelectedConflictDate}
            baseOrder={baseOrder}
            showStartDisplayConflict={showStartDisplayConflict}
            pushOrderInBasePreOrder={pushOrderInBasePreOrder}
          />
        </div>
      </div>
      {isConfirmWindowOpen && (
        <ConfirmWindow
          data={orderContent}
          closeBookingWindow={setIsConfirmWindowOpen}
          confirmFunc={isEditMode ? editOrder : sendNewOrder}
        />
      )}
    </>
  );
}
