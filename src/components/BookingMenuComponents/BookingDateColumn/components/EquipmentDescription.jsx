import React, { useEffect, useState } from "react";
import style from "../BookingTimeline.module.css";
// import { Expand } from "../../../../others/importImg";

export default function EquipmentDescription({ equipment, setIsEquipmentInfoWindowOpen }) {
  const [, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [equipment]);
  // console.log("equipment", equipment);
  return (
    <div className={style.equipment_component}>
      {/* <div style={{
        display: "flex", justifyContent: "right", height: "20px", gap: "10px",
      }}
      >
        <div className={style.equipmentDescrBtnExpand}>
          <img src={Expand} alt="expand" style={{ width: "100%", height: "100%" }} />
        </div>
        <div
          aria-hidden="true"
          onClick={() => console.log("Закрыть")}
          className={style.equipmentDescrBtnClose}
        >
          X
        </div>
      </div> */}
      <p style={{
        width: "auto", margin: "0", wordWrap: "break-word", hyphens: "auto", textAlign: "justify", cursor: "default",
      }}
      >
        {equipment.supportText}
        <span
          aria-hidden="true"
          onClick={() => setIsEquipmentInfoWindowOpen(equipment)}
          className={style.groupClick}
          style={{ fontWeight: "bold", color: "#f03333" }}
        >
          {equipment.title}
        </span>
      </p>
      {equipment.img
        ? (
          <div style={{
            width: "auto", height: "100px", margin: "10px 0 0", textAlign: "center",
          }}
          >
            <img src={equipment.img} alt="description" />
          </div>
        )
        : (
          <p style={{ margin: "10px 0 0", color: "red", textAlign: "center" }}>
            Фото отсутствует :|
          </p>
        )}
      <p style={{
        width: "auto", margin: "10px 0 0", wordWrap: "break-word", hyphens: "auto", textAlign: "justify",
      }}
      >
        <span style={{ fontWeight: "bold" }}>Описание: </span>
        {equipment.description}
      </p>
    </div>
  );
}
