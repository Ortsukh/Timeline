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
  clickOnEmptySpace,
  clickOnItem,
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

  console.log("render", items, groups);
  const minTime = moment(orderDate.selection1.startDate).add(-1, "year").valueOf(); //! Прокрутка влево на {1 год}
  const maxTime = moment(orderDate.selection1.endDate).add(1, "year").valueOf(); //! Прокрутка вправо на {1 год}

  const handleCanvasClick = (groupId, time, e) => {
      clickOnEmptySpace(groupId, time);
    console.log(groupId, time, e);
  };

  const handleItemSelect = (itemId, e, time) => {
    console.log(123);
    console.log(itemId);
    openBookingWindow(time, e.clientX, e.clientY, "clickOnOrder", itemId);
    clickOnItem(time, itemId);
  };

  const handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime);
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(
        minTime,
        minTime + (visibleTimeEnd - visibleTimeStart)
      );
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(
        maxTime - (visibleTimeEnd - visibleTimeStart),
        maxTime
      );
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
    }
  }

  const goToSelectedGroup = (id) => {
    // setOpenGroups((prev) => ({
    //   ...prev,
    //   [id]: !prev[id],
    // }));
    console.log("id:", id);
  };

// console.log("groups:", groups);
const newGroups = groups.map((group) => {
  return Object.assign({}, group, {
    title: (
      <div
        // className={openGroups[group.id] ? style.highlight : ''}
        onClick={() => goToSelectedGroup(group.id)}
        style={{ cursor: "pointer" }}
      >
        {group.title}
      </div>
    ),
  });
});
// console.log("newGroups:", newGroups);

  return (
    <Timeline
      className="container"
      groups={toolsCount ? newGroups.slice(0, toolsCount) : newGroups}
      items={items}
      canMove={false}
      defaultTimeStart={moment()}
      // defaultTimeStart={moment().startOf('day')} //! При загрузке временная шкала отображается с начала дня, а не с текущего времени
      defaultTimeEnd={moment().add(2, "days")}
      visibleTimeStart={isActiveDate ? visibleTimeRange.start : null}
      visibleTimeEnd={isActiveDate ? visibleTimeRange.end : null}
      itemTouchSendsClick={true}
      minZoom={60 * 60 * 1000 * 24 * 2} //! Минимальное зумирование {2} дня
      maxZoom={60 * 60 * 1000 * 24 * 30}
      lineHeight={45}
      onZoom= {(timelineContext, unit)=>console.log(timelineContext, unit)}
      onCanvasClick={handleCanvasClick}
      onItemSelect={handleItemSelect}
      onTimeChange={handleTimeChange}
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
