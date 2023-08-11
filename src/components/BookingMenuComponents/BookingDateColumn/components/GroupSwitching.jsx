import style from "../BookingTimeline.module.css";

export const GroupSwitching = ({groups: equipments, currentDevice, setCurrentDevice}) => {
  console.log(equipments);

  const deviceTitle = equipments.map(device => device.title)
  console.log(deviceTitle);
  
  const onPreviousGroup = () => {
    console.log("prev");
  }

  const onNextGroup = () => {
    console.log("next");
  }

  return (
    <div className={style.containerGroupSwitching}>
      <button onClick={onPreviousGroup}>
        &#9668;
      </button>
      <p>
        {currentDevice}
      </p>
      <button onClick={onNextGroup}>
        &#9658;
      </button>
    </div>
  );
};
