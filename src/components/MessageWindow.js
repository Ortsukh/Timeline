import React from "react";
import "./style.css";

export default function MessageWindow(props) {

  return (
    <div className="messageWindow">
      <button className='button-close' onClick={props.closeBookingWindow}/>
      <span>смена</span>
      <span>{props.date}</span>
      <button className='button-submit'>Забронировать</button>
    </div>
  );
}
