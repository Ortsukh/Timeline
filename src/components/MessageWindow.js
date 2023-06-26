import React from "react";
import "./style.css";

export default function MessageWindow({ data, closeBookingWindow }) {
  const heightModal = 185;
  const weightModal = 225;

  const isLeftPart = window.innerWidth / 2 - data.posX > 0;
  console.log(data);
  const modalConstants = {
    clickOnEmpty: {
      companieName: null,
      buttonName: "Забранировать",
    },
    clickOnOrder: {
      companieName: "Название компании:",
      buttonName: null,
    },
  };

  return (
    <div
      className="messageWindow"
      style={{
        left: isLeftPart ? data.posX : data.posX - weightModal,
        top: data.posY - heightModal,
      }}
    >
      <button className="button-close" onClick={closeBookingWindow}>
        x
      </button>
      <div className="messageWindow-item">
        <span>Cмена:</span>
        <span>{data.date}</span>
      </div>

      {modalConstants[data.kindModal].companieName ? (
        <div className="messageWindow-item">
          <span>{modalConstants[data.kindModal].companieName}</span>
          <span>{data.item.companie.name}</span>
        </div>
      ) : null}

      {modalConstants[data.kindModal].buttonName ? (
        <button className="button-submit reserved-btn">Забронировать</button>
      ) : (
        <div className="messageWindow-item">
          <span>{"Статус:"}</span>
          <span>{data.item.status}</span>
        </div>
      )}
    </div>
  );
}
