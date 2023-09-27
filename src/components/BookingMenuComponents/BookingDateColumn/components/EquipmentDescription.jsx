import React, { useEffect, useState } from "react";
import style from "../BookingTimeline.module.css";

export default function EquipmentDescription({ equipment }) {
  const [, setUpdate] = useState(false);

  useEffect(() => {
    setUpdate((prev) => !prev);
  }, [equipment]);

  return (
    <div className={style.equipment_description}>
      <div>
        <img src={equipment.img} alt="description" />
      </div>
      <span>
        {`Описание: 
        ${equipment.description}
        `}
      </span>
    </div>
  );
}
