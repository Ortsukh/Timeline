/* eslint-disable no-undef */
import moment from "moment";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Tooltip } from "react-tooltip";
import {
  addGrid,
  createEquipmentGroup,
  createOrderGroup,
} from "../common/DataConvertHelper";
import ToolsFilter from "../components/FilterComponents/ToolsFilter";
import CountTools from "../components/FilterComponents/CountToolsFilter";
import DateFilter from "../components/FilterComponents/DateFilter";
import Spinner from "../components/Spinner/Spinner";
import MessageWindow from "../components/Popup/MessageWindow";
import TimeLineRenderer from "../components/TimeLineRenderer";
import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";
import {
  getAllEquipments,
  getAllOrders,
  getCompanies, getManagerEquipments,
  getUser,
} from "../Api/API";
import AlertWindow from "../components/Popup/AlertWindow";
import BookingMenu from "../components/BookingMenuComponents/BookingMenu";
import styleConflict
  from "../components/BookingMenuComponents/BookingDateColumn/ConflictResolutionWindow/Conflict.module.css";
import { generateClue } from "../common/GenerateElementsData";
import CompaniesSelect from "../components/FilterComponents/CompaniesSelect";

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
  const [user, setUser] = useState(null);
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
  const [isClickedOnNew, setIsClickedOnNew] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    getUser().then((res) => {
      setUser(res);
      if (res.role === "ROLE_MANAGER") {
        getCompanies().then((response) => {
          setCompanies(response);
        });
      }
      if (res.role === "ROLE_COMPANY") {
        setSelectedCompany(res);
      }
    });
  }, []);

  useEffect(() => {
    console.log(user);
    setIsLoadingEquipment(true);
    if (!user) return;
    if (user && user.role === "ROLE_MANAGER" && false) {
      getManagerEquipments().then((response) => {
        setGroups(createEquipmentGroup(response.data));
        setIsLoadingEquipment(false);
      });
    } else {
      getAllEquipments().then((response) => {
        setGroups(createEquipmentGroup(response.data));
        setIsLoadingEquipment(false);
      });
    }
  }, [update, user]);

  useEffect(() => {
    setIsLoading(true);
    if (!user) return;

    getAllOrders()
      .then((response) => {
        setItems(createOrderGroup(response.data, user));
        if (user) setIsLoading(false);
      })

      .catch((error) => console.log(error));
  }, [update, user]);

  const handleInputChange = (newInput) => {
    localStorage.setItem("toolsFilter", newInput);
    setSelectedGroups(() => [newInput]);
    setToolsCount(0);
  };

  const editMode = (_e, order) => {
    setIsEditMode(true);
    setIsActiveMessage(false);
    setCurrentDevice(groups.find((group) => order.group === group.id));
    setEditOrderData(order);
    setIsBookingMenu(true);
  };

  const openAlertWindow = (message) => {
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

  const getFormattedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const { shiftLength } = groups.find((group) => group.id === groupId);
    const formatHour = Math.floor(hour / shiftLength);

    let start;
    let end;

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
    const { shiftLength } = groups.find((group) => group.id === groupId);
    const formatHour = Math.floor(hour / shiftLength);

    const formattedDate = getFormattedDate(groupId, time);

    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date,
      grid: addGrid(formatHour, shiftLength),
      start_time: moment(formattedDate.start).valueOf(),
      end_time: moment(formattedDate.end).valueOf(),
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

  const mapToolsNames = () => [
    ...new Set(groups.map((group) => group.category)),
  ];

  const getGroupsToShow = () => (selectedGroups.length
    ? groups.filter((group) => selectedGroups.includes(group.category))
    : groups);

  const clickOnItem = (_time, itemId) => {
    const item = itemId ? itemsPreOrder.find((el) => el.id === itemId) : null;
    if (!item) return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const openBookingWindow = (time, posX, posY, kindModal, itemId) => {
    const item = itemId ? items.find((el) => el.id === itemId) : null;
    if (
      item.status !== "pending"
    ) return;
    if (user.role === "ROLE_COMPANY" && user.id !== item.company.id) {
      return;
    }
    if (!item || item.status === "preOrder" || isEditMode) return;
    setIsActiveMessage((current) => !current);
    const formattedDate = getFormattedDate(item.group, time);
    const date = moment(time).format("YYYY-MM-DD");
    const result = `${date} : ${moment(formattedDate.start).format(
      "HH-mm",
    )} - ${moment(formattedDate.end).format("HH-mm")}`;

    setChosenDate({
      date: result,
      posX,
      posY,
      kindModal,
      item,
    });
  };

  const createBook = () => {
    if (selectedGroups.length === 0 || !selectedCompany) {
      setIsClickingOnEmptyFilter(true);
      setIsClickedOnNew(true);
    } else {
      setCurrentDevice(
        groups.filter((group) => selectedGroups.includes(group.category))[0],
      );
      setIsBookingMenu(true);
      setIsClickedOnNew(false);
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
          openAlertWindow={openAlertWindow}
          //! ToolsFilter->
          toolNames={mapToolsNames()}
          onInputChange={handleInputChange}
          clearFilter={clearFilter}
          isClickingOnEmptyFilter={isClickingOnEmptyFilter}
          setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
          setShowButtonClear={setShowButtonClear}
          showButtonClear={showButtonClear}
          user={user}
          companies={companies}
          selectedCompany={selectedCompany}
          //! <-ToolsFilter
        />
      ) : (
        <>
          <div className="container sort-box">
            <div className="sort-box_item">
              <ToolsFilter
                toolNames={mapToolsNames()}
                onInputChange={handleInputChange}
                clearFilter={clearFilter}
                isClickingOnEmptyFilter={isClickingOnEmptyFilter}
                setIsClickingOnEmptyFilter={setIsClickingOnEmptyFilter}
                showButtonClear={showButtonClear}
                setCurrentDeviceIndex={() => {}}
              />
              {selectedGroups.length ? (
                <CountTools
                  choseCount={choseCount}
                  groupsCount={getGroupsToShow()}
                  toolsCount={toolsCount}
                />
              ) : null}
            </div>
            <div className="sort-box_item">
              <DateFilter
                showDatePicker={showDatePicker}
                isActiveDate={isActiveDate}
                setOrderDate={setOrderDate}
                orderDate={orderDate}
              />
            </div>
            {user.role === "ROLE_MANAGER" && (
            <div className="sort-box_item">
              <CompaniesSelect
                selectedCompany={selectedCompany}
                companies={companies}
                setSelectedCompany={setSelectedCompany}
                isClickedOnNew={isClickedOnNew}
              />
            </div>

            )}
            <div className="sort-box_item">
              <div>
                <button
                  type="button"
                  className="reserved-btn"
                  onClick={createBook}
                >
                  Добавить новый
                </button>
              </div>
            </div>

            <div id="riddler" className={styleConflict.riddler}>?</div>
            <Tooltip anchorSelect="#riddler" openOnClick place="bottom">
              {generateClue(user.role === "ROLE_MANAGER" ? "TIMELINE_ROLE_MANAGER_MAIN" : "TIMELINE_ROLE_COMPANY_MAIN")}
            </Tooltip>
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
              setSelectedCompany={setSelectedCompany}
              setSelectedGroups={setSelectedGroups}
              nameGroup={groups.find((el) => +el.id === +chosenDate.item.group)}
            />
          )}

        </>
      )}
      {isOpenAlertWindow.status ? (
        <AlertWindow message={isOpenAlertWindow.message} />
      ) : null}
    </div>
  ) : (
    <Spinner />
  );
}
