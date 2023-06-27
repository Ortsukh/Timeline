import React from "react";
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
  addPreOrder,
  clickOnItem
}) {
  const minTime =
    moment(orderDate.selection1.startDate).valueOf() || moment().valueOf();
  const maxTime =
    moment(orderDate.selection1.endDate).add(1, "days").valueOf() ||
    moment(moment().year() + "-" + moment().month() + "-" + moment().date())
      .add(1, "days")
      .valueOf();
  return (
    <Timeline
      className="container"
      groups={toolsCount ? groups.slice(0, toolsCount) : groups}
      items={items}
      canMove={false}
      defaultTimeStart={1580504400000}
      defaultTimeEnd={1580677200000}
      // defaultTimeStart={moment().valueOf()}

      // defaultTimeEnd={ moment().add(1, 'days').valueOf()}
      visibleTimeStart={
        isActiveDate ? moment(orderDate.selection1.startDate) : false
      }
      visibleTimeEnd={
        isActiveDate
          ? moment(orderDate.selection1.startDate).add(1, "d")
          : false
      }
      itemTouchSendsClick={true}
      minZoom={60 * 60 * 1000}
      maxZoom={60 * 60 * 1000 * 24}
      lineHeight={100}
      onCanvasClick={(groupId, time, e) => {
        addPreOrder(groupId,time )
        console.log(groupId, time, e);
      }}
      onCanvasDoubleClick={(groupId, time, e) => {
        // openBookingWindow(time, e.clientX, e.clientY, "clickOnEmpty");
        console.log(e);
      }}
      onItemDoubleClick={(itemId, e, time) => {
        // openBookingWindow(time, e.clientX, e.clientY, "clickOnOrder", itemId);
        console.log(itemId);
      }}
      onItemSelect ={(itemId, e, time) => {
        console.log(itemId);
        // openBookingWindow(time, e.clientX, e.clientY, "clickOnEmpty");
        openBookingWindow(time, e.clientX, e.clientY, "clickOnOrder", itemId);

        clickOnItem(time, itemId)
      }}
      onTimeChange={function (
        visibleTimeStart,
        visibleTimeEnd,
        updateScrollCanvas
      ) {
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
