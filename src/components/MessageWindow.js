import React from "react";
import "./style.css";

export default function MessageWindow(props) {

  return (
    <div className="messageWindow">
      <button className='button-close' onClick={props.closeBookingWindow}>x</button>
      <div className="messageWindow-item">
        <span>смена</span>
        <span>{props.date}</span>
      </div>
      <button className='button-submit reserved-btn'>Забронировать</button>
    </div>
  );
}
