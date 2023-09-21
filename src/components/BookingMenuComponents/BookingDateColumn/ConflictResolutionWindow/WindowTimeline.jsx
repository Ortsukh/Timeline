/* eslint-disable */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import { v4 as uuidv4 } from "uuid";
import style from "../BookingTimeline.module.css";
import "../../../style.css";
import { addGrid } from "../../../../common/DataConvertHelper";
import styleConflict from "./Conflict.module.css";

export default function WindowTimeline({
  items,
  groups,
  setItemsPreOrder,
  editOrderData,
  setCopyEditItems,
  setUpdatedItems,
  isEditMode,
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  pushOrderInBasePreOrder,
}) {
  // console.log("baseOrder!!!", baseOrder);
  // console.log("groups!!!", groups);
  const currentIdDevice = baseOrder.equipment.id;
  const currentShift = baseOrder.equipment.shiftLength;
  const currentTime = baseOrder.shiftTime;
  // const [resolvedConflicts, setResolvedConflicts] = useState([]);
  const [consideredCell, setConsideredCell] = useState({});
  // const [indexCurrentConflictDate, setIndexCurrentConflictDate] = useState(0);
  // const [showButtonNextConflict, setShowButtonNextConflict] = useState(true);
  // console.log("resolvedConflicts", resolvedConflicts);

  const [today, setToday] = useState(moment(selectedConflictDate, "YYYY-MM-DD"));
  // const today = moment(selectedConflictDate, "YYYY-MM-DD");
  const startOfDay = (day) => day.startOf("day");
  const endOfDay = (day) => day.endOf("day");
  const startDate = today.startOf("day");
  const endDate = today.startOf("day");
  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  const startTimeSelectedItem = today.clone().set("hour", currentTime).startOf("hour");
  const endTimeSelectedItem = today.clone().set("hour", currentTime).startOf("hour").add(currentShift, "hour").subtract(1, "seconds");

  let filteredItems = items.filter((item) => today.format("YYYY-MM-DD") === item.date);
  filteredItems.push({
    id: uuidv4(),
    group: currentIdDevice,
    title: "X",
    start_time: startTimeSelectedItem,
    end_time: endTimeSelectedItem,
    itemProps: { style: { 
      background: "rgba(255,255,255,0)",
      borderRight:  "1px solid red",
      borderLeft:  "1px solid red",
      color: "red",
      fontSize: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }},
    // date: selectedConflictDate,
    // grid: addGrid(formatHour, currentShift),
    // start_time: moment(formattedDate.start).valueOf(),
    // end_time: moment(formattedDate.end).valueOf(),
    // itemTouchSendsClick: false,
    // deviceGroup: currentIdDevice,
    // checkBoxId: `${groupId} ${formatHour}`,
  })

  // const today = editOrderData?.date ? moment(editOrderData.date) : moment();
  // const startOfDay = (day) => moment(day).startOf("day");
  // const endOfDay = (day) => moment(day).endOf("day");
  // const startDate = moment(orderDatePlanning.selection1.startDate).startOf(
  //   "day",
  // );
  // const endDate = moment(orderDatePlanning.selection1.endDate).startOf("day");
  // const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  // const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  // eslint-disable-next-line
  // const [currentMonth, setCurrentMonth] = useState(
  //   moment(today).startOf("month"),
  // );

  const [openGroups, setOpenGroups] = useState(false);
// console.log("openGroups", openGroups);
  const handleBoundsChange = (timeStart, timeEnd) => {
    setVisibleTimeStart(timeStart);
    setVisibleTimeEnd(timeEnd);
  };
  // const convertGrid = (length, grid, date) => {
  //   const arr = grid.split("");
  //   const orderedTimes = {};
  //   for (let i = 0; i < 24; i += length) {
  //     if (arr[i] === "1") {
  //       orderedTimes.start_time = moment(`${date} ${i}:00`).valueOf();
  //       orderedTimes.end_time = moment(
  //         `${date} ${i + length}:00`,
  //       ).valueOf();
  //     }
  //   }
  //   return orderedTimes;
  // };

  // const convertItemsData = (data) => data
  //   .filter((item) => (
  //     item.group === currentDevice.id
  //         && item.date.startsWith(currentMonth.format("YYYY-MM"))
  //   ))
  //   .map((item) => {
  //     item.deviceGroup = item.group;
  //     item.group = item.date;
  //     const orderedTimes = convertGrid(
  //       currentDevice.shiftLength,
  //       item.grid,
  //       today.format("YYYY-MM-DD"),
  //     );
  //     item.start_time = orderedTimes.start_time;
  //     item.end_time = orderedTimes.end_time;
  //     return item;
  //   });

  // useEffect(() => {
  //   if (isEditMode) {
  //     const selectedItems = items.filter(
  //       (item) => item.rentOrderId === editOrderData.rentOrderId,
  //     );
  //     const allItems = items.filter(
  //       (item) => item.rentOrderId !== editOrderData.rentOrderId,
  //     );

  //     const selectedItemsWithColor = convertItemsData(selectedItems).map(
  //       (el) => ({
  //         ...el,
  //         group: el.date,
  //         itemProps: { style: { background: "gray" } },
  //       }),
  //     );
  //     setUpdatedItems(allItems);
  //     setItemsPreOrder(selectedItemsWithColor);
  //     setCopyEditItems(selectedItems);
  //   }
  // }, [editOrderData, isEditMode]);

  // const copyItems = items.map((item) => ({ ...item }));

  // const filteredItems = convertItemsData(copyItems);

  const generateGroup = () => {
    return groups.map((el) => {
      return {
        id: el.id,
        title: el.title,
        date: el.category,
        height: 18, // высота строчки
      }
    })
  }
  const elInGroup = generateGroup();

  // const generateDaysOfMonth = () => {
  //   const daysInMonth = moment(currentMonth).daysInMonth();
  //   const days = [];
  //   // eslint-disable-next-line no-plusplus
  //   for (let i = 0; i <= daysInMonth; i++) {
  //     const date = moment(currentMonth).date(i);
  //     days.push({
  //       id: date.format("YYYY-MM-DD"), // дата в качестве ID
  //       title: date.format("D dd").toUpperCase(), // день месяца числом - D, сокращенная абривиатура - dd
  //       date, // объект `moment(today).date(i)` для использования в items
  //       height: 18, // высота строчки
  //     });
  //   }

  //   return days;
  // };
  // const daysOfMonth = generateDaysOfMonth();

  // const toggleGroup = (id) => {
  //   setOpenGroups((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  //   setItemsPreOrder((pred) => pred.filter((el) => el.group !== id));
  // };

  // const newGroups = daysOfMonth.map((group) => {
  //   const selectedDate = moment(group.date).isSameOrAfter(startDate)
  //     && moment(group.date).isSameOrBefore(endDate);
  //   return {
  //     ...group,
  //     title: (
  //       <div
  //         className={`${openGroups[group.id] ? style.blocked : ""}  ${
  //           selectedDate ? style.highlight : ""
  //         }`}
  //         onClick={() => toggleGroup(group.id)}
  //         onKeyDown={() => toggleGroup(group.id)}
  //         aria-hidden="true"
  //         style={{ cursor: "pointer" }}
  //       >
  //         {openGroups[group.id] ? "+" : "-"}
  //         {" "}
  //         {group.title}
  //       </div>
  //     ),
  //   };
  // });

  const getFormattedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    // const { shiftLength } = currentDevice;
    const formatHour = Math.floor(hour / currentShift);

    let start; let
      end;

    start = formatHour * currentShift;
    end = start + currentShift;
    start = `${date} ${start}:00`;
    end = `${date} ${end}:00`;
    return {
      start,
      end,
    };
  };

  const clickOnEmptySpace = (groupId, time) => {
    // console.log("clickOnEmptySpace: groupId, time", groupId, time);
    const hour = moment(time).hours();
    // const { shiftLength } = currentDevice;
    const formatHour = Math.floor(hour / currentShift);

    const formattedDate = getFormattedDate(groupId, time);
    // // console.log("formattedDate", formattedDate);
    // // if (moment(`${groupId} ${hour}:00`).isBefore(moment.now())) return;

    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date: selectedConflictDate,
      grid: addGrid(formatHour, currentShift),
      start_time: moment(formattedDate.start).valueOf(),
      end_time: moment(formattedDate.end).valueOf(),
      itemTouchSendsClick: false,
      itemProps: { style: { background: "gray" } },
      deviceGroup: currentIdDevice,
      checkBoxId: `${groupId} ${formatHour}`,
    };
    setConsideredCell(obj)
    // setItemsPreOrder((pred) => [...pred, obj]);
  };

  const handleCanvasClick = (groupId, time) => {
    // if (openGroups[groupId]) return;
    // console.log("handleCanvasClick: groupId, time", groupId, time);
    clickOnEmptySpace(groupId, time);
  };

  const handleItemSelect = (itemId) => {
    console.log("itemId", itemId);
    // const item = itemId
    //   ? itemsPreOrder.find((el) => el.id === itemId)
    //   : null;
    // if (!item) return;
    // setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  // const getCurrentDevicePreOrderedItems = () => itemsPreOrder.filter(
  //   (item) => item.deviceGroup === currentDevice.id,
  // );

  // useEffect(() => {
  // const pressedSelected = filteredItems.filter((el) => {
  //     const formateTime = [];
  //     const arrayGrid = el.grid.split("")
  //     for (let hourGrid = 0; hourGrid < arrayGrid.length - 1; hourGrid += currentShift) {
  //       if (arrayGrid[hourGrid] === "1") {
  //         const fullTime = currentShift !== 1 ? `${hourGrid}-${hourGrid + currentShift}` : hourGrid;
  //         formateTime.push(fullTime);
  //       }
  //     }
  //     // console.log('AAAAAAAAAAAAAA', formateTime[0], +currentTime);
  //     // console.log('BBBBBBBBBBB', groups, currentIdDevice);
  //     return (el.group === currentIdDevice && formateTime[0] === +currentTime)
  //   })
  //   // console.log("Hello ----", pressedSelected);

  //   // handleItemSelect(pressedSelected[0]?.id);
  // }, []);

  const hadleResolveConflict = () => {
    // console.log("Hello", consideredCell);
    setSelectedConflictDate(null);

    const formatedConsideredCell = {
      canMove: consideredCell.canMove,
      date: consideredCell.date,
      grid: consideredCell.grid,
      group: consideredCell.group,
      id: consideredCell.id,
      status: consideredCell.status,
    }
    pushOrderInBasePreOrder(formatedConsideredCell);
  }

  const disableReserveBtn = !consideredCell.id ? styleConflict.reserveBtnDisable : styleConflict.reserveBtn;

  return (
    <>
    <div className={style.containerTimeline}>
      <div className="style">
        <Timeline
          className={style.tableTimeline}
          groups={elInGroup}
          lineHeight={18}
          itemHeightRatio={1}
          verticalLineClassNamesForTime={(timeStart, timeEnd) => {
            const currentTimeStart = moment(timeStart);
            const currentTimeEnd = moment(timeEnd);
            const selectedTime = currentTimeStart.isSame(startTimeSelectedItem, "hours") && currentTimeEnd.isSame(endTimeSelectedItem, "hours");
            return [selectedTime ? styleConflict.highlight : ""];
          }}
          items={filteredItems.concat(consideredCell)}
          canMove={false}
          canResize={false}
          visibleTimeStart={visibleTimeStart}
          visibleTimeEnd={visibleTimeEnd}
          // sidebarWidth={150} // ширина левой панели по дефолту - 150px
          // rightSidebarWidth={80} // задать ширину правой панели
          buffer={1} // убрать прокрутку на колесико (день вперед/назад)
          onBoundsChange={handleBoundsChange} // границы показа времени
          maxZoom={24 * 60 * 60 * 1000} // ограничение масштаба до 1 дня
          onCanvasClick={handleCanvasClick}
          showCursorLine
          onItemSelect={handleItemSelect}
          // onMouseUp={handleCellMouseUp} //! Выделение нескольки
          // onMouseDown={handleCellMouseDown} //! Выделение нескольки
          timeSteps={{
            hour: currentShift,
            day: 1,
            month: 1,
            year: 1,
          }}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => (
                <div
                  // type="button"
                  {...getRootProps()}
                  style={{
                    width: "150px",
                    backgroundColor: "white",
                    border: "1px solid rgb(39, 128, 252)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // fontWeight: "bold"
                  }}
                >
                  {today.format("D") + " " + today.format("MMMM").charAt(0).toUpperCase() + today.format("MMMM").slice(1)}
                </div>
              )}
            </SidebarHeader>
            {currentShift < 2 ? (
              <DateHeader unit="hour" labelFormat="H" />
            )
              : (
                <DateHeader
                  unit="hour"
              // eslint-disable-next-line react/no-unstable-nested-components
                  intervalRenderer={({
                    getIntervalProps,
                    intervalContext,
                  }) => (
                    <div {...getIntervalProps()}>
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.15)",
                          backgroundColor: "white",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {`${moment(intervalContext.interval.startTime).format(
                          "H",
                        )
                        }-${
                          moment(intervalContext.interval.endTime).format("H")}`}
                      </div>
                    </div>
                  )}
                />
              )}
          </TimelineHeaders>
        </Timeline>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 17px 0 17px" }}>
      <button className={disableReserveBtn} disabled={!consideredCell.id} onClick={hadleResolveConflict}>Подтвердить</button>
      <button className={styleConflict.closeBtn} onClick={() => setSelectedConflictDate(null)}>Пропустить</button>
    </div>
    </>
  );
}
