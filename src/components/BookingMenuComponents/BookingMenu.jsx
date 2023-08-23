import moment from "moment";
import React, { useEffect, useState } from "react";
import { createOrder, sendEditOrder } from "../../Api/API";
import { createOrderGrid, formatOrder } from "../../common/DataConvertHelper";
import ConfirmWindow from "../Popup/ConfirmWindow";
import BookingTimeline from "./BookingDateColumn/BookingTimeline";
import style from "./BookingMenu.module.css";
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
    const itemsPreOrderCorrect = itemsPreOrder.map((item) => {
      item.group = item.deviceGroup;
      return item;
    });
    const orderItems = createOrderGrid(itemsPreOrderCorrect);
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

  return (
    <>
      <div className={style.container}>
        <div className={style.editButtonColumn}>
          <EditButtonColumn
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
          />
        </div>

        <div className={style.bookingDateColumn}>
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
