import React, { useState, useEffect } from "react";
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
import { ConflCirle } from "../../../../others/importImg";

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
  const PR_COM = {
    // eslint-disable-next-line
    category: baseOrder.equipment.category, // groups.find((el) => el.id === curIdDevForGreen || curIdDevice).category
    idCategArr: groups.map((el) => el.id),
    shiftCateg: baseOrder.equipment.shiftLength,
  };
  const PR_SEL = {
    today: moment(selectedConflictDate.start),
    todayFormated: moment(selectedConflictDate.start).format("YYYY-MM-DD"),
    countOrders: selectedConflictDate.extendedProps.conflicts[moment(selectedConflictDate.start).format("YYYY-MM-DD")].length
    + selectedConflictDate.extendedProps.success[moment(selectedConflictDate.start).format("YYYY-MM-DD")].length,
  };
  console.log("PR_COM", PR_COM);
  console.log("PR_SEL", PR_SEL);

  const [visibleTimeStart, setVisibleTimeStart] = useState(PR_SEL.today.startOf("day").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(PR_SEL.today.endOf("day").valueOf());
  const setStartTimeSelectedItem = (time) => PR_SEL.today.clone().set("hour", time).startOf("hour");
  const setEndTimeSelectedItem = (time) => PR_SEL.today.clone().set("hour", time).startOf("hour").add(PR_COM.shiftCateg, "hour")
    .subtract(1, "seconds");

  const [isClickedSuccess, setIsClickedSuccess] = useState(false);
  const [isClickedConflict, setIsClickedConflict] = useState(false);
  const [indexElementChange, setIndexElementChange] = useState(null);

  const [successfulArr, setSuccessfulArr] = useState(
    selectedConflictDate.extendedProps.success[PR_SEL.todayFormated]
      .map((reserv) => {
        console.log(reserv.shiftTime);
        console.log(PR_SEL.today.clone().set("hour", reserv.shiftTime).startOf("hour"));
        return ({
          shiftTime: reserv.shiftTime,
          id: `success_${uuidv4()}`,
          date: PR_SEL.todayFormated,
          group: +reserv.groupId,
          start_time: setStartTimeSelectedItem(reserv.shiftTime),
          end_time: setEndTimeSelectedItem(reserv.shiftTime),
          canMove: false,
          itemProps: {
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
      }),
  );
  // eslint-disable-next-line
  const [conflictsArr, setConflictsArr] = useState(
    selectedConflictDate.extendedProps.conflicts[PR_SEL.todayFormated]
      .map((reserv) => {
        console.log(reserv.shiftTime);
        console.log(PR_SEL.today.clone().set("hour", reserv.shiftTime));
        return ({
          shiftTime: reserv.shiftTime,
          id: `conflict_${uuidv4()}`,
          date: PR_SEL.todayFormated,
          group: +reserv.groupId,
          start_time: setStartTimeSelectedItem(reserv.shiftTime),
          end_time: setEndTimeSelectedItem(reserv.shiftTime),
          canMove: false,
          itemProps: {
            style: {
              // background: "rgba(128,128,128,0)",
              // background: "transparent",
              background: "#ffa4a4",
              // width: "30px",
              // height: "30px",
              backgroundImage: `url(${ConflCirle})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain",
              border: "1px solid red",
              color: "red",
              fontSize: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          },
        });
      }),
  );
  console.log("successfulArr", successfulArr);
  console.log("conflictsArr", conflictsArr);
  const { workTime } = baseOrder.equipment;
  const curIdDevice = baseOrder.equipment.id; //! -
  const curIdDevForGreen = selectedConflictDate.extendedProps.groupId; //! -
  const curTime = baseOrder.shiftTime; //! -
  // const curTimeForGreen = selectedConflictDate.extendedProps.shift; //! -
  const curTimeForGreen = 2; //! -
  // const isDayWithConflict = baseOrder.equipment?
  // .conflicts[PR_SEL.todayFormated]?.length > 0; //! -

  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (isEditMode) {
      const filteredArr = items.filter((item) => PR_SEL.todayFormated === item.date
      && PR_COM.idCategArr.includes(item.group)
      && item?.rentOrderId !== editOrderData?.rentOrderId);
      setFilteredItems(filteredArr.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4" } } })));
      return;
    }
    const filteredArr = items.filter((item) => PR_SEL.todayFormated === item.date
    && PR_COM.idCategArr.includes(item.group));
    setFilteredItems(filteredArr.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4" } } })));
  }, [selectedConflictDate]);
  // const filteredItemsNormal = items.filter((item) => PR_SEL.todayFormated === item.date
  //   && PR_COM.idCategArr.includes(item.group));
  // eslint-disable-next-line
  // const itemsSameColor = filteredItemsNormal.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4" } } }));
  // const filteredItemsEdit = itemsSameColor.filter((filterItem) => {
  //   console.log();
  //   return filterItem?.rentOrderId !== editOrderData?.rentOrderId;
  // });
  // const filteredItems = isEditMode ? filteredItemsEdit : itemsSameColor;
  // console.log("filteredItems", filteredItems);
  // .FilteredItems push: if (successArr.length), if (conflictsArr.length)

  // const [successfulItems, setSuccessfulItems] = useState([]);
  // if (successfulArr.length) {
  //   const abc = successfulArr.map((successItem) => ({
  //     id: successItem.id,
  //     group: successItem.groupId,
  //     start_time: setStartTimeSelectedItem(successItem.shiftTime),
  //     end_time: setEndTimeSelectedItem(successItem.shiftTime),
  //     itemProps:
  //           {
  //             style: {
  //               background: "#90ef90",
  //               border: "1px solid red",
  //               color: "red",
  //               fontSize: "20px",
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             },
  //           },
  //   }));
  //   setSuccessfulItems(abc);
  //   // setSuccessfulItems(
  //   //   successfulArr.map((successItem) => ({
  //   //     id: successItem.id,
  //   //     group: successItem.groupId,
  //   //     start_time: setStartTimeSelectedItem(successItem.shiftTime),
  //   //     end_time: setEndTimeSelectedItem(successItem.shiftTime),
  //   //     itemProps:
  //   //       {
  //   //         style: {
  //   //           background: "#90ef90",
  //   //           border: "1px solid red",
  //   //           color: "red",
  //   //           fontSize: "20px",
  //   //           display: "flex",
  //   //           justifyContent: "center",
  //   //           alignItems: "center",
  //   //         },
  //   //       },
  //   //   })),
  //   // );
  // }
  // console.log("successfulItems", successfulItems);

  // if (isDayWithConflict && !isEditMode) {
  //   filteredItems.push({
  //     id: "X_MARK",
  //     group: curIdDevForGreen || curIdDevice,
  //     // title: "X",
  //     start_time: setStartTimeSelectedItem(curTimeForGreen),
  //     end_time: setEndTimeSelectedItem(curTimeForGreen),
  //     itemProps:
  //       {
  //         style: {
  //           // background: "rgba(128,128,128,0)",
  //           // background: "transparent",
  //           background: "#ffa4a4",
  //           // width: "30px",
  //           // height: "30px",
  //           backgroundImage: `url(${ConflCirle})`,
  //           backgroundRepeat: "no-repeat",
  //           backgroundPosition: "center",
  //           backgroundSize: "contain",
  //           border: "1px solid red",
  //           color: "red",
  //           fontSize: "20px",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         },
  //       },
  //   });
  // }
  // if ((!isDayWithConflict && !isEditMode) || isEditMode) {
  //   filteredItems.push({
  //     id: "X_MARK",
  //     group: curIdDevForGreen || curIdDevice,
  //     start_time: setStartTimeSelectedItem(curTimeForGreen),
  //     end_time: setEndTimeSelectedItem(curTimeForGreen),
  //     itemProps:
  //       {
  //         style: {
  //           background: "#90ef90",
  //           border: "1px solid red",
  //           color: "red",
  //           fontSize: "20px",
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         },
  //       },
  //   });
  // }
  // eslint-disable-next-line
  const selectedShiftObj = {
    // title: "X",
    id: uuidv4(),
    group: curIdDevForGreen || curIdDevice,
    status: "preOrder",
    canMove: false,
    date: PR_SEL.todayFormated,
    grid: addGrid(Math.floor(+curTimeForGreen / PR_COM.shiftCateg), PR_COM.shiftCateg),
    start_time: setStartTimeSelectedItem(curTimeForGreen),
    end_time: setEndTimeSelectedItem(curTimeForGreen),
    itemTouchSendsClick: false,
    itemProps: {
      style: {
        background: "#90ef90",
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
    checkBoxId: `${curIdDevForGreen || curIdDevice} ${Math.floor(+curTimeForGreen / PR_COM.shiftCateg)}`,
  };
  // eslint-disable-next-line
  const [consideredCell, setConsideredCell] = useState(isEditMode ? selectedShiftObj : {});

  const handleBoundsChange = (timeStart, timeEnd) => {
    setVisibleTimeStart(timeStart);
    setVisibleTimeEnd(timeEnd);
  };

  const generateGroup = () => groups.map((el) => ({
    category: el.category,
    id: el.id,
    title: el.title,
    date: el.category,
    height: 36,
  }));
  const elInGroup = generateGroup().filter((el) => el.category === PR_COM.category);
  const highlightElInGroup = elInGroup.map((el) => {
    const selectedElInGroup = el.id === curIdDevice;
    return {
      ...el,
      title: (
        <div className={selectedElInGroup && !isEditMode ? styleConflict.highlightRow : ""}>
          {el.title}
        </div>
      ),
    };
  });

  // const getFormattedDate = (groupId, time) => {
  //   const date = moment(time).format("YYYY-MM-DD");
  //   const hour = moment(time).hours();
  //   const formatHour = Math.floor(hour / PR_COM.shiftCateg);
  //   let start;
  //   let end;

  //   start = formatHour * PR_COM.shiftCateg;
  //   end = start + PR_COM.shiftCateg;
  //   start = `${date} ${start}:00`;
  //   end = `${date} ${end}:00`;
  //   return {
  //     start,
  //     end,
  //   };
  // };

  // const clickOnEmptySpace = (groupId, time) => {
  //   const hour = moment(time).hours();
  //   const formatHour = Math.floor(hour / PR_COM.shiftCateg);
  //   const formattedDate = getFormattedDate(groupId, time);
  //   const obj = {
  //     id: uuidv4(),
  //     group: groupId,
  //     status: "preOrder",
  //     canMove: false,
  //     date: PR_SEL.todayFormated,
  //     grid: addGrid(formatHour, PR_COM.shiftCateg),
  //     start_time: moment(formattedDate.start).valueOf(),
  //     end_time: moment(formattedDate.end).valueOf(),
  //     itemTouchSendsClick: false,
  //     itemProps: { style: { background: "lightgray" } },
  //     deviceGroup: groupId,
  //     checkBoxId: `${groupId} ${formatHour}`,
  //   };
  //   setConsideredCell(obj);
  // };

  const handleCanvasClick = (groupId, time) => {
    // if (statusCheckboxSelected === "MYSELF" && groupId !== curIdDevice) return;
    // clickOnEmptySpace(groupId, time);
    const formattedTime = moment(time).hours();

    if (formattedTime && (formattedTime < workTime.start || formattedTime >= workTime.end)) {
      return;
    }

    if (moment(time).hours()) {
      if (isClickedConflict) {
      // console.log("Click isClickedConflict");
        const formatedConfTime = moment(time).hours();
        setConflictsArr((prev) => {
          const newConfArr = [...prev];
          newConfArr.splice(indexElementChange, 1);
          return newConfArr;
        });
        setSuccessfulArr((prev) => [
          ...prev,
          {
            shiftTime: formatedConfTime,
            id: `success_${uuidv4()}`,
            date: PR_SEL.todayFormated,
            group: groupId,
            start_time: setStartTimeSelectedItem(formatedConfTime),
            end_time: setEndTimeSelectedItem(formatedConfTime),
            canMove: false,
            itemProps: {
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
          },
        ]);
        setIsClickedConflict(false);
        setIndexElementChange(null);
      }
    }
    if (isClickedSuccess) {
      // console.log("Click isClickedSuccess");
      const formatedSuccTime = moment(time).hours();
      setSuccessfulArr((prev) => {
        const newSuccArr = [...prev];
        newSuccArr[indexElementChange] = {
          shiftTime: formatedSuccTime,
          id: `success_${uuidv4()}`,
          date: PR_SEL.todayFormated,
          group: groupId,
          start_time: setStartTimeSelectedItem(formatedSuccTime),
          end_time: setEndTimeSelectedItem(formatedSuccTime),
          canMove: false,
          itemProps: {
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
        };
        return newSuccArr;
      });
      setIsClickedSuccess(false);
      setIndexElementChange(null);
    }
  };

  const handleItemSelect = (itemId) => {
    // console.log("itemId", itemId);
    const splitedStatusId = itemId.split("_");
    // console.log("splitedStatusId", typeof splitedStatusId, splitedStatusId);
    if (indexElementChange === null && splitedStatusId[0] === "conflict") {
      // console.log("conflict");
      setIndexElementChange(conflictsArr.findIndex((el) => (el.id === itemId)));
      setIsClickedConflict(true);
    }
    if (indexElementChange === null && splitedStatusId[0] === "success") {
      // console.log("success");
      setIndexElementChange(successfulArr.findIndex((el) => (el.id === itemId)));
      setIsClickedSuccess(true);
    }
    // if (itemId === consideredCell.id) {
    //   setConsideredCell({});
    //   return;
    // }
    // if (isEditMode && itemId === "X_MARK") {
    //   setConsideredCell(selectedShiftObj);
    // }
  };

  const handleResolveConflict = () => {
    // console.log("SEND MESSAGE", successfulArr, conflictsArr);
    setSelectedConflictDate(null);

    pushOrderInBasePreOrder({
      date: PR_SEL.todayFormated,
      success: successfulArr.map((order) => (
        {
          shiftTime: order.shiftTime,
          date: order.date,
          grid: addGrid(Math.floor(order.shiftTime / PR_COM.shiftCateg), PR_COM.shiftCateg),
          group: order.group,
        }
      )),
      conflict: conflictsArr.map((order) => (
        {
          shiftTime: order.shiftTime,
          groupId: order.group,
        }
      )),
    });
  };

  return (
    <>
      <div className={style.containerTimeline}>
        <div className="style">
          <Timeline
            className={style.tableTimeline}
            groups={statusCheckboxSelected === "AUTO" ? elInGroup : highlightElInGroup}
            lineHeight={36}
            itemHeightRatio={1}
            verticalLineClassNamesForTime={(timeStart, timeEnd) => {
              const currentTimeStart = moment(timeStart).format("HH");
              const currentTimeEnd = moment(timeEnd).format("HH");
              if (moment(currentTimeStart, "HH").isBefore(moment(workTime.start, "HH"), "hours")
              || moment(currentTimeEnd, "HH").isAfter(moment(workTime.end, "HH"), "hours")
              ) {
                return [styleConflict.highlightColumn];
              }
              return [];
            }}
            horizontalLineClassNamesForGroup={(group) => {
              if (statusCheckboxSelected === "AUTO") return;
              const selectedGroup = group.id === curIdDevice;
              // eslint-disable-next-line
              return [selectedGroup && !isEditMode ? styleConflict.highlightRow : ""];
            }}
            items={filteredItems.concat(successfulArr, conflictsArr)}
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
              hour: PR_COM.shiftCateg,
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
                    {`${PR_SEL.today.format("D")} ${PR_SEL.today.format("MMMM").charAt(0).toUpperCase()}${PR_SEL.today.format("MMMM").slice(1)}`}
                  </div>
                )}
              </SidebarHeader>
              {PR_COM.shiftCateg < 2
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
        display: "flex", justifyContent: "space-between", width: "auto", margin: "0 auto",
      }}
      >
        <button
          type="button"
          // className={!consideredCell.id
          //   ? styleConflict.reserveBtnDisable
          //   : styleConflict.reserveBtn}
          // disabled={!consideredCell.id}
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
            // baseOrder.equipment?.conflicts.indexOf(PR_SEL.todayFormated)
            // eslint-disable-next-line
            // const nextIndexConfl = curIndConflInArr < baseOrder.equipment?.conflicts.length - 1 ? curIndConflInArr + 1 : 0;
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
