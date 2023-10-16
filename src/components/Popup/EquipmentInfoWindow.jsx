import React from "react";
import "../style.css";

export default function EquipmentInfoWindow({
  isEquipmentInfoWindowOpen, setIsEquipmentInfoWindowOpen,
}) {
  console.log("isEquipmentInfoWindowOpen", isEquipmentInfoWindowOpen);
  return (
    <div
      role="presentation"
      className="messageWindow-overlay"
      onClick={() => setIsEquipmentInfoWindowOpen(null)}
    >
      <div className="messageWindow rentOrderPopup">
        <button
          type="button"
          className="button-close"
          onClick={() => setIsEquipmentInfoWindowOpen(null)}
        >
          X
        </button>
        <div className="titlePopup">{isEquipmentInfoWindowOpen.title}</div>
        <div style={{
          width: "auto", height: "100px", textAlign: "center", marginTop: "10px",
        }}
        >
          <img src={isEquipmentInfoWindowOpen.img} alt="description" />
        </div>
        <p style={{ margin: "10px 0 0" }}>
          <span style={{ fontWeight: "bold" }}>Сокращённое название: </span>
          <span>{isEquipmentInfoWindowOpen.shortTitle}</span>
        </p>
        <p style={{ margin: "10px 0 0" }}>
          <span style={{ fontWeight: "bold" }}>Описание: </span>
          <span>{isEquipmentInfoWindowOpen.description}</span>
        </p>
      </div>
    </div>
  );
}
