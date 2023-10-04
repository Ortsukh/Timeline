import React from "react";
import "../style.css";

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
      <div className="messageWindow-item">
        <span>
          Смена
          :
        </span>
        <span>{data.date}</span>
      </div>

      <div className="messageWindow-item">
        <span>Статус:</span>
        <span>{data.item.status}</span>
      </div>
      <button
        type="button"
        className="button-submit reserved-btn"
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
        Редактировать
      </button>
      {user.role === "ROLE_MANAGER"
          && (
          <div>
            <button
              type="button"
              className="button-submit reserved-btn"
              onClick={() => {
                openConfirmWindow("accepted");
              }}
            >
              Подтвердить
            </button>
            <button
              type="button"
              className="button-submit reserved-btn"
              onClick={() => {
                openConfirmWindow("rejected");
              }}
            >
              Отклонить
            </button>
          </div>
          )}
    </div>
  );
}
