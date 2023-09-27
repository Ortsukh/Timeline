import React from "react";
import "../style.css";

export default function ConfirmWindow({
  data,
  groups,
  closeBookingWindow,
  confirmFunc,
  selectedCompany,
}) {
  let fullPrice = 0;

  const orderItems = [];
  data.forEach((item, index) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    fullPrice += +group.price;
    orderItems.push(
      <div className="order" key={`${item.id}`}>
        <div className="numberOrder">
          {`#${index + 1}`}
        </div>
        <div>
          <div className="messageWindow-item">
            <span>Оборудование:</span>
            <span>{group.title}</span>
          </div>
          <div className="messageWindow-item">
            <span>
              Смена
              :
            </span>
            <span>{item.grid.indexOf("1")}</span>
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
      <div className="titlePopup">{`Компания: ${selectedCompany.name}`}</div>
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
