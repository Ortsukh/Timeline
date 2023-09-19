import moment from "moment";
import React, { useEffect, useState } from "react";
import { createOrder, sendEditOrder } from "../../Api/API";
import { createOrderGrid, formatOrder, groupByDateItems } from "../../common/DataConvertHelper";
import ConfirmWindow from "../Popup/ConfirmWindow";
import BookingTimeline from "./BookingDateColumn/BookingTimeline";
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
  user, companies,
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
  const [baseOrder, setBaseOrder] = useState({ shiftTime: 0 });
  const [selectedConflictDate, setSelectedConflictDate] = useState(null);
  const [mapsOfequipments, setMapsOfequipments] = useState([]);
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

  const handleSetSelectedConflictDate = (date) => {
    setSelectedConflictDate(date);
  };

  const createEquipmentsMap = () => {
    const map = {};
    const filteredItemsByDate = items.filter((item) => moment(item.date).isSameOrAfter(moment().startOf("day")));
    groups.forEach((group) => {
      map[group.id] = {};
      const datesGreed = groupByDateItems(
        filteredItemsByDate.filter((item) => item.group === group.id),
      );
      map[group.id].dates = datesGreed;
      const conflictDates = [];
      Object.keys(datesGreed).forEach((date) => {
        console.log(datesGreed[date][baseOrder.shiftTime]);
        if (datesGreed[date][baseOrder.shiftTime] === "1") {
          conflictDates.push(date);
        }
      });
      map[group.id].conflicts = conflictDates;
      map[group.id] = { ...map[group.id], ...group };
      console.log(conflictDates);
    });
    console.log(map);
    const min = Object.keys(map).reduce((acc, curr) => (map[acc].conflicts.length < map[curr].conflicts.length ? acc : curr));
    setBaseOrder((prev) => ({
      ...prev, equipment: map[min],
    }));
    setMapsOfequipments(map);
    return map;
  };
  useEffect(() => {
    createEquipmentsMap();
  }, [baseOrder.shiftTime]);

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
    if (itemsPreOrder.length < 1) return;
    // const itemsPreOrderCorrect = itemsPreOrder.map((item) => {
    //   item.group = item.deviceGroup;
    //   return item;
    // });
    // const orderItems = createOrderGrid(itemsPreOrderCorrect);
    // createOrder(orderItems, selectedCompany);
    createOrder(itemsPreOrder, selectedCompany)
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
            //! <-ToolsFilter
            // sendNewOrder={sendNewOrder}
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
          {/* <div style={{ display: "none" }}> */}
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
          {/* </div> */}
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
