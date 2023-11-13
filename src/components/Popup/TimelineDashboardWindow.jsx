import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import moment from "moment";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function TimelineDashboardWindow({
  item,
  close,
  user,
}) {
  const [sizeWindow, setSizeWindow] = useState({ width: 225, height: 250 });
  const refWindow = useRef(null);
  useEffect(() => {
    setSizeWindow({
      width: refWindow.current.clientWidth || 225,
      height: refWindow.current.clientHeight || 250,
    });
  }, []);

  const isRightSpace = window.innerWidth - item.posX > sizeWindow.width + 20;
  const isTopSpace = item.posY > sizeWindow.height + 20;
  const isBottomSpace = window.innerHeight - item.posY + window.scrollY > sizeWindow.height + 20;

  const statusDisplay = (status, end) => {
    if (status === "pending") return "Новый";
    if (status === "accepted") {
      const isCompleted = moment(end, "YYYY-MM-DD HH:mm").isBefore(moment());
      return isCompleted ? "Завершён" : "В работе";
    }
    return "Отклонён";
  };

  const handleEditOrder = (value) => {
    const { origin } = window.location;
    const { pathname } = window.location;
    close(item.id);
    if (value === "edit") {
      window.location.replace(`${origin}${pathname}?page=booking_menu&order_id=${item.rentOrderId}`);
    }
    if (value === "view") {
      window.location.replace(`${origin}${pathname}?page=booking_menu&order_id=${item.rentOrderId}&view=true`);
    }
  };

  return (
    <div
      className="messageWindow"
      ref={refWindow}
      style={{
        position: "absolute",
        left: isRightSpace ? item.posX : item.posX - sizeWindow.width,
        top: isBottomSpace || !isTopSpace
          ? item.posY + window.scrollY
          : item.posY - sizeWindow.height,
      }}
    >
      <button type="button" className="button-close" onClick={() => close(item.id)}>
        x
      </button>
      <div className="messageWindow-item status-messageWindow">
        <span>Заказ:</span>
        <span>{`№ ${item.rentOrderId}`}</span>
      </div>
      <div className="" style={{ fontWeight: "600" }}>
        <span />
        {item.duration.isMoreDay
          ? <span>{`с ${moment(item.duration.start_order).format("D.MM.YYYY")} по ${moment(item.duration.end_order).format("D.MM.YYYY")}`}</span>
          : <span>{moment(item.duration.start_order).format("D.MM.YYYY")}</span>}
      </div>
      <div className="messageWindow-item status-messageWindow">
        <span>Статус:</span>
        {/* <span>{orderStatus[item.item.status]?.translatRU}</span> */}
        <span>{statusDisplay(item.status, item.end_time)}</span>
      </div>
      {user === "manager"
        && (
        <div className="messageWindow-item">
          <span>Арендатор:</span>
          <span>{item.company?.name}</span>
        </div>
        )}
      {item.comment
        && (
        <div className="messageWindow-item">
          <span>Комментарий к заказу:</span>
          <span style={{
            wordWrap: "break-word", hyphens: "auto", fontStyle: "italic", backgroundColor: "#fffadf",
          }}
          >
            `
            {item.comment}
            `
          </span>
        </div>
        )}
      {user === "manager" && item.status === "pending"
        ? (
          <button
            type="button"
            className="reserved-btn reserve-timeline"
            style={{ width: "100%" }}
            onClick={() => handleEditOrder("edit")}
          >
            {buttonTitleConstants.EDIT}
          </button>
        )
        : (
          <button
            type="button"
            className="reserved-btn reserve-timeline"
            style={{ width: "100%" }}
            onClick={() => handleEditOrder("view")}
          >
            {buttonTitleConstants.VIEW}
          </button>
        )}
    </div>
  );
}
