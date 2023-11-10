import React, { useState, useEffect } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
// import { v4 as uuidv4 } from "uuid";
import { createOrderGroup } from "../../common/DataConvertHelper";
import "../style.css";
import style from "../BookingMenuComponents/BookingDateColumn/BookingTimeline.module.css";
import styleConflict from "../BookingMenuComponents/BookingDateColumn/ConflictResolutionWindow/Conflict.module.css";
import buttonTitleConstants from "../../constants/buttonTitleConstants";

export default function TimelineOrders({ orderCalendarSelectDay, allOrderData }) {
  const selectedDay = moment(orderCalendarSelectDay);

  const [visibleTimeStart, setVisibleTimeStart] = useState(selectedDay.startOf("day").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(selectedDay.endOf("day").valueOf());

  const [orderItems, setOrderItems] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [elementForEdit, setElementForEdit] = useState(null);
  console.log("orderItems", orderItems);
  useEffect(() => {
    const filteredOrders = createOrderGroup(allOrderData).filter((order) => (
      order.date === moment(selectedDay).format("YYYY-MM-DD")
    ));
    setOrderItems(filteredOrders.map((order) => (
      { ...order, itemProps: { style: { background: order.status === "pending" ? "#ff9900" : "#464040" } } }
    )));
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
  // console.log(eqGroups);

  const handleDeselectItem = (id) => {
    setOrderItems((prev) => prev.map((item) => {
      if (id === item.id) {
        const updatedItemPropsStyle = { ...item.itemProps.style };
        updatedItemPropsStyle.border = "1px solid gray";
        const updatedItem = {
          ...item,
          itemProps: {
            ...item.itemProps,
            style: updatedItemPropsStyle,
          },
        };
        return updatedItem;
      }
      return item;
    }));
    setElementForEdit(null);
  };

  const handleItemSelect = (itemId) => {
    if (elementForEdit && itemId === elementForEdit.itemId) {
      handleDeselectItem(itemId);
      return;
    }

    setOrderItems((prev) => prev.map((item) => {
      const isSelectedItem = item.id === itemId;
      if (isSelectedItem) {
        setElementForEdit({ itemId, orederId: item.rentOrderId, status: item.status });
      }
      const updatedItemPropsStyle = { ...item.itemProps.style };
      updatedItemPropsStyle.border = isSelectedItem ? "1px solid rgb(255, 152, 0)" : "1px solid gray";
      const updatedItem = {
        ...item,
        itemProps: {
          ...item.itemProps,
          style: updatedItemPropsStyle,
        },
      };
      return updatedItem;
    }));
  };

  const handleLinkToTimeLine = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    window.location.replace(`${origin}${pathname}?page=timeline`);
  };

  const handleEditOrder = () => {
    const { origin } = window.location;
    const { pathname } = window.location;
    handleDeselectItem(elementForEdit.itemId);
    window.location.replace(`${origin}${pathname}?page=booking_menu&order_id=${elementForEdit.orederId}`);
  };

  // const testGroups = Array(12).fill({ height: 36 });

  return orderItems.length
    ? (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            width: "100%",
            marginBottom: "1.5rem",
            padding: "10px",
          }}
        >
          <button
            type="button"
            className="reserved-btn reserve-timeline"
            onClick={handleLinkToTimeLine}
          >
            Timeline 🡆
          </button>
        </div>
        <div className={style.containerTimeline} style={{ border: "1px solid gray" }}>
          <div className="style" style={{ maxHeight: "54vh" }}>
            <Timeline
              className={style.tableTimeline}
              groups={eqGroups}
              // groups={testGroups.map((elem) => ({ ...elem, id: uuidv4(), title: uuidv4() }))}
              items={orderItems}
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
              onItemSelect={handleItemSelect}
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
                        border: "1px solid gray",
                        fontWeight: 500,
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
        <div className={styleConflict.actionBtns} style={{ width: "100%", marginTop: "2rem" }}>
          <button
            type="button"
            className={elementForEdit?.status !== "pending"
              ? styleConflict.disableBtn : "reserved-btn reserve-timeline"}
            disabled={elementForEdit?.status !== "pending"}
            onClick={handleEditOrder}
          >
            {buttonTitleConstants.EDIT}
          </button>
        </div>
      </>
    )
    : (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "20vh",
        backgroundColor: "white",
        border: "1px solid gray",
        borderRadius: "5px",
        marginTop: "20px",
      }}
      >
        <p style={{
          fontSize: "18px", fontWeight: "400", color: "black", textAlign: "center",
        }}
        >
          {"У вас нет заказов "}
          <br />
          {selectedDay.format("D MMMM YYYY")}
        </p>
      </div>
    );
}
