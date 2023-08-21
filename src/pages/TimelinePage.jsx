/* eslint-disable no-undef */
import moment from "moment";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  addGrid,
  createEquipmentGroup,
  createOrderGroup,
} from "../common/DataConvertHelper";
import ToolsFilter from "../components/FilterComponents/ToolsFilter";
import CountTools from "../components/FilterComponents/CountToolsFilter";
import DateFilter from "../components/FilterComponents/DateFilter";
import Spiner from "../components/Spiner/Spiner";
import MessageWindow from "../components/Popup/MessageWindow";
import TimeLineRenderer from "../components/TimeLineRenderer";
import CompaniesSelect from "../components/FilterComponents/CompaniesSelect";
import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";
import {
  getAllEqupments, getAllEqupments1, getAllOrders, getAllOrders1,
} from "../Api/API";
import AlertWindow from "../components/Popup/AlertWindow";
import BookingMenu from "../components/BookingMenuComponents/BookingMenu";

export default function TimelinePage() {
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsPreOrder, setItemsPreOrder] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
  const [isActiveDate, setIsActiveDate] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [isOpenAlertWindow, setIsOpenAlertWindow] = useState({
    status: false,
    message: "",
  });
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(groups[0]);
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
  const [isClickingOnEmptyFilter, setIsClickingOnEmptyFilter] = useState(false);
  const [showButtonClear, setShowButtonClear] = useState(true);
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
    setSelectedGroups(() => [newInput]);
  };

  const editMode = (_e, order) => {
    setIsEditMode(true);
    setIsActiveMessage(false);
    setCurrentDevice(groups.find((group) => order.group === group.id));
    setEditOrderData(order);
    setIsBookingMenu(true);
  };

  const operAlertWindow = (message) => {
    setIsOpenAlertWindow({
      status: true,
      message,
    });
    setTimeout(() => {
      setIsOpenAlertWindow({
        status: false,
        message,
      });
    }, 2000);
  };

  const getFormatedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const { shiftLength } = groups.find(
      (group) => group.id === groupId,
    );
    const formatHour = Math.floor(hour / shiftLength);

    let start; let
      end;

    start = formatHour * shiftLength;
    end = start + shiftLength;
    start = `${date} ${start}:00`;
    end = `${date} ${end}:00`;
    return {
      start,
      end,
    };
  };

  const clickOnEmptySpace = (groupId, time) => {
    if (!isEditMode) return;
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const { shiftLength } = groups.find(
      (group) => group.id === groupId,
    );
    const formatHour = Math.floor(hour / shiftLength);

    const formatedDate = getFormatedDate(groupId, time);

    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date,
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
    setToolsCount(0);
  };

  const choseCount = (e) => {
    setToolsCount(e.target.value);
  };

  const showDatePicker = () => {
    setIsActiveDate((current) => !current);
  };

  const mapToolsNames = () => [...new Set(groups.map((group) => group.category))];

  const getGroupsToShow = () => (selectedGroups.length
    ? groups.filter((group) => selectedGroups.includes(group.category))
    : groups);

  const clickOnItem = (_time, itemId) => {
    const item = itemId
      ? itemsPreOrder.find((el) => el.id === itemId)
      : null;
    if (!item) return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const openBookingWindow = (time, posX, posY, kindModal, itemId) => {
    const item = itemId ? items.find((el) => el.id === itemId) : null;
    if (!item || item.status === "preOrder" || isEditMode) return;
    setIsActiveMessage((current) => !current);
    const formatedDate = getFormatedDate(item.group, time);
    const date = moment(time).format("YYYY-MM-DD");
    const result = `${date} ${formatedDate.start} - ${formatedDate.end}`;

    setChosenDate({
      date: result,
      posX,
      posY,
      kindModal,
      item,
    });
  };

  const createBook = () => {
    console.log(123123);
    console.log(selectedGroups);
    if (selectedGroups.length === 0) {
      setIsClickingOnEmptyFilter(true);
    } else {
      setCurrentDevice(
        groups.filter((group) => selectedGroups.includes(group.category))[0],
      );
      setIsBookingMenu(true);
    }
  };

  const closeBookingWindow = () => {
    setIsActiveMessage((current) => !current);
  };

  return !isLoading && !isLoadingEquipment ? (
    <div>
      {isBookingMenu ? (
        <BookingMenu
          //! Нужные
          setIsBookingMenu={setIsBookingMenu}
          selectedGroups={selectedGroups}
          //!
          setUpdate={setUpdate}
          groups={
            toolsCount
              ? getGroupsToShow().slice(0, toolsCount)
              : getGroupsToShow()
          }
          allGroups={groups}
          isEditMode={isEditMode}
          editOrderData={editOrderData}
          orderDate={orderDate}
          items={items}
          clickOnEmptySpace={clickOnEmptySpace}
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
          setIsEditMode={setIsEditMode}
          operAlertWindow={operAlertWindow}
          //! ToolsFilter->
          toolNames={mapToolsNames()}
          onInputChange={handleInputChange}
          clearFilter={clearFilter}
          isClickingOnEmptyFilter={isClickingOnEmptyFilter}
          setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
          setShowButtonClear={setShowButtonClear}
          showButtonClear={showButtonClear}
          //! <-ToolsFilter
        />
      ) : (
        <>
          <div className="container sort-box">
            <div className="sort-box_item">
              <ToolsFilter
                toolNames={mapToolsNames()}
                onInputChange={handleInputChange}
                selectedGroups={selectedGroups}
                clearFilter={clearFilter}
                isClickingOnEmptyFilter={isClickingOnEmptyFilter}
                setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
                showButtonClear={showButtonClear}
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
                <CompaniesSelect companies={companies} />
              ) : null}

              <DateFilter
                showDatePicker={showDatePicker}
                isActiveDate={isActiveDate}
                setOrderDate={setOrderDate}
                orderDate={orderDate}
              />
            </div>
            <div className="sort-box_item">{/* <CountOrderFilter /> */}</div>
            <div className="sort-box_item">
              <div>
                <button type="button" className="reserved-btn" onClick={createBook}>
                  Добавить новый
                </button>
              </div>
            </div>
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
            setIsBookingMenu={setIsBookingMenu}
            setSelectedGroups={setSelectedGroups}
            setCurrentDevice={setCurrentDevice}
          />
          {isActiveMessage && (
            <MessageWindow
              closeBookingWindow={closeBookingWindow}
              data={chosenDate}
              editMode={editMode}
            />
          )}
          {isOpenAlertWindow.status ? (
            <AlertWindow message={isOpenAlertWindow.message} />
          ) : null}
        </>
      )}
    </div>
  ) : (
    <Spiner />
  );
}
