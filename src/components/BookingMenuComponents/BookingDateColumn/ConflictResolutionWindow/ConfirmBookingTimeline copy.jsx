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

export default function ConfirmBookingTimeline({
  items,
  groups,
  itemsPreOrder,
  setItemsPreOrder,
  editOrderData,
  setCopyEditItems,
  setUpdatedItems,
  isEditMode,
  currentDevice,
  orderDatePlanning,
  selectedConflictDate,
  baseOrder,
}) {
  console.log("baseOrder!!!", baseOrder);
  // const arrayDate = [ "2023-09-13", "2023-09-14", "2023-09-15", "2023-09-17" ];
  const currentCategory = "Микроволновка";
  const currentIdDevice = 1;
  const currentShift = 1;
  const testDay = "2023-09-15";
  const [resolvedConflicts, setResolvedConflicts] = useState([]);
  const [consideredCell, setConsideredCell] = useState({});
  const [indexCurrentConflictDate, setIndexCurrentConflictDate] = useState(0);
  const [showButtonNextConflict, setShowButtonNextConflict] = useState(true);
  console.log("resolvedConflicts", resolvedConflicts);
  // console.log("consideredCell", consideredCell);

  const today = moment(selectedConflictDate ? selectedConflictDate : "1997-08-05", "YYYY-MM-DD");
  const startOfDay = (day) => day.startOf("day");
  const endOfDay = (day) => day.endOf("day");
  const startDate = today.startOf("day");
  const endDate = today.startOf("day");
  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  useEffect(() => {
    setVisibleTimeStart(startOfDay(today).valueOf());
    setVisibleTimeEnd(endOfDay(today).valueOf());
  }, [today])
  const filteredItems = items.filter((item) => today.format("YYYY-MM-DD") === item.date);


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

  useEffect(() => {
    if (isEditMode) {
      const selectedItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId,
      );
      const allItems = items.filter(
        (item) => item.rentOrderId !== editOrderData.rentOrderId,
      );

      const selectedItemsWithColor = convertItemsData(selectedItems).map(
        (el) => ({
          ...el,
          group: el.date,
          itemProps: { style: { background: "gray" } },
        }),
      );
      setUpdatedItems(allItems);
      setItemsPreOrder(selectedItemsWithColor);
      setCopyEditItems(selectedItems);
    }
  }, [editOrderData, isEditMode]);

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
      date: groupId,
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

  // handleItemSelect("fa583e81-6e2b-4cd7-b92f-8f4462c47347");
  useEffect(() => {
    const conflict = filteredItems.filter((conflictItem) => conflictItem.date === today.format("YYYY-MM-DD"))
    console.log("!!!!!!!!!conflict", conflict[0]);
    // handleItemSelect(conflict[0].id)
  }, [indexCurrentConflictDate]);
  // setTimeout(handleItemSelect("fa583e81-6e2b-4cd7-b92f-8f4462c47347"), 3000)

  const hadleNextConflict = () => {
    console.log("Hello");
    // if (indexCurrentConflictDate < arrayDate.length - 1) {
    //   setIndexCurrentConflictDate((prevIndex) => prevIndex + 1);
    //   setResolvedConflicts((prev) => [...prev, consideredCell])
    //   setConsideredCell({});
    // } else {
    //   setResolvedConflicts((prev) => [...prev, consideredCell])
    //   setConsideredCell({})
    //   setShowButtonNextConflict(false)
    // }
  }

  return (
    <>
    {false &&
    <div className={style.containerTimeline} style={{ width: "45vw", height: "50vh", backgroundColor: "gray", zIndex: "500", border: "1px solid gray" }}>
      
    </div>}
    {selectedConflictDate &&
    <div className={style.containerTimeline}>
      <div className="style">
        <Timeline
          className={style.tableTimeline}
          groups={elInGroup}
          lineHeight={18}
          itemHeightRatio={1}
          horizontalLineClassNamesForGroup={(group) => {
            const selectedDate = moment(group.date).isSameOrAfter(startDate)
              && moment(group.date).isSameOrBefore(endDate);
            return [
              openGroups[group.id] ? style.blocked : "",
              selectedDate ? style.highlight : "",
            ];
          }}
          // items={filteredItems.concat(getCurrentDevicePreOrderedItems())}
          items={filteredItems.concat(consideredCell)}
          // items={items.concat(consideredCell)}
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
                  }}
                >
                  {today.format("DD") + " " + today.format("MMMM").charAt(0).toUpperCase() + today.format("MMMM").slice(1)}
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
      {showButtonNextConflict &&
        <button disabled={!consideredCell.id && showButtonNextConflict} onClick={hadleNextConflict}>&rArr;</button>
      }
    </div>
    }
    </>
  );
}
