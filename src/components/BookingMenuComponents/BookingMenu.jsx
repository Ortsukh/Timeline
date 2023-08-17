import moment from "moment";
import { useState } from "react";
import { createOrder, sendEditOrder } from "../../Api/API";
import { createOrderGrid, formatOrder } from "../../DataConvertHelper";
import ConfirmWindow from "../ConfirmWindow";
import { BookingTimeline } from "./BookingDateColumn/BookingTimeline";
import style from "./BookingMenu.module.css";
import { EditButtonColumn } from "./EditButtonColumn/EditButtonColumn";

export const BookingMenu = ({
  setIsBookingMenu,
  selectedGroups,
  setUpdate,
  groups,
  toolsCount,
  isActiveDate,
  orderDate,
  openBookingWindow,
  items,
  clickOnEmptySpace,
  clickOnItem,
  editOrderData,
  isEditMode,
  currentDevice,
  setCurrentDevice,
  setIsEditMode,
  operAlertWindow,
  allGroups,
  //! ToolsFilter->
  toolNames,
  onInputChange,
  clearFilter,
  isClickingOnEmptyFilter,
  setIsClickingOnEmptyFilter,
  setShowButtonClear,
  showButtonClear,
  //! <-ToolsFilter
}) => {
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [updatedItems, setUpdatedItems] = useState(items);
  const [copyEditItems, setCopyEditItems] = useState([]);
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
  const [orderContent, setOrderContent] = useState([]);
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
    initialCurrentDeviceIndex
  );

  const editOrder = () => {
    if (itemsPreOrder.length < 1) return;
    let itemsPreOrderCorrect = itemsPreOrder.map((item) => {
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
      })
      .catch(() => operAlertWindow("error"));
  };

  const sendNewOrder = () => {
    if (itemsPreOrder.length < 1) return;
    let itemsPreOrderCorrect = itemsPreOrder.map((item) => {
      item.group = item.deviceGroup;
      return item;
    });
    const orderItems = createOrderGrid(itemsPreOrderCorrect);
    createOrder(orderItems)
      .then((response) => {
        operAlertWindow("success");
        setItemsPreOrder([]);
        setIsBookingMenu(false);
        setCurrentDevice([]);
        setShowButtonClear(true);
        setUpdate((previousUpdate) => !previousUpdate);
      })
      .catch(operAlertWindow("error"));
  };

  console.log("updatedItems", updatedItems, itemsPreOrder);
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
            operAlertWindow={operAlertWindow}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            items={updatedItems}
            orderDate={orderDatePlanning}
            setOrderDate={setOrderDatePlanning}
            setCurrentDeviceIndex={setCurrentDeviceIndex}
            groups={allGroups}
            setIsConfirmWindowOpen={setIsConfirmWindowOpen}
            setOrderContent={setOrderContent}
            //! ToolsFilter->
            toolNames={toolNames}
            onInputChange={onInputChange}
            clearFilter={clearFilter}
            isClickingOnEmptyFilter={isClickingOnEmptyFilter}
            setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
            selectedGroups={selectedGroups}
            setShowButtonClear={setShowButtonClear}
            showButtonClear={showButtonClear}
            //! <-ToolsFilter
          />
        </div>

        <div className={style.bookingDateColumn}>
          <BookingTimeline
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            setCurrentDevice={setCurrentDevice}
            currentDevice={currentDevice}
            selectedGroups={selectedGroups}
            groups={groups}
            itemsPreOrder={itemsPreOrder}
            setItemsPreOrder={setItemsPreOrder}
            setUpdatedItems={setUpdatedItems}
            setCopyEditItems={setCopyEditItems}
            toolsCount={toolsCount}
            isActiveDate={isActiveDate}
            orderDate={orderDate}
            openBookingWindow={openBookingWindow}
            items={items}
            clickOnEmptySpace={clickOnEmptySpace}
            clickOnItem={clickOnItem}
            orderDatePlanning={orderDatePlanning}
            currentDeviceIndex={currentDeviceIndex}
            setCurrentDeviceIndex={setCurrentDeviceIndex}
          />
        </div>
      </div>
      {isConfirmWindowOpen  && (
        <ConfirmWindow
          data={orderContent}
          closeBookingWindow={setIsConfirmWindowOpen}
          confirmFunc={isEditMode ? editOrder : sendNewOrder}
        />
      )}
    </>
  );
};
