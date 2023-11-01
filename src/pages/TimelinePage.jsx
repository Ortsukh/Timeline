/* eslint-disable no-undef */
import moment from "moment";
import React, { useState, useEffect } from "react";

import { Tooltip } from "react-tooltip";
import {
  createEquipmentGroup, createOrderGrid,
  createOrderGroup, formatOrder,
} from "../common/DataConvertHelper";
import ToolsFilter from "../components/FilterComponents/ToolsFilter";
// eslint-disable-next-line
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
  getUser, sendEditOrder,
} from "../Api/API";
import AlertWindow from "../components/Popup/AlertWindow";
import BookingMenu from "../components/BookingMenuComponents/BookingMenu";
import styleConflict
  from "../components/BookingMenuComponents/BookingDateColumn/ConflictResolutionWindow/Conflict.module.css";
import { generateClue } from "../common/GenerateElementsData";
import CompaniesSelect from "../components/FilterComponents/CompaniesSelect";
import buttonTitleConstants from "../constants/buttonTitleConstants";
import ConfirmWindow from "../components/Popup/ConfirmWindow";
import EquipmentInfoWindow from "../components/Popup/EquipmentInfoWindow";
import Overlay from "../components/BookingMenuComponents/BookingDateColumn/components/Overlay";
import sortingArrayGroups from "../constants/priorityGroups";

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
  const [editOrderItems, setEditOrderItems] = useState(null);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [isOpenAlertWindow, setIsOpenAlertWindow] = useState({ status: false, message: "" });
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
  const [isConfirmWindowOpen, setIsConfirmWindowOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isEquipmentInfoWindowOpen, setIsEquipmentInfoWindowOpen] = useState(null);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);

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
    // console.log(user);
    setIsLoadingEquipment(true);
    if (!user) return;
    if (user && user.role === "ROLE_MANAGER" && false) { //! для дева!
    // if (user && user.role === "ROLE_MANAGER") {
      getManagerEquipments().then((response) => {
        setGroups(sortingArrayGroups(createEquipmentGroup(response.data)));
        setIsLoadingEquipment(false);
      });
    } else {
      getAllEquipments().then((response) => {
        setGroups(sortingArrayGroups(createEquipmentGroup(response.data)));
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
    const { shiftLength, workTime } = groups.find((group) => group.id === groupId);
    const startWorkDay = Number(workTime.shiftTimes.start.split(":")[0]);
    const date = moment(time).format("YYYY-MM-DD");
    const formatHour = Math.floor((moment(time).hours() - startWorkDay) / shiftLength);

    let start;
    let end;

    start = formatHour * shiftLength + startWorkDay;
    end = start + shiftLength;
    start = `${date} ${start}:00`;
    end = `${date} ${end}:00`;
    return {
      start,
      end,
    };
  };

  const sendNewStatusOrder = (status) => {
    const orderItemsGrid = createOrderGrid(editOrderItems);
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
        setCurrentDevice([]);
        setIsConfirmWindowOpen(false);
        setEditOrderItems(null);
        setEditOrderData(null);
        setUpdate((previousUpdate) => !previousUpdate);
      })
      .catch(() => openAlertWindow("error"));
  };

  const clearFilter = () => {
    localStorage.clear("toolsFilter");
    setSelectedGroups([]);
    setToolsCount(0);
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
      !["pending", "accepted"].includes(item.status)
    ) return;
    if (user.role === "ROLE_COMPANY") {
      return;
    }
    if (!item || item.status === "preOrder" || isEditMode) return;
    setIsActiveMessage((current) => !current);
    const formattedDate = getFormattedDate(item.group, time);
    const date = moment(time).format("YYYY-MM-DD");
    const result = `${date} / ${moment(formattedDate.start).format(
      "HH:mm",
    )}-${moment(formattedDate.end).format("HH:mm")}`;
    setEditOrderItems(items.filter((currentItem) => currentItem.rentOrderId === item.rentOrderId));
    setEditOrderData(item);
    setChosenDate({
      date: result,
      posX,
      posY,
      kindModal,
      item,
    });
  };

  const openConfirmWindow = (status) => {
    setIsActiveMessage(false);
    setIsConfirmWindowOpen(status);
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

  const getFilteredItemsByCompany = (companyId) => (
    items.filter((item) => item.company.id === companyId)
  );
  const closeBookingWindow = () => {
    setIsActiveMessage((current) => !current);
  };
  return !isLoading && !isLoadingEquipment ? (
    <>
      {isOpenOverlay && (
      <Overlay openOverLay={setIsOpenOverlay} isAddNewItem={false} />
      )}
      <div>
        {isBookingMenu ? (
          <BookingMenu
            setIsBookingMenu={setIsBookingMenu}
            selectedGroups={selectedGroups}
            setUpdate={setUpdate}
            groups={
            toolsCount
              ? getGroupsToShow().slice(0, toolsCount)
              : getGroupsToShow()
          }
            editOrderData={editOrderData}
            isEditMode={isEditMode}
            items={items}
            currentDevice={currentDevice}
            setCurrentDevice={setCurrentDevice}
            setIsEditMode={setIsEditMode}
            openAlertWindow={openAlertWindow}
            setShowButtonClear={setShowButtonClear}
            user={user}
            selectedCompany={selectedCompany}
            setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
            isOpenOverlay={isOpenOverlay}
            setIsOpenOverlay={setIsOpenOverlay}
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
                    {buttonTitleConstants.ADD_NEW}
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
              items={selectedCompany ? getFilteredItemsByCompany(selectedCompany.id) : items}
              clickOnItem={clickOnItem}
              setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
            />
            {(isActiveMessage) && (
            <MessageWindow
              closeBookingWindow={closeBookingWindow}
              data={chosenDate}
              editMode={editMode}
              setSelectedCompany={setSelectedCompany}
              setSelectedGroups={setSelectedGroups}
              nameGroup={groups.find((el) => +el.id === +chosenDate.item.group)}
              openConfirmWindow={openConfirmWindow}
              user={user}
            />
            )}

          </>
        )}
        {isConfirmWindowOpen && (
        <ConfirmWindow
          selectedCompany={editOrderData.company}
          data={editOrderItems}
          groups={groups}
          closeBookingWindow={setIsConfirmWindowOpen}
          confirmFunc={() => sendNewStatusOrder(isConfirmWindowOpen)}
          isConfirmWindowOpen={isConfirmWindowOpen}
        />
        )}
        {isEquipmentInfoWindowOpen && (
        <EquipmentInfoWindow
          isEquipmentInfoWindowOpen={isEquipmentInfoWindowOpen}
          setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
          isOpenOverlay={isOpenOverlay}
          setIsOpenOverlay={setIsOpenOverlay}
        />
        )}
        {isOpenAlertWindow.status ? (
          <AlertWindow message={isOpenAlertWindow.message} />
        ) : null}
      </div>
    </>
  ) : (
    <Spinner />
  );
}
