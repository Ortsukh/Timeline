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
  const [time, setTime] = useState(0);
  useEffect(() => {
    setTime(orderDate.selection1.startDate);
  }, [orderDate.selection1.startDate, isActiveDate]);

  console.log("render", items, groups);
  const minTime = moment(orderDate.selection1.startDate).valueOf();
  const maxTime = moment(orderDate.selection1.endDate).add(1, "days").valueOf();


  return (
    <Timeline
      className="container"
      groups={toolsCount ? groups.slice(0, toolsCount) : groups}
      items={items}
      canMove={false}
      defaultTimeStart={moment()}
      defaultTimeEnd={moment().add(2, "days")}
      visibleTimeStart={
        isActiveDate ? moment(orderDate.selection1.startDate) : null
      }
      visibleTimeEnd={
        isActiveDate
          ? moment(orderDate.selection1.startDate).add(1, "days")
          : null
      }
      itemTouchSendsClick={true}
      minZoom={60 * 60 * 1000}
      maxZoom={60 * 60 * 1000 * 24}
      lineHeight={45}
      onCanvasClick={(groupId, time, e) => {
        clickOnEmptySpace(groupId, time);
        console.log(groupId, time, e);
      }}
      onItemSelect={(itemId, e, time) => {
        console.log(itemId);
        openBookingWindow(time, e.clientX, e.clientY, "clickOnOrder", itemId);

        clickOnItem(time, itemId);
      }}
      onTimeChange={(visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => {
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
      }}
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
