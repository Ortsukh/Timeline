import React from "react";
import "./style.css";

export default function MessageWindow({ data, closeBookingWindow }) {
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
      <button className="button-close" onClick={closeBookingWindow}>
        x
      </button>
      <div className="messageWindow-item">
        <span>смена</span>
        <span>{data.date}</span>
      </div>
      <button className="button-submit reserved-btn">Забронировать</button>
    </div>
  );
}
