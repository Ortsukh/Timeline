import moment from "moment";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  addGrid,
  createEquipmentGroup,
  createOrderGrid,
  createOrderGroup,
  formatOrder,
} from "../DataConvertHelper";
import ToolsFilter from "../components/ToolsFilter";
import CountTools from "../components/CountToolsFilter";
import DateFilter from "../components/DateFilter";
import Spiner from "../components/Spiner";
import CountOrderFilter from "../components/CountOrderFilter";
import MessageWindow from "../components/MessageWindow";
import TimeLineRenderer from "../components/TimeLineRenderer";
import CompaniesSelect from "../components/CompaniesSelect";
import StatusSelect from "../components/StatusSelect";
import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";
import {
  createOrder,
  getAllEqupments,
  getAllEqupments1,
  getAllOrders,
  getAllOrders1,
  sendEditOrder,
} from "../Api/API";
import AlertWindow from "../components/AlertWindow";
import ButtonBoxComponent from "../components/ButtonBoxComponent";
import { BookingMenu } from "../components/BookingMenuComponents/BookingMenu";

export default function TimelinePage(props) {
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [copyEditItems, setCopyEditItems] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
  const [blockCreateButton, setBlockCreateButton] = useState(false);
  const [isActiveDate, setIsActiveDate] = useState(false);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [isOpenAlertWindow, setIsOpenAlertWindow] = useState({
    status: false,
    message: "",
  });
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [toolsCount, setToolsCount] = useState(0);
  const [chosenDate, setChosenDate] = useState(null);
  const [orderDate, setOrderDate] = useState({
    selection1: {
      startDate: new Date(),

      endDate: new Date(moment().add(2, "days").valueOf()),
      key: "selection1",
    },
  });
  const [isBookingMenu, setIsBookingMenu] = useState(false);

  const isAdmin = false;

  useEffect(() => {
    setIsLoadingEquipment(true);

    getAllEqupments().then((response) => {
      setGroups(createEquipmentGroup(response.data));
      setIsLoadingEquipment(false);
    });
  }, [update]);

  useEffect(() => {
    setIsLoadingEquipment(true);

    getAllOrders()
      .then((response) => {
        setItems(createOrderGroup(response.data));
        setIsLoading(false);
      })

      .catch((error) => console.log(error));
  }, [update]);

  const handleInputChange = (newInput) => {
    localStorage.setItem("toolsFilter", newInput);

    setSelectedGroups(() => {
      return [newInput];
    });
  };

  const editMode = (_e, order) => {
    const selectedItems = items.filter(
      (item) => item.rentOrderId == order.rentOrderId
    );

    const allItems = items.filter(
      (item) => item.rentOrderId !== order.rentOrderId
    );

    const selectedItemsWithColor = selectedItems.map((el) => {
      return {
        ...el,
        itemProps: { style: { background: "gray" } },
      };
    });

    setItems(allItems);
    setItemsPreOrder(selectedItemsWithColor);
    setCopyEditItems(selectedItems);
    setIsEditMode(true);
    setIsActiveMessage(false);
  };

  const sendNewOrder = () => {
    if (itemsPreOrder.length < 1) return;
    const orderItems = createOrderGrid(itemsPreOrder);
    setBlockCreateButton(true);
    createOrder(orderItems)
      .then((response) => {
        setItemsPreOrder([]);
        setUpdate((previousUpdate) => !previousUpdate);
        operAlertWindow("success");
      })
      .catch(() => operAlertWindow("error"));
  };

  const editOrder = () => {
    if (itemsPreOrder.length < 1) return;
    const orderItem = itemsPreOrder[0];
    const orderItemsGrid = createOrderGrid(itemsPreOrder);
    console.log(orderItemsGrid);
    const dateIntervals = formatOrder(orderItemsGrid);
    const editedOrder = {
      rentOrder: {
        id: orderItem.rentOrderId,
        company: orderItem.company,
      },
      status: orderItem.status,
      equipmentItems: dateIntervals,
    };

    setBlockCreateButton(true);

    sendEditOrder(editedOrder)
      .then(() => {
        setUpdate((previousUpdate) => !previousUpdate);
        setItemsPreOrder([]);
        setCopyEditItems([]);
        operAlertWindow("success");
        setIsEditMode(false);
      })
      .catch(() => operAlertWindow("error"));
  };

  const operAlertWindow = (message) => {
    setIsOpenAlertWindow({
      status: true,
      message: message,
    });
    setTimeout(() => {
      setIsOpenAlertWindow({
        status: false,
        message: message,
      });
      setBlockCreateButton(false);
    }, 2000);
  };

  const getFormatedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const shiftLength = groups.find(
      (group) => group.id === groupId
    ).shiftLength;
    const formatHour = Math.floor(hour / shiftLength);

    let start, end;

    start = formatHour * shiftLength;
    end = start + shiftLength;
    start = date + " " + start + ":00";
    end = date + " " + end + ":00";
    return {
      start,
      end,
    };
  };

  const clickOnEmptySpace = (groupId, time) => {
    if (!isCreateMode && !isEditMode) return;
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const shiftLength = groups.find(
      (group) => group.id === groupId
    ).shiftLength;
    const formatHour = Math.floor(hour / shiftLength);

    const formatedDate = getFormatedDate(groupId, time);

    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date: date,
      grid: addGrid(formatHour, shiftLength),
      start_time: moment(formatedDate.start).valueOf(),
      end_time: moment(formatedDate.end).valueOf(),
      itemTouchSendsClick: false,
      itemProps: { style: { background: "gray" } },
    };
    setItemsPreOrder((pred) => [...pred, obj]);
  };

  const clearFilter = () => {
    localStorage.clear("toolsFilter");
    setSelectedGroups([]);
  };

  const choseCount = (e) => {
    setToolsCount(e.target.value);
  };

  const showDatePicker = () => {
    setIsActiveDate((current) => !current);
  };

  const mapToolsNames = () => {
    return [...new Set(groups.map((group) => group.category))];
  };

  const getGroupsToShow = () => {
    return selectedGroups.length
      ? groups.filter((group) => selectedGroups.includes(group.category))
      : groups;
  };

  const clickOnItem = (_time, itemId) => {
    const item = itemId
      ? itemsPreOrder.find((item) => item.id === itemId)
      : null;
    if (!item) return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const openBookingWindow = (time, posX, posY, kindModal, itemId) => {
    const item = itemId ? items.find((item) => item.id === itemId) : null;
    if (!item || item.status === "preOrder" || isEditMode) return;
    setIsActiveMessage((current) => !current);
    const formatedDate = getFormatedDate(item.group, time);
    const date = moment(time).format("YYYY-MM-DD");
    const result = date + " " + formatedDate.start + " - " + formatedDate.end;

    setChosenDate({
      date: result,
      posX: posX,
      posY: posY,
      kindModal,
      item: item,
    });
  };

  const changeMode = () => {
    setIsCreateMode((previousUpdate) => !previousUpdate);
  };

  const restoreEditItems = () => {
    setItemsPreOrder(
      copyEditItems.map((el) => {
        return {
          ...el,
          itemProps: { style: { background: "gray" } },
        };
      })
    );
  };

  const restoreAndCloseEditMode = () => {
    setItems((previousUpdate) => previousUpdate.concat(copyEditItems));
    setItemsPreOrder([]);
    setCopyEditItems([]);
    setIsEditMode((previousUpdate) => !previousUpdate);
  };

  const clearAndChangeMode = () => {
    setIsCreateMode((previousUpdate) => !previousUpdate);
    setItemsPreOrder([]);
  };

  const closeBookingWindow = () => {
    setIsActiveMessage((current) => !current);
  };

  // console.log("items:", items)
console.log(getGroupsToShow());
console.log(items);
  return !isLoading && !isLoadingEquipment  ? (
    <>
      {isBookingMenu
      ? <BookingMenu 
      //! Нужные
      setIsBookingMenu={setIsBookingMenu}
      selectedGroups={selectedGroups}
      //!
      groups={
        toolsCount
          ? getGroupsToShow().slice(0, toolsCount)
          : getGroupsToShow()
      }
      toolsCount={toolsCount}
      isActiveDate={isActiveDate}
      orderDate={orderDate}
      openBookingWindow={openBookingWindow}
      items={items}
      clickOnEmptySpace={clickOnEmptySpace}
      clickOnItem={clickOnItem}
      />
      
      : <>
        <div className="container sort-box">
          <div className="sort-box_item">
            <ToolsFilter
              toolNames={mapToolsNames()}
              onInputChange={handleInputChange}
              selectedGroups={selectedGroups}
              clearFilter={clearFilter}
            />
            {selectedGroups.length ? (
              <CountTools
                choseCount={choseCount}
                groupsCount={getGroupsToShow()}
              />
            ) : null}
          </div>
          <div className="sort-box_item">
            {isAdmin ? (
              <>
                <CompaniesSelect companies={companies} />
              </>
            ) : null}

            <DateFilter
              showDatePicker={showDatePicker}
              isActiveDate={isActiveDate}
              setOrderDate={setOrderDate}
              orderDate={orderDate}
            />
          </div>
          <div className="sort-box_item">{/* <CountOrderFilter /> */}</div>

          <ButtonBoxComponent
            setIsBookingMenu={setIsBookingMenu}
            isEditMode={isEditMode}
            sendNewOrder={sendNewOrder}
            clearAndChangeMode={clearAndChangeMode}
            changeMode={changeMode}
            blockCreateButton={blockCreateButton}
            editOrder={editOrder}
            restoreAndCloseEditMode={restoreAndCloseEditMode}
            restoreEditItems={restoreEditItems}
            isCreateMode={isCreateMode}
          />
        </div>

        <TimeLineRenderer
          groups={
            toolsCount
              ? getGroupsToShow().slice(0, toolsCount)
              : getGroupsToShow()
          }
          toolsCount={toolsCount}
          isActiveDate={isActiveDate}
          orderDate={orderDate}
          openBookingWindow={openBookingWindow}
          items={items.concat(itemsPreOrder)}
          clickOnEmptySpace={clickOnEmptySpace}
          clickOnItem={clickOnItem}
        />
        {isActiveMessage ? (
          <MessageWindow
            closeBookingWindow={closeBookingWindow}
            data={chosenDate}
            editMode={editMode}
          />
        ) : null}
        {isOpenAlertWindow.status ? (
          <AlertWindow message={isOpenAlertWindow.message} />
        ) : null}
      </>
      }
    </>
  ) : (
    <Spiner />
  );
}
