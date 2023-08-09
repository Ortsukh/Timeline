import React from "react";
import "./style.css";

export default function AlertWindow({ message }) {

  return (
    <div
      className="messageWindow"
      style={{
        left: "45%",
        top: "20%",
        height: "50px",
        alignItems: "center"
      }}
    >
      <div className="messageWindow-item">
        <span>{message}</span>
      </div>
    </div>
  );
}
