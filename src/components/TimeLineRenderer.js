import React from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "./style.css";
import "react-calendar-timeline/lib/Timeline.css";

export default function TimeLineRenderer({ groups, toolsCount, isActiveDate, orderDate, openBookingWindow, items }) {
  return (
    <Timeline
    className="container"
    groups={
      toolsCount
        ? groups.slice(0, toolsCount)
        : groups
    }
    items={items}
    canMove={false}
    defaultTimeStart={moment("2020.02.01 0:00:00")}
    defaultTimeEnd={moment("2020.02.03 0:00:00")}
    visibleTimeStart={
      isActiveDate
        ? orderDate.selection1.startDate
          ? orderDate.selection1.startDate
          : moment("2020.02.01 0:00:00")
        : false
    }
    visibleTimeEnd={
      isActiveDate
        ? orderDate.selection1.endDate &&
          orderDate.selection1.endDate !== orderDate.selection1.startDate
          ? moment(orderDate.selection1.endDate).add(1, "d")
          : moment(orderDate.selection1.startDate).add(1, "d")
        : false
    }
    lineHeight={100}
    onCanvasClick={(groupId, time, e) => {
      console.log(groupId, time, e);
    }}
    onCanvasDoubleClick={(groupId, time, e) => {
      openBookingWindow(time);
    }}
    itemTouchSendsClick={true}
    onItemClick={(itemId, e, time) => {
      console.log(itemId);
    }}
    timeSteps={{
      hour: 1,
      day: 1,
      month: 1,
      year: 1,
    }}
    maxZoom={30 * 86400 * 1000}
  />
  );
}
