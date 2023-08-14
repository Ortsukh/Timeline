import React, { useState } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import Calendar from "react-calendar";
import style from "./BookingTimeline.module.css";
import "react-calendar-timeline/lib/Timeline.css";
import "react-calendar/dist/Calendar.css"; // удалить для изменения стиля календаря
import { GroupSwitching } from "./components/GroupSwitching";

export const BookingTimeline = ({ selectedGroups, groups }) => {
  const today = moment();
  const startOfDay = moment(today).startOf("day");
  const endOfDay = moment(today).endOf("day");

  const items = [
    // { id: 1, group: 1, start_time: startOfDay, end_time: endOfDay },
    // { id: 2, group: 2, start_time: startOfDay, end_time: endOfDay },
  ];

  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay);
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay);
  const [currentMonth, setCurrentMonth] = useState(today);
  const [showCalendar, setShowCalendar] = useState(false);

  const [currentDevice, setCurrentDevice] = useState([]);
  // console.log(currentDevice);

  const handleBoundsChange = (visibleTimeStart, visibleTimeEnd) => {
    setVisibleTimeStart(visibleTimeStart);
    setVisibleTimeEnd(visibleTimeEnd);

    // const newMonth = moment(visibleTimeStart).month();
    // if (newMonth !== currentMonth) {
    //   setCurrentMonth(newMonth);
    // }
  };

  const generateDaysOfMonth = () => {
    const daysInMonth = moment(currentMonth).daysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(currentMonth).date(i);
      days.push({
        id: date.format("YYYY-MM-DD"), //дата в качестве ID
        title: date.format("D dd").toUpperCase(), // день месяца числом - D, сокращенная абривиатура - dd
        // rightTitle: "Убрать",
        date: date, // объект `moment(today).date(i)` для использования в items
        height: 18, // высота строчки
      });
    }

    return days;
  };
  const daysOfMonth = generateDaysOfMonth();

  const onPreviousMonth = () => {
    const prevMonth = moment(currentMonth).startOf("month").add(-1, "months");
    setCurrentMonth(prevMonth);
  };

  const chooseFromCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onNextMonth = () => {
    const nextMonth = moment(currentMonth).startOf("month").add(1, "months"); // .startOf('month') что бы не было бага с 31 числом
    setCurrentMonth(nextMonth);
  };

  const handleDateChange = (value) => {
    const newDate = moment(value);
    setCurrentMonth(newDate);
    setShowCalendar(false);
  };

  return (
    <div className={style.containerTimeline}>
      {/* <div>{selectedGroups}</div> */} {/* Общее название группы */}

      <GroupSwitching groups={groups} currentDevice={currentDevice} setCurrentDevice={setCurrentDevice}/>

      <div className={style.customCalendar}>
        {showCalendar && (
          <Calendar
            onClickMonth={handleDateChange}
            value={currentMonth}
            view="year"
          />
        )}
      </div>
      <div className={style.monthLabel}>{currentMonth.format("MMMM YYYY")}</div>
      <Timeline
        className={style.tableTimeline}
        groups={daysOfMonth}
        // groupClassName={style.customGroup}
        items={items}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        // sidebarWidth={150} // ширина левой панели по дефолту - 150px
        // rightSidebarWidth={80} // задать ширину правой панели
        buffer={1} // убрать прокрутку на колесико (день вперед/назад)
        onBoundsChange={handleBoundsChange} // границы показа времени
        maxZoom={24 * 60 * 60 * 1000} // ограничение масштаба до 1 дня
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <>
                  <button
                    {...getRootProps()}
                    style={{ width: "50px" }}
                    onClick={onPreviousMonth}
                  >
                    &#9668;
                  </button>
                  <button
                    {...getRootProps()}
                    style={{ width: "50px" }}
                    onClick={chooseFromCalendar}
                  >
                    Month
                  </button>
                  <button
                    {...getRootProps()}
                    style={{ width: "50px" }}
                    onClick={onNextMonth}
                  >
                    &#9658;
                  </button>
                </>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="hour" labelFormat="H" />{" "}
          {/* отображать только часы, без минут */}
        </TimelineHeaders>
      </Timeline>
    </div>
  );
};