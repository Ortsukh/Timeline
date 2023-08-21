import React, { useEffect, useState } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "./style.css";
import "react-calendar-timeline/lib/Timeline.css";

export default function TimeLineRenderer({
  groups,
  toolsCount,
  isActiveDate,
  orderDate,
  openBookingWindow,
  items,
  clickOnItem,
  setIsBookingMenu,
  setSelectedGroups,
  setCurrentDevice,
}) {
  const [visibleTimeRange, setVisibleTimeRange] = useState({
    start: moment(),
    end: moment().add(2, "days"),
  });

  useEffect(() => {
    setVisibleTimeRange({
      start: moment(orderDate.selection1.startDate),
      end: moment(orderDate.selection1.startDate).add(1, "days"),
    });
  }, [orderDate.selection1.startDate, isActiveDate]);

  const handleItemSelect = (itemId, e, time) => {
    openBookingWindow(time, e.clientX, e.clientY, "clickOnOrder", itemId);
    clickOnItem(time, itemId);
  };

  // const handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
  //   if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
  //     updateScrollCanvas(minTime, maxTime);
  //   } else if (visibleTimeStart < minTime) {
  //     updateScrollCanvas(
  //       minTime,
  //       minTime + (visibleTimeEnd - visibleTimeStart)
  //     );
  //   } else if (visibleTimeEnd > maxTime) {
  //     updateScrollCanvas(
  //       maxTime - (visibleTimeEnd - visibleTimeStart),
  //       maxTime
  //     );
  //   } else {
  //     updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
  //   }
  // }

  const handleToSelectedGroup = (group, category) => {
    setIsBookingMenu(true);
    localStorage.setItem("toolsFilter", category);
    setSelectedGroups(() => [category]);
    setCurrentDevice(group);
  };

  const newGroups = groups.map((group) => ({
    ...group,
    title: (
      <div
        onClick={() => handleToSelectedGroup(group, group.category)}
        onKeyDown={() => handleToSelectedGroup(group, group.category)}
        aria-hidden="true"
        style={{ cursor: "pointer" }}
      >
        {group.title}
      </div>
    ),
  }));

  return (
    <Timeline
      className="container"
      groups={toolsCount ? newGroups.slice(0, toolsCount) : newGroups}
      items={items}
      canMove={false}
      defaultTimeStart={moment()}
      defaultTimeEnd={moment().add(2, "days")}
      visibleTimeStart={isActiveDate ? visibleTimeRange.start.valueOf() : null}
      visibleTimeEnd={isActiveDate ? visibleTimeRange.end.valueOf() : null}
      itemTouchSendsClick
      minZoom={60 * 60 * 1000 * 24 * 2} //! Минимальное зумирование {2} дня
      maxZoom={60 * 60 * 1000 * 24 * 31} // TODO в !проде пропадают последние дни и часы
      lineHeight={45}
      onItemSelect={handleItemSelect}
      itemHeightRatio={1}
      canResize={false}
      timeSteps={{
        hour: 1,
        day: 1,
        month: 1,
        year: 1,
      }}
    />
  );
}
