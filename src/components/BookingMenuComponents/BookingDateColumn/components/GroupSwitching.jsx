import { useEffect, useState } from "react";
import style from "../BookingTimeline.module.css";

export const GroupSwitching = ({groups: equipments, currentDevice, setCurrentDevice}) => {

  const ddd = equipments.filter(dev => dev.id === currentDevice.id)



  const initialCurrentDeviceIndex = equipments.map(current => current.id).indexOf(currentDevice.id)
  // if (initialCurrentDeviceIndex < 0) {
  //   initialCurrentDeviceIndex = 0
  // }
  console.log("initialCurrentDeviceIndex in Switch:", initialCurrentDeviceIndex);
  // console.log("currentDevice in Switch:", currentDevice);
  // console.log("equipments in Switch:", equipments);
  // console.log("ddd in Switch:", ddd);

  const [currentDeviceIndex, setCurrentDeviceIndex] = useState(initialCurrentDeviceIndex);
  console.log("currentDeviceIndex in Switch:", currentDeviceIndex);

  if (ddd.length === 0) {
    setCurrentDevice(equipments[0])
    // setCurrentDeviceIndex(0)
  }

  const handlePreviousGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }

  const handleNextGroup = () => {
    setCurrentDeviceIndex((prevIndex) => Math.min(prevIndex + 1, equipments.length - 1));
  }

  useEffect(() => {
    setCurrentDevice(equipments[currentDeviceIndex])
  }, [currentDeviceIndex]);

  return (
    <div className="headerSwitch">

    <div className={style.containerGroupSwitching}>
      <button onClick={handlePreviousGroup} disabled={currentDeviceIndex === 0} >
      &#129120;
      </button>
      <p>{currentDevice.title}</p>
      <button onClick={handleNextGroup} disabled={currentDeviceIndex === equipments.length - 1}>
      &#129122;
      </button>

    </div>
  </div>
  );
};
