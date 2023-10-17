import React from "react";
import "../style.css";

export default function EquipmentInfoWindow({
  isEquipmentInfoWindowOpen, setIsEquipmentInfoWindowOpen, isOpenOverlay, setIsOpenOverlay,
}) {
  // console.log("isEquipmentInfoWindowOpen", isEquipmentInfoWindowOpen);
  return (
    isOpenOverlay
      ? (
        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "fixed",
            height: "600px",
            cursor: "zoom-out",
            zIndex: "201",
          }}
        >
          <img
            aria-hidden="true"
            onClick={() => setIsOpenOverlay(false)}
            style={{ objectFit: "contain", width: "600px", height: "600px" }}
            src={isEquipmentInfoWindowOpen.img}
            alt="description"
          />
        </div>
      )
      : (
        <div
          role="presentation"
          className="messageWindow-overlay"
        >
          <div className="messageWindow rentOrderPopup" style={{ top: "45%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <button
              type="button"
              className="button-close"
              onClick={() => setIsEquipmentInfoWindowOpen(null)}
            >
              X
            </button>
            <div
              className="titlePopup"
              style={{ wordWrap: "break-word", hyphens: "auto" }}
            >
              {isEquipmentInfoWindowOpen.title}
            </div>
            <div style={{
              width: "300px",
              height: "300px",
              margin: "10px auto",
              border: "1px solid black",
              borderRadius: "5px",
              overflow: "hidden",
              cursor: "zoom-in",
            }}
            >
              <img
                aria-hidden="true"
                onClick={() => setIsOpenOverlay(true)}
                style={{ objectFit: "contain", width: "300px", height: "300px" }}
                src={isEquipmentInfoWindowOpen.img}
                alt="description"
              />
            </div>
            <p style={{ margin: "0" }}>
              <span style={{ fontWeight: "bold" }}>Сокращённое название: </span>
              {isEquipmentInfoWindowOpen.shortTitle}
            </p>
            <p style={{ margin: "0" }}>
              <span style={{ fontWeight: "bold" }}>Цена: </span>
              {parseFloat(isEquipmentInfoWindowOpen.price).toFixed(2)}
            </p>
            <div style={{
              margin: "0",
              maxHeight: "150px",
              overflow: "auto",
              width: "auto",
              wordWrap: "break-word",
              hyphens: "auto",
              textAlign: "justify",
            }}
            >
              <span style={{ fontWeight: "bold" }}>Описание: </span>
              {isEquipmentInfoWindowOpen.description}
            </div>
          </div>
        </div>
      )
  );
}
