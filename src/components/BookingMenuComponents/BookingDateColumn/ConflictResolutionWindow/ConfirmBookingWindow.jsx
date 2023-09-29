import React from "react";
import "moment/locale/ru";
import "../../../style.css";
import { Tooltip } from "react-tooltip";
import WindowTimeline from "./WindowTimeline";
import MainConfInfo from "./InformationTablesConflicts/MainConfInfo";
import CompanyConfInfo from "./InformationTablesConflicts/CompanyConfInfo";
import ManagerSuccessConfInfo from "./InformationTablesConflicts/ManagerSuccessConfInfo";
import ManagerFailConfInfo from "./InformationTablesConflicts/ManagerFailConfInfo";
import { generateClue } from "../../../../common/GenerateElementsData";
import styleConflict from "./Conflict.module.css";

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
}) {
  let calculatedOrSelectedDevice = null;
  if ("id" in baseOrder.equipment) {
    calculatedOrSelectedDevice = groups.find(
      (group) => group.id === baseOrder.equipment.id,
    );
  }
  // console.log("user", user);

  return (
    <>
      {showStartDisplayConflict && <MainConfInfo />}

      {!showStartDisplayConflict
        && (
        <div style={{
          width: "auto", margin: "0 auto", padding: "10px 20px", fontSize: "20px", backgroundColor: "white", border: "1px solid #c1c1c1", borderRadius: "20px", textAlign: "center", position: "relative",
        }}
        >
          {user.role === "ROLE_COMPANY"
          && (
          <CompanyConfInfo
            baseOrder={baseOrder}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
          />
          )}

          {user.role === "ROLE_MANAGER"
          && "conflicts" in baseOrder.equipment
          && baseOrder.equipment?.conflicts.length === 0
          && (
          <ManagerSuccessConfInfo
            isEditMode={isEditMode}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
            selectedCompany={selectedCompany}
          />
          )}

          {user.role === "ROLE_MANAGER"
          && "conflicts" in baseOrder.equipment
          && baseOrder.equipment?.conflicts.length > 0
          && (
          <ManagerFailConfInfo
            baseOrder={baseOrder}
            calculatedOrSelectedDevice={calculatedOrSelectedDevice}
            selectedCompany={selectedCompany}
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
      />
      )}
    </>
  );
}
