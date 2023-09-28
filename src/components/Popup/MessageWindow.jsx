import React from "react";
import "../style.css";

export default function MessageWindow({
  data, closeBookingWindow, editMode, setSelectedCompany, setSelectedGroups, nameGroup,
}) {
  const heightModal = 185;
  const weightModal = 225;

  const isLeftPart = window.innerWidth / 2 - data.posX > 0;

  return (
    <div
      className="messageWindow"
      style={{
        left: isLeftPart ? data.posX : data.posX - weightModal,
        top: data.posY - heightModal,
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
            // role: ,
          });
        }}
      >
        Редактировать
      </button>
    </div>
  );
}
