import React from "react";
import "../style.css";
import moment from "moment";
// import orderStatus from "../../constants/constants";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function MessageWindow({
  data,
  closeBookingWindow,
  editMode,
  setSelectedCompany,
  setSelectedGroups,
  nameGroup,
  openConfirmWindow,
  user,
}) {
  const heightModal = 250;
  const weightModal = 225;
  const isLeftPart = window.innerWidth / 2 - data.posX > 0;
  const isBottomPart = window.innerHeight / 2 - data.posY > 0;

  const statusDisplay = (date, status) => {
    if (status === "pending") return "Новый";
    if (status === "accepted") {
      const completionDate = date.replace(/\/ \d{2}:\d{2}-/, "");
      const isCompleted = moment(completionDate, "YYYY-MM-DD HH:mm").isBefore(moment());
      return isCompleted ? "Завершён" : "В работе";
    }
    return "Отклонён";
  };

  return (
    <div
      className="messageWindow"
      style={{
        left: isLeftPart ? data.posX : data.posX - weightModal,
        top: isBottomPart ? data.posY : data.posY - heightModal,
      }}
    >
      <button type="button" className="button-close" onClick={closeBookingWindow}>
        x
      </button>
      <div className="messageWindow-item status-messageWindow">
        <span>Заказ:</span>
        <span>{`№ ${data.item.rentOrderId}`}</span>
      </div>
      <div className="" style={{ fontWeight: "600" }}>
        <span />
        {data.item.duration.isMoreDay
          ? <span>{`с ${moment(data.item.duration.start_order).format("D.MM.YYYY")} по ${moment(data.item.duration.end_order).format("D.MM.YYYY")}`}</span>
          : <span>{moment(data.item.duration.start_order).format("D.MM.YYYY")}</span>}
      </div>
      <div className="messageWindow-item status-messageWindow">
        <span>Статус:</span>
        {/* <span>{orderStatus[data.item.status]?.translatRU}</span> */}
        <span>{statusDisplay(data.date, data.item.status)}</span>
      </div>
      {user.role === "ROLE_MANAGER"
        && (
        <div className="messageWindow-item">
          <span>Арендатор:</span>
          <span>{data.item.company?.name}</span>
        </div>
        )}
      {data.item.comment
        && (
        <div className="messageWindow-item">
          <span>Комментарий к заказу:</span>
          <span style={{
            wordWrap: "break-word", hyphens: "auto", fontStyle: "italic", backgroundColor: "#c7c3a1", borderRadius: "5px",
          }}
          >
            `
            {data.item.comment}
            `
          </span>
        </div>
        )}
      {data.item.status === "pending"
        && (
          <>
            <button
              type="button"
              className="button-submit button-select-date"
              onClick={(e) => {
                editMode(e, data.item);
                setSelectedGroups(nameGroup.category);
                localStorage.setItem("toolsFilter", nameGroup.category);
                setSelectedCompany({
                  id: data.item.company.id,
                  name: data.item.company.name,
                });
              }}
            >
              {buttonTitleConstants.EDIT}
            </button>
            {user.role === "ROLE_MANAGER"
          && (
          <div className="btn-messageWindow">
            <button
              type="button"
              className="button-submit reserved-btn"
              onClick={() => {
                openConfirmWindow("accepted");
              }}
            >
              {buttonTitleConstants.CONFIRM}
            </button>
            <button
              type="button"
              className="button-submit clear-button"
              onClick={() => {
                openConfirmWindow("rejected");
              }}
            >
              {buttonTitleConstants.REJECT}
            </button>
          </div>
          )}
          </>
        )}
    </div>
  );
}
