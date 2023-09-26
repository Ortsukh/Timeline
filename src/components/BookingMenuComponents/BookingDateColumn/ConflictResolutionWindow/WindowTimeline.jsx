import React, { useState } from "react";
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
import EquipmentDescription from "../components/EquipmentDescription";

export default function WindowTimeline({
  items,
  groups,
  isEditMode,
  editOrderData,
  selectedConflictDate,
  setSelectedConflictDate,
  baseOrder,
  pushOrderInBasePreOrder,
  statusCheckboxSelected,
  // handleSetSelectedConflictDate,
}) {
  console.log("editOrderData!!!", editOrderData);
  console.log("isEditMode!!!", isEditMode);
  const currentIdDevice = baseOrder.equipment.id;
  const currentShift = baseOrder.equipment.shiftLength;
  const currentTime = baseOrder.shiftTime;

  // const [today, setToday] = useState(moment(selectedConflictDate, "YYYY-MM-DD"));
  const today = moment(selectedConflictDate, "YYYY-MM-DD");
  const startOfDay = (day) => day.startOf("day");
  const endOfDay = (day) => day.endOf("day");
  // const startDate = today.startOf("day");
  // const endDate = today.startOf("day");
  const isDayWithConflict = baseOrder.equipment.conflicts.includes(selectedConflictDate);
  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  const startTimeSelectedItem = today.clone().set("hour", currentTime).startOf("hour");
  const endTimeSelectedItem = today.clone().set("hour", currentTime).startOf("hour").add(currentShift, "hour")
    .subtract(1, "seconds");

  const filteredItemsNormal = items.filter((item) => today.format("YYYY-MM-DD") === item.date);
  const FFItems = filteredItemsNormal.filter((filtItem) => {
    const ffGrid = addGrid(Math.floor(+currentTime / currentShift), currentShift);
    return filtItem.grid !== ffGrid;
  });
  const filteredItems = isEditMode ? FFItems : filteredItemsNormal;
  console.log("filteredItems!!!", filteredItems, FFItems);
  filteredItems.push({
    id: "X_MARK",
    group: currentIdDevice,
    title: "X",
    start_time: startTimeSelectedItem,
    end_time: endTimeSelectedItem,
    itemProps:
      {
        style: {
          // background: isDayWithConflict ? "rgba(128,128,128,0)" : "rgba(128,128,128)",
          background: "rgba(128,128,128,0)",
          border: "1px solid red",
          // zIndex: 100,
          // borderRight: "1px solid red",
          // borderLeft: "1px solid red",
          color: "red",
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
  });
  const selectedShiftObj = {
    title: "X",
    id: uuidv4(),
    group: currentIdDevice,
    status: "preOrder",
    canMove: false,
    date: selectedConflictDate,
    grid: addGrid(Math.floor(+currentTime / currentShift), currentShift),
    start_time: startTimeSelectedItem,
    end_time: endTimeSelectedItem,
    itemTouchSendsClick: false,
    itemProps: {
      style: {
        background: "gray",
        border: "1px solid red",
        color: "red",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      },
    },
    deviceGroup: currentIdDevice,
    checkBoxId: `${currentIdDevice} ${Math.floor(+currentTime / currentShift)}`,
  };

  const [consideredCell, setConsideredCell] = useState((isDayWithConflict || !isEditMode)
    ? {} : selectedShiftObj);
  console.log("consideredCell", consideredCell);
  const handleBoundsChange = (timeStart, timeEnd) => {
    setVisibleTimeStart(timeStart);
    setVisibleTimeEnd(timeEnd);
  };

  const generateGroup = () => groups.map((el) => ({
    id: el.id,
    title: el.title,
    date: el.category,
    height: 36,
  }));
  const elInGroup = generateGroup();

  const newElInGroup = elInGroup.map((el) => {
    const selectedElInGroup = el.id === currentIdDevice;
    return {
      ...el,
      title: (
        <div className={selectedElInGroup ? styleConflict.highlightRow : ""}>
          {el.title}
        </div>
      ),
    };
  });

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
    const hour = moment(time).hours();
    const formatHour = Math.floor(hour / currentShift);
    const formattedDate = getFormattedDate(groupId, time);
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
    setConsideredCell(obj);
  };

  const handleCanvasClick = (groupId, time) => {
    // if (statusCheckboxSelected === "MYSELF" && groupId !== currentIdDevice) return;
    clickOnEmptySpace(groupId, time);
  };

  const handleItemSelect = (itemId) => {
    // console.log("itemId", itemId);
    if (itemId === consideredCell.id) {
      setConsideredCell({});
      return;
    }
    if ((!isDayWithConflict || isEditMode) && itemId === "X_MARK") {
      setConsideredCell(selectedShiftObj);
    }
    // if (consideredCell.id !== "X_MARK" && itemId === "X_MARK") {
    //   setConsideredCell(selectedShiftObj);
    // }
    // const item = itemId
    //   ? itemsPreOrder.find((el) => el.id === itemId)
    //   : null;
    // if (!item) return;
    // setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const hadleResolveConflict = () => {
    setSelectedConflictDate(null);
    const formatedConsideredCell = {
      canMove: consideredCell.canMove,
      date: consideredCell.date,
      grid: consideredCell.grid,
      group: consideredCell.group,
      id: consideredCell.id,
      status: consideredCell.status,
    };
    pushOrderInBasePreOrder(formatedConsideredCell);
  };

  return (
    <>
      <div className={style.containerTimeline}>
        <div className="style">
          <Timeline
            className={style.tableTimeline}
            groups={statusCheckboxSelected === "AUTO" ? elInGroup : newElInGroup}
            lineHeight={36}
            itemHeightRatio={1}
            verticalLineClassNamesForTime={(timeStart, timeEnd) => {
              const currentTimeStart = moment(timeStart);
              const currentTimeEnd = moment(timeEnd);
              const selectedTime = currentTimeStart.isSame(startTimeSelectedItem, "hours") && currentTimeEnd.isSame(endTimeSelectedItem, "hours");
              return [selectedTime && statusCheckboxSelected === "AUTO" ? styleConflict.highlightColumn : ""];
            }}
            horizontalLineClassNamesForGroup={(group) => {
              if (statusCheckboxSelected === "AUTO") return;
              const selectedGroup = group.id === currentIdDevice;
              // eslint-disable-next-line
              return [selectedGroup ? styleConflict.highlightRow : ""];
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
                    {`${today.format("D")} ${today.format("MMMM").charAt(0).toUpperCase()}${today.format("MMMM").slice(1)}`}
                  </div>
                )}
              </SidebarHeader>
              {currentShift < 2
                ? (
                  <DateHeader
                    unit="hour"
                    labelFormat="H"
                  />
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
                        {moment(+getIntervalProps().key.slice(6)).isSame(startTimeSelectedItem, "hours")
                        && statusCheckboxSelected === "AUTO"
                          ? (
                            <div
                              style={{
                                border: "1px solid rgba(0, 0, 0)",
                                display: "flex",
                                justifyContent: "center",
                              }}
                              className={styleConflict.highlightColumn}
                            >
                              {
                              `${moment(intervalContext.interval.startTime).format("H")}-${
                                moment(intervalContext.interval.endTime).format("H")}`
                            }
                            </div>
                          )
                          : (
                            <div
                              style={{
                                border: "1px solid rgba(0, 0, 0)",
                                backgroundColor: "white",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              {
                              `${moment(intervalContext.interval.startTime).format("H")}-${
                                moment(intervalContext.interval.endTime).format("H")}`
                            }
                            </div>
                          )}
                      </div>
                    )}
                  />
                )}
            </TimelineHeaders>
          </Timeline>
        </div>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between", width: "45vw", margin: "0 auto",
      }}
      >
        <button
          type="button"
          className={!consideredCell.id
            ? styleConflict.reserveBtnDisable
            : styleConflict.reserveBtn}
          disabled={!consideredCell.id}
          onClick={hadleResolveConflict}
        >
          Подтвердить
        </button>
        <button
          type="button"
          className={styleConflict.closeBtn}
          onClick={() => {
            setSelectedConflictDate(null);
            // TODO ЛОГИКА для перехода к следующему конкликту после нажатия на `Пропустить`
            // const curIndConflInArr = baseOrder.equipment?.conflicts.indexOf(selectedConflictDate)
            // const nextIndexConfl = curIndConflInArr < baseOrder.equipment?.conflicts.length - 1
            // ? curIndConflInArr + 1 : 0;
            // handleSetSelectedConflictDate(baseOrder.equipment?.conflicts[nextIndexConfl]);
          }}
        >
          Пропустить
        </button>
      </div>
      {/* <EquipmentDescription equipment={baseOrder.equipment} /> */}
      ;
    </>
  );
}
