import React from "react";
import style from "../BookingTimeline.module.css";

export default function EquipmentDescription({ equipment }) {
  console.log(equipment);
  return (
    <div className={style.equipment_description}>
      <div>
        <img src={equipment.img} alt="description" />
      </div>
      <span>
        {`Описание: 
        ${equipment.shortDescription}
        `}
      </span>
    </div>
  );
}
