import React, { useState } from "react";
import "../style.css";
import moment from "moment";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function ConfirmWindow({
  data,
  groups,
  closeBookingWindow,
  confirmFunc,
  selectedCompany,
  isConfirmWindowOpen,
}) {
  const [comment, setComment] = useState(data[0]?.comment || "");
  let totalForCreate = 0;
  const totalForEdit = data[0]?.totalOrder;
  const sortingByDate = (array) => {
    array.sort((a, b) => {
      if (moment(a.date).isBefore(moment(b.date))) return -1;
      if (moment(a.date).isAfter(moment(b.date))) return 1;
      return 0;
    });
    return array;
  };

  const orderItems = [];
  sortingByDate(data).forEach((item, index) => {
    const group = groups.find((groupItem) => groupItem.id === item.group);
    totalForCreate += +group.price;
    const titleForCreate = group.title;
    const titleForEdit = item.groupName;
    orderItems.push(
      <div className="order" key={`${item.id}-${+item.group + +item.shiftTime}`}>
        <div className="numberOrder">
          {`#${index + 1}`}
        </div>
        <div>
          <div className="messageWindow-item">
            <span>Дата: </span>
            <span>{item.date}</span>
          </div>
          <div className="messageWindow-item">
            <span>Оборудование:</span>
            <span>{titleForEdit || titleForCreate}</span>
            {/* <span>{item.groupName}</span> */}
          </div>

          <div className="messageWindow-item">
            <span>Смена:</span>
            <span>{item.grid.indexOf("1")}</span>
          </div>
        </div>
      </div>,
    );
  });

  return (
    <div
      role="presentation"
      className="messageWindow-overlay"
      // onClick={() => closeBookingWindow(false)}
    >
      <div className="messageWindow rentOrderPopup" style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <button
          type="button"
          className="button-close"
          onClick={() => closeBookingWindow(false)}
        >
          x
        </button>
        <div className="titlePopup">Подтвердите Ваши действия</div>
        <div className="titlePopup">{`Арендатор: ${selectedCompany.name}`}</div>
        <span>{`Общая стоимость: ${totalForEdit || totalForCreate}р`}</span>
        <textarea
          id="comment"
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          style={{
            fontFamily: "Roboto, sans-serif", fontSize: "16px", width: "auto", height: "50px", resize: "none",
          }}
          maxLength="201"
          placeholder="Введите комментарий к заказу"
        />
        <div className="confirmWindow" style={{ borderTop: "2px solid rgb(39, 128, 252)" }}>
          {orderItems}
        </div>
        <div className="orderBtn">
          <button
            type="button"
            className="button-submit reserved-btn"
            onClick={() => confirmFunc(comment)}
          >
            {isConfirmWindowOpen === "rejected" ? buttonTitleConstants.REJECT : buttonTitleConstants.CONFIRM}
          </button>
        </div>
      </div>
    </div>
  );
}
