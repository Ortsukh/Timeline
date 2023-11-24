/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  createEquipmentGroup,
  createOrderGroup,
} from "../common/DataConvertHelper";
import Spinner from "../components/Spinner/Spinner";

import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";

import BookingMenu from "../components/BookingMenuComponents/BookingMenu";
import Overlay from "../components/BookingMenuComponents/BookingDateColumn/components/Overlay";
import EquipmentInfoWindow from "../components/Popup/EquipmentInfoWindow";
import sortingArrayGroups from "../constants/priorityGroups";
import useTimelineData from "../hooks/useTimelineData";
import Swal from "sweetalert2";
import showNetwork from "../components/Alert/showNetwork";

export default function BookingPage({orderId, isMainLessee, categoryId}) {
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
  const [isEquipmentInfoWindowOpen, setIsEquipmentInfoWindowOpen] = useState(null);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const {
    userData,
    companiesData,
    allEquipmentData,
    loading,
    allOrderData,
  } = useTimelineData(isMainLessee, update);

  useEffect(() => {
    if (loading) return;
    setUser(userData);
    setCompanies(companiesData);
    setGroups(sortingArrayGroups(createEquipmentGroup(allEquipmentData)));
    setItems(createOrderGroup(allOrderData, userData));
    if (userData.role === "ROLE_COMPANY") {
      setSelectedCompany(userData);
    }
  }, [loading,update]);
  useEffect(() => {

    if(!items.length) return
    if(orderId){
      setIsEditMode(true)
      const editItem = items.find(item => item.rentOrderId.toString() === orderId)
      if(!editItem) {
        Swal.fire({
          icon: "error",
          text: `Не найдет заказ с таким номером`,
          timer: 2000,
          didClose: ()=> {
            const { origin } = window.location;
            const { pathname } = window.location;
            window.location.replace(`${origin}${pathname}?page=main_dashboard`);
          }
        });
        return
      }
        setSelectedCompany(editItem.company)
        setEditOrderData(editItem)
      setCurrentDevice(groups.find((group) => editItem.group === group.id));
    }else {
      console.log(categoryId, groups)
      console.log(groups.find((group) => categoryId === group.id))
      setCurrentDevice(categoryId? groups.find((group) => categoryId === group.id) : groups[0]);

    }
  }, [orderId, items ]);

  const openAlertWindow = (message) => {
    showNetwork(message);
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
  return !loading && currentDevice  ? (
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
        {isEquipmentInfoWindowOpen && (
          <EquipmentInfoWindow
            isEquipmentInfoWindowOpen={isEquipmentInfoWindowOpen}
            setIsEquipmentInfoWindowOpen={setIsEquipmentInfoWindowOpen}
            isOpenOverlay={isOpenOverlay}
            setIsOpenOverlay={setIsOpenOverlay}
          />
        )}
        {/* {isOpenAlertWindow.status ? (
          <AlertWindow message={isOpenAlertWindow.message} />
        ) : null} */}
      </div>
    </>
  ) : (
    <Spinner />
  );
}
