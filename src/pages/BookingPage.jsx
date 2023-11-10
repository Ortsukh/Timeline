/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  createEquipmentGroup,
  createOrderGroup,
} from "../common/DataConvertHelper";
import Spinner from "../components/Spinner/Spinner";

import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";
import {
  getAllEquipments,
  getAllOrders,
  getCompanies,
  getUser,
} from "../Api/API";
import AlertWindow from "../components/Popup/AlertWindow";
import BookingMenu from "../components/BookingMenuComponents/BookingMenu";
import Overlay from "../components/BookingMenuComponents/BookingDateColumn/components/Overlay";
import sortingArrayGroups from "../constants/priorityGroups";

export default function BookingPage({orderId}) {
  const [groups, setGroups] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(true);
  const [editOrderData, setEditOrderData] = useState(null);
  const [isOpenAlertWindow, setIsOpenAlertWindow] = useState({ status: false, message: "" });
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [user, setUser] = useState(null);
  const [isClickingOnEmptyFilter, setIsClickingOnEmptyFilter] = useState(false);
  const [showButtonClear, setShowButtonClear] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isClickedOnNew, setIsClickedOnNew] = useState(false);

  const [, setIsBookingMenu] = useState(false);
  const [, setIsEquipmentInfoWindowOpen] = useState(null);
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
    setIsLoadingEquipment(true);
    if (!user) return;
    getAllEquipments().then((response) => {
      setGroups(sortingArrayGroups(createEquipmentGroup(response.data)));
      setIsLoadingEquipment(false);
    });
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

  useEffect(() => {
    if(!items.length) return
    console.log('up')
    console.log(orderId)
    if(orderId){
      setIsEditMode(true)
      const editItem = items.find(item => item.rentOrderId.toString() === orderId)
        setSelectedCompany(editItem.company)
        setEditOrderData(editItem)
      setCurrentDevice(groups.find((group) => editItem.group === group.id));
    }else {
      console.log('else')
      setCurrentDevice(groups[0]);

    }
  }, [orderId, items, selectedCompany ]);

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
  const mapToolsNames = () => [
    ...new Set(groups.map((group) => group.category)),
  ];

  const handleInputChange = (newInput) => {
    setCurrentDevice(
      groups.filter((group) => group.category === newInput)[0],
    );
  };

  const filterProps = {
    mapToolsNames,
    handleInputChange,
    isClickingOnEmptyFilter,
    setIsClickingOnEmptyFilter,
    setShowButtonClear,
    selectedCompany,
    companies,
    setSelectedCompany,
    isClickedOnNew,
  };

  return !isLoading && !isLoadingEquipment && currentDevice  ? (
    <>
      {isOpenOverlay && (
        <Overlay openOverLay={setIsOpenOverlay} isAddNewItem={false} />
      )}
      <div>
        <BookingMenu
          setIsBookingMenu={setIsBookingMenu}
          selectedGroups={selectedGroups}
          setUpdate={setUpdate}
          groups={groups}
          editOrderData={editOrderData}
          isEditMode={isEditMode}
          items={items}
          currentDevice={currentDevice || groups[0]}
          setCurrentDevice={setCurrentDevice}
          setIsEditMode={setIsEditMode}
          openAlertWindow={openAlertWindow}
          setShowButtonClear={setShowButtonClear}
          user={user}
          selectedCompany={selectedCompany}
          setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
          isOpenOverlay={isOpenOverlay}
          setIsOpenOverlay={setIsOpenOverlay}
          // fromDashBoard
          isFromDashboard
          filterProps={filterProps}
        />

        {isOpenAlertWindow.status ? (
          <AlertWindow message={isOpenAlertWindow.message} />
        ) : null}
      </div>
    </>
  ) : (
    <Spinner />
  );
}
