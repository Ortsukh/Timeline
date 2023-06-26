import React from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "./style.css";
import "react-calendar-timeline/lib/Timeline.css";

export default function TimeLineRenderer({ groups, toolsCount, isActiveDate, orderDate, openBookingWindow, items }) {
    console.log(items);

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
    defaultTimeStart={1580504400000}

    defaultTimeEnd={1580677200000}
    visibleTimeStart={
      isActiveDate
        ? orderDate.selection1.startDate
          ? orderDate.selection1.startDate
          : null
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
      openBookingWindow(time, e.clientX, e.clientY, 'clickOnEmpty' );
      console.log(e);
    }}
    onItemDoubleClick={(itemId, e, time) => {
        openBookingWindow(time, e.clientX, e.clientY, 'clickOnOrder', itemId);
        console.log(itemId);
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
