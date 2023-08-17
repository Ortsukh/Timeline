import React from "react";
import "./style.css";

export default function ConfirmWindow({
  data,
  closeBookingWindow,
  confirmFunc,
}) {
  return (
    <div className="messageWindow ">
      <button
        className="button-close"
        onClick={() => closeBookingWindow(false)}
      >
        x
      </button>
      <div className="confirmWindow">
        {data.map((item) => {
          return (
            <div>
              <div className="messageWindow-item">
                <span>{"Оборудование:"}</span>
                <span>{item.groupTitle}</span>
              </div>
              <div className="messageWindow-item">
                <span>{"Смена"}:</span>
                <span>{item.shiftDate}</span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="button-submit reserved-btn" onClick={confirmFunc}>
        {"Применить"}
      </button>

      <button
        className="button-submit reserved-btn"
        onClick={() => closeBookingWindow(false)}
      >
        {"Отменить"}
      </button>
    </div>
  );
}
