import React, { useState, useEffect } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import { getAllOrders } from "../../Api/API";
import { createOrderGroup } from "../../common/DataConvertHelper";
import "../style.css";
import style from "../BookingMenuComponents/BookingDateColumn/BookingTimeline.module.css";

export default function TimelineOrders({ orderCalendarSelectDay }) {
  const selectedDay = moment(orderCalendarSelectDay);

  const [visibleTimeStart, setVisibleTimeStart] = useState(selectedDay.startOf("day").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(selectedDay.endOf("day").valueOf());

  const [orderItems, setOrderItems] = useState([]);
  // console.log("orderItems:", orderItems);
  const [groupsList, setGroupsList] = useState([]);

  useEffect(() => {
    getAllOrders().then((response) => {
      setOrderItems(createOrderGroup(response.data).filter((order) => (
        order.date === moment(selectedDay).format("YYYY-MM-DD")
      )));
    });
  }, [orderCalendarSelectDay]);

  const handleBoundsChange = (timeStart, timeEnd) => {
    setVisibleTimeStart(timeStart);
    setVisibleTimeEnd(timeEnd);
  };

  useEffect(() => {
    const arrGroups = orderItems.map((item) => ({ id: item.group, title: item.groupName }));

    setGroupsList(Array.from(new Set(arrGroups.map(JSON.stringify))).map(JSON.parse));
  }, [orderItems]);

  const generateGroup = () => groupsList.map((el) => ({
    // category: el.category,
    id: el.id,
    // date: el.category,
    // elementDate: el,
    title: (
      <div
        // aria-hidden="true"
        // onClick={() => setIsEquipmentInfoWindowOpen(el)}
        style={{ display: "flex", alignItems: "center", height: "100%" }}
      >
        <div
          // className={style.groupClick}
          style={{
            cursor: "default",
            whiteSpace: "break-spaces",
            overflow: "hidden",
            height: "100%",
            maxWidth: "155px",
            lineHeight: "15px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {el.title}
        </div>
      </div>
    ),
    height: 36,
  }));
  const eqGroups = generateGroup();

  return !orderItems.length
    ? (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "20vh",
        // backgroundColor: "gray",
        border: "1px solid gray",
        borderRadius: "20px",
      }}
      >
        <p style={{ fontSize: "24px", fontWeight: "400", color: "black" }}>
          {"У вас нет заказов "}
          {selectedDay.format("D MMMM YYYY")}
        </p>
      </div>
    )
    : (
      <div className={style.containerTimeline}>
        <div className="style">
          <Timeline
            className={style.tableTimeline}
            groups={eqGroups}
            items={orderItems.map((item) => {
              const newStyle = { background: "#90ef90", cursor: "default" };
              return { ...item, itemProps: { style: newStyle } };
            })}
            lineHeight={36}
            itemHeightRatio={1}
            canMove={false}
            canResize={false}
            visibleTimeStart={visibleTimeStart}
            visibleTimeEnd={visibleTimeEnd}
            buffer={1} // убрать прокрутку на колесико (день вперед/назад)
            onBoundsChange={handleBoundsChange} // границы показа времени
            maxZoom={24 * 60 * 60 * 1000} // ограничение масштаба до 1 дня
            showCursorLine
            selected={[]}
            timeSteps={{
              hour: 1,
              day: 1,
              month: 1,
              year: 1,
            }}
          >
            <TimelineHeaders>
              <SidebarHeader>
                {({ getRootProps }) => (
                  <div
                    {...getRootProps()}
                    style={{
                      width: "150px",
                      backgroundColor: "white",
                      border: "1px solid rgb(39, 128, 252)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {`${selectedDay.format("D")} ${selectedDay.format("MMMM").charAt(0).toUpperCase()}${selectedDay.format("MMMM").slice(1)}`}
                  </div>
                )}
              </SidebarHeader>
              <DateHeader
                unit="hour"
                labelFormat="H"
              />
            </TimelineHeaders>
          </Timeline>
        </div>
      </div>

    );
}
