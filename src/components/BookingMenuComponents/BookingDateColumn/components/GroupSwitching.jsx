import { useEffect, React } from "react";
import style from "../BookingTimeline.module.css";

export default function GroupSwitching({
  groups: equipments, currentDevice, setCurrentDevice, setCurrentDeviceIndex, currentDeviceIndex,
}) {
  if (!equipments.some((item) => item.id === currentDevice.id)) {
    setCurrentDevice(equipments[0]);
  }

  const handlePreviousGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.min(prevIndex + 1, equipments.length - 1));
  };

  useEffect(() => {
    setCurrentDevice(equipments[currentDeviceIndex]);
  }, [currentDeviceIndex]);

  return (
    <div className="headerSwitch">
      <div className={style.containerGroupSwitching}>
        <button type="button" onClick={handlePreviousGroup} disabled={currentDeviceIndex === 0}>
          &#129120;
        </button>
        <p>{currentDevice.title}</p>
        <button type="button" onClick={handleNextGroup} disabled={currentDeviceIndex === equipments.length - 1}>
          &#129122;
        </button>
      </div>
    </div>
  );
}
