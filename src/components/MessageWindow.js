import React from "react";
import "./style.css";

export default function MessageWindow({ data, closeBookingWindow, editMode }) {
  const heightModal = 185;
  const weightModal = 225;

  const isLeftPart = window.innerWidth / 2 - data.posX > 0;
  const modalConstants = {
    clickOnEmpty: {
      companyName: null,
      buttonName: "Забранировать",
    },
    clickOnOrder: {
      companyName: "Название компании:",
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

      {modalConstants[data.kindModal].companyName ? (
        <div className="messageWindow-item">
          <span>{modalConstants[data.kindModal].companyName}</span>
          <span>{data.item.company.name}</span>
        </div>
      ) : null}


        <div className="messageWindow-item">
        <span>{"Статус:"}</span>
        <span>{data.item.status}</span>
      </div>
        <button className="button-submit reserved-btn" onClick={(e)=> editMode(e, data.item)}>Редактировать</button>
 
        
      
    </div>
  );
}
