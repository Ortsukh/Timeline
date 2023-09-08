import React from "react";
import "../style.css";

export default function ConfirmWindow({
  data,
  closeBookingWindow,
  confirmFunc,
}) {
  let fullPrice = 0;
  const orderItems = [];
  data.forEach((item, index) => {
    fullPrice += +item.pricePerShift;
    orderItems.push(
      <div className="order" key={`${item.item} + ${item.shiftDate}`}>
        <div className="numberOrder">
          {`#${index + 1}`}
        </div>
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
      </div>,
    );
  });
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
      <span>
        Общая стоимость:
        {" "}
        {fullPrice}
        р
      </span>
      <div className="confirmWindow">
        {orderItems}
      </div>
      <div className="orderBtn">
        <button type="button" className="button-submit reserved-btn" onClick={confirmFunc}>
          Подтвердить
        </button>
      </div>
    </div>
  );
}
