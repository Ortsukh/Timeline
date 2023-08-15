import { useState } from "react";
import style from "../BookingTimeline.module.css";

export const GroupSwitching = ({groups: equipments, currentDevice, setCurrentDevice}) => {
  
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(0);
  setCurrentDevice(equipments[currentDeviceIndex]) //TODO рендериться дважды

  const onPreviousGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setCurrentDevice(equipments[currentDeviceIndex])
  }

  const onNextGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.min(prevIndex + 1, equipments.length - 1));
    setCurrentDevice(equipments[currentDeviceIndex])
  }

  return (
    <div className="headerSwitch">
      <div className={style.containerGroupSwitching}>
        <button onClick={onPreviousGroup} disabled={currentDeviceIndex === 0} >
        &#129120;
        </button>
        <p>{currentDevice.title}</p>
        <button onClick={onNextGroup} disabled={currentDeviceIndex === equipments.length - 1}>
        &#129122;
        </button>
      </div>
    </div>
  );
};
