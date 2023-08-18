import React from "react";
import "../style.css";

export default function ConfirmWindow({
  data,
  closeBookingWindow,
  confirmFunc,
}) {
  return (
    <div className="messageWindow rentOrderPopup">
      <button
        type="button"
        className="button-close"
        onClick={() => closeBookingWindow(false)}
      >
        x
      </button>
      <div className="titlePopup">Подтвердите ваш заказ</div>
      <div className="confirmWindow">
        {data.map((item) => (
          <div className="order">
            <div className="numberOrder">#1</div>
            <div>
              <div className="messageWindow-item">
                <span>Оборудование:</span>
                <span>{item.groupTitle}</span>
              </div>
              <div className="messageWindow-item">
                <span>
                  Смена
                  :
                </span>
                <span>{item.shiftDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="orderBtn">
        <button type="button" className="button-submit reserved-btn" onClick={confirmFunc}>
          Подтвердить
        </button>
      </div>
    </div>
  );
}
