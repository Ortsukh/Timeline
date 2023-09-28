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
import { ConflSVG } from "../../../../others/svg/svgImport";

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
  console.log("selectedConflictDate!!!", selectedConflictDate);
  const curIdDevice = baseOrder.equipment.id;
  const curIdDevForGreen = selectedConflictDate.extendedProps.groupId;
  const curShift = baseOrder.equipment.shiftLength;
  const curTime = baseOrder.shiftTime;
  const curTimeForGreen = selectedConflictDate.extendedProps.shift;
  const today = moment(selectedConflictDate.start, "YYYY-MM-DD");
  // const today = moment(selectedConflictDate, "YYYY-MM-DD");
  const startOfDay = (day) => day.startOf("day");
  const endOfDay = (day) => day.endOf("day");
  // const startDate = today.startOf("day");
  // const endDate = today.startOf("day");
  const isDayWithConflict = baseOrder.equipment.conflicts.includes(today.format("YYYY-MM-DD"));
  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  const setStartTimeSelectedItem = (time) => today.clone().set("hour", time).startOf("hour");
  const setEndTimeSelectedItem = (time) => today.clone().set("hour", time).startOf("hour").add(curShift, "hour")
    .subtract(1, "seconds");
  // const startTimeSelectedItem = today.clone().set("hour", curTimeForGreen).startOf("hour");
  // const endTimeSelectedItem = today.clone().set("hour", curTimeForGreen).startOf("hour")
    // .add(curShift, "hour").subtract(1, "seconds");

  const filteredItemsNormal = items.filter((item) => today.format("YYYY-MM-DD") === item.date);
  const itemsSameColor = filteredItemsNormal.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4" } } }));
  const filteredItemsEdit = itemsSameColor.filter((filterItem) => {
    const ffGrid = addGrid(Math.floor(+curTimeForGreen / curShift), curShift);
    return filterItem.grid !== ffGrid;
  });
  const filteredItems = isEditMode ? filteredItemsEdit : itemsSameColor;
  if (isDayWithConflict && !isEditMode) {
    filteredItems.push({
      id: "X_MARK",
      group: curIdDevForGreen || curIdDevice,
      // title: "X",
      start_time: setStartTimeSelectedItem(curTimeForGreen),
      end_time: setEndTimeSelectedItem(curTimeForGreen),
      itemProps:
        {
          style: {
            // background: isDayWithConflict ? "rgba(128,128,128,0)" : "rgba(128,128,128)",
            // background: "rgba(128,128,128,0)",
            background: "#ffa4a4",
            // width: "30px",
            // height: "30px",
            // background: "transparent",
            backgroundImage: `url(${ConflSVG})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
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
  }
  if ((!isDayWithConflict && !isEditMode) || isEditMode) {
    filteredItems.push({
      id: "X_MARK",
      group: curIdDevForGreen || curIdDevice,
      start_time: setStartTimeSelectedItem(curTimeForGreen),
      end_time: setEndTimeSelectedItem(curTimeForGreen),
      itemProps:
        {
          style: {
            background: "#90ef90",
            border: "1px solid red",
            color: "red",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
    });
  }

  const selectedShiftObj = {
    // title: "X",
    id: uuidv4(),
    group: curIdDevForGreen || curIdDevice,
    status: "preOrder",
    canMove: false,
    date: today.format("YYYY-MM-DD"),
    grid: addGrid(Math.floor(+curTimeForGreen / curShift), curShift),
    start_time: setStartTimeSelectedItem(curTimeForGreen),
    end_time: setEndTimeSelectedItem(curTimeForGreen),
    itemTouchSendsClick: false,
    itemProps: {
      style: {
        background: "#90ef90",
        // backgroundImage: `url(${ConflSVG})`,
        // backgroundRepeat: "no-repeat",
        // backgroundPosition: "center",
        // backgroundSize: "contain",
        border: "1px solid red",
        color: "red",
        fontSize: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      },
    },
    deviceGroup: curIdDevForGreen || curIdDevice,
    checkBoxId: `${curIdDevForGreen || curIdDevice} ${Math.floor(+curTimeForGreen / curShift)}`,
  };

  const [consideredCell, setConsideredCell] = useState(isEditMode ? selectedShiftObj : {});
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
    const selectedElInGroup = el.id === curIdDevice;
    return {
      ...el,
      title: (
        <div className={selectedElInGroup ? styleConflict.highlightRow : ""}>
          {/* <div style={{
            cursor: "pointer", whiteSpace: "break-spaces", overflow: "hidden", height: "40px",
            maxWidth: "155px", lineHeight: "20px", display: "flex", alignItems: "center",
          }}
          >
          </div> */}
          {el.title}
        </div>
      ),
    };
  });

  const getFormattedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    // const { shiftLength } = currentDevice;
    const formatHour = Math.floor(hour / curShift);

    let start; let
      end;

    start = formatHour * curShift;
    end = start + curShift;
    start = `${date} ${start}:00`;
    end = `${date} ${end}:00`;
    return {
      start,
      end,
    };
  };

  const clickOnEmptySpace = (groupId, time) => {
    const hour = moment(time).hours();
    const formatHour = Math.floor(hour / curShift);
    const formattedDate = getFormattedDate(groupId, time);
    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date: today.format("YYYY-MM-DD"),
      grid: addGrid(formatHour, curShift),
      start_time: moment(formattedDate.start).valueOf(),
      end_time: moment(formattedDate.end).valueOf(),
      itemTouchSendsClick: false,
      itemProps: { style: { background: "lightgray" } },
      deviceGroup: groupId,
      checkBoxId: `${groupId} ${formatHour}`,
    };
    setConsideredCell(obj);
  };

  const handleCanvasClick = (groupId, time) => {
    // if (statusCheckboxSelected === "MYSELF" && groupId !== curIdDevice) return;
    clickOnEmptySpace(groupId, time);
  };

  const handleItemSelect = (itemId) => {
    // console.log("itemId", itemId);
    if (itemId === consideredCell.id) {
      setConsideredCell({});
      return;
    }
    if (isEditMode && itemId === "X_MARK") {
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

  const handleResolveConflict = () => {
    setSelectedConflictDate(null);
    const formattedConsideredCell = {
      canMove: consideredCell.canMove,
      date: consideredCell.date,
      grid: consideredCell.grid,
      group: consideredCell.group,
      id: consideredCell.id,
      status: consideredCell.status,
    };
    pushOrderInBasePreOrder(formattedConsideredCell);
  };
  console.log(curIdDevForGreen || +curIdDevice);
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
              const selectedTime = currentTimeStart.isSame(setStartTimeSelectedItem(curTime), "hours")
                && currentTimeEnd.isSame(setEndTimeSelectedItem(curTime), "hours");
              return [selectedTime && statusCheckboxSelected === "AUTO" ? styleConflict.highlightColumn : ""];
            }}
            horizontalLineClassNamesForGroup={(group) => {
              if (statusCheckboxSelected === "AUTO") return;
              const selectedGroup = group.id === curIdDevice;
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
              hour: curShift,
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
              {curShift < 2
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
                        {moment(+getIntervalProps().key.slice(6)).isSame(setStartTimeSelectedItem(curTime), "hours")
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
          onClick={handleResolveConflict}
        >
          Подтвердить
        </button>
        <button
          type="button"
          className={styleConflict.closeBtn}
          onClick={() => {
            setSelectedConflictDate(null);
            // TODO ЛОГИКА для перехода к следующему конкликту после нажатия на `Пропустить`
            // const curIndConflInArr =
            // baseOrder.equipment?.conflicts.indexOf(today.format("YYYY-MM-DD"))
            // const nextIndexConfl = curIndConflInArr < baseOrder.equipment?.conflicts.length - 1
            // ? curIndConflInArr + 1 : 0;
            // handleSetSelectedConflictDate(baseOrder.equipment?.conflicts[nextIndexConfl]);
          }}
        >
          Пропустить
        </button>
      </div>
      <EquipmentDescription equipment={
        groups.find((group) => group.id === (+curIdDevForGreen || +curIdDevice))
      }
      />
    </>
  );
}
