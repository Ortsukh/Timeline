import React, { useEffect, useState } from "react";
import style from "../BookingTimeline.module.css";
import { Expand } from "../../../../others/importImg";

export default function EquipmentDescription({ equipment, text }) {
  const [, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [equipment]);

  return (
    <div className={style.equipment_component}>
      <div style={{
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
      </div>
      <p style={{ height: "3.5rem", margin: "0" }}>
        {text}
        <span style={{ fontWeight: "bold", color: "#f03333" }}>{equipment.title}</span>
      </p>
      <div style={{
        width: "auto", height: "100px", textAlign: "center", marginTop: "10px",
      }}
      >
        <img src={equipment.img} alt="description" />
      </div>
      <p style={{ margin: "10px 0 0" }}>
        <span style={{ fontWeight: "bold" }}>Описание: </span>
        <span>{equipment.description}</span>
      </p>
    </div>
  );
}
