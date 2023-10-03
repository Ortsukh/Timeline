import React from "react";
import "moment/locale/ru";
import "../../../style.css";
import { Tooltip } from "react-tooltip";
import MainConfInfo from "./InformationTablesConflicts/MainConfInfo";
import CompanyConfInfo from "./InformationTablesConflicts/CompanyConfInfo";
import ManagerSuccessConfInfo from "./InformationTablesConflicts/ManagerSuccessConfInfo";
import ManagerFailConfInfo from "./InformationTablesConflicts/ManagerFailConfInfo";
import { generateClue } from "../../../../common/GenerateElementsData";
import styleConflict from "./Conflict.module.css";
import WindowTimeline from "./WindowTimeline";
import CompanyDayConfInfo from "./InformationTablesConflicts/CompanyDayConfInfo";

export default function ConfirmBookingWindow({
  keyRerenderConflictResolutionWindow,
  user,
  items,
  groups,
  editOrderData,
  isEditMode,
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  showStartDisplayConflict,
  pushOrderInBasePreOrder,
  statusCheckboxSelected,
  handleSetSelectedConflictDate,
  selectedCompany,
  openAlertWindow,
}) {
  let calculatedOrSelectedDevice = null;
  if ("id" in baseOrder.equipment) {
    calculatedOrSelectedDevice = groups.find(
      (group) => group.id === baseOrder.equipment.id,
    );
  }
  console.log("baseOrder", baseOrder);
  console.log("selectedConflictDate", selectedConflictDate);

  return (
    <>
      {showStartDisplayConflict && <MainConfInfo />}

      {!showStartDisplayConflict && "conflicts" in baseOrder.equipment
        && (
        <div
          style={{
            width: "auto", margin: "0 auto", padding: "10px 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "20px", textAlign: "center", position: "relative",
          }}
        >
          {user.role === "ROLE_COMPANY" // В редактировании и в добавлении одинаковая информация
          && !selectedConflictDate
          && (
          <CompanyConfInfo
            baseOrder={baseOrder}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
          />
          )}

          {user.role === "ROLE_MANAGER"
          && baseOrder.equipment?.countConflicts === 0
          && !selectedConflictDate
          && (
          <ManagerSuccessConfInfo
            isEditMode={isEditMode}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
            selectedCompany={selectedCompany}
          />
          )}

          {user.role === "ROLE_MANAGER"
          && baseOrder.equipment?.countConflicts > 0
          && !selectedConflictDate
          && (
          <ManagerFailConfInfo
            countConflicts={baseOrder.equipment?.countConflicts}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
            selectedCompany={selectedCompany}
          />
          )}

          {selectedConflictDate
          && (
          <CompanyDayConfInfo
            baseOrder={baseOrder}
            selectedConflictDate={selectedConflictDate}
          />
          )}

          <div id="riddler" className={styleConflict.riddler}>?</div>
          <Tooltip anchorSelect="#riddler" openOnClick place="bottom">
            {generateClue("TIMELINE_ROLE_COMPANY_CONFLICT")}
          </Tooltip>
        </div>
        )}

      {selectedConflictDate && (
      <WindowTimeline
        key={keyRerenderConflictResolutionWindow} //! НЕ УДАЛЯТЬ. key ререндерит
        items={items}
        groups={groups}
        editOrderData={editOrderData}
        isEditMode={isEditMode}
        selectedConflictDate={selectedConflictDate}
        setSelectedConflictDate={setSelectedConflictDate}
        baseOrder={baseOrder}
        pushOrderInBasePreOrder={pushOrderInBasePreOrder}
        statusCheckboxSelected={statusCheckboxSelected}
        handleSetSelectedConflictDate={handleSetSelectedConflictDate}
        openAlertWindow={openAlertWindow}
      />
      )}
    </>
  );
}
