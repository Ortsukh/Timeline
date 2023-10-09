import React, { useEffect, useState } from "react";
import style from "../BookingTimeline.module.css";

export default function EquipmentDescription({ equipment, text }) {
  const [, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [equipment]);

  return (
    <div className={style.equipment_component}>
      <p style={{ height: "3.5rem", margin: "0" }}>
        {text}
        <span style={{ fontWeight: "bold", color: "#f03333" }}>{equipment.title}</span>
      </p>
      <div style={{ width: "auto", height: "200px", textAlign: "center" }}>
        <img src={equipment.img} alt="description" />
      </div>
      <p style={{ margin: "10px 0 0" }}>
        <span style={{ fontWeight: "bold" }}>Описание: </span>
        <span>{equipment.description}</span>
      </p>
    </div>
  );
}
