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
import buttonTitleConstants from "../../../../constants/buttonTitleConstants";

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
  openAlertWindow,
  deactivatedCells,
}) {
  const PR_COM = {
    category: baseOrder.equipment.category,
    idCategArr: groups.map((el) => el.id),
    shiftCateg: baseOrder.equipment.shiftLength,
    preferredGroupId: baseOrder.equipment.id,
    workTime: baseOrder.equipment.workTime,
  };
  // console.log("PR_COM", PR_COM);

  const today = moment(selectedConflictDate.start);
  const todayFormated = today.format("YYYY-MM-DD");
  const setStartTimeSelectedItem = (time) => today.clone().set("hour", time).startOf("hour");
  const setEndTimeSelectedItem = (time) => today.clone().set("hour", time).startOf("hour").add(PR_COM.shiftCateg, "hour");

  const PR_SEL = {
    countOrders: selectedConflictDate.extendedProps.conflicts.length
    + selectedConflictDate.extendedProps.success.length,
    // initSuccessArr: ,
    // initConflictArr: ,
  };
  const [initSuccessArr] = useState(
    selectedConflictDate.extendedProps.success.map((reserv) => ({
      shiftTime: reserv.shiftTime,
      id: `success_${uuidv4()}`,
      date: todayFormated,
      group: +reserv.groupId,
      start_time: setStartTimeSelectedItem(reserv.shiftTime),
      end_time: setEndTimeSelectedItem(reserv.shiftTime),
      isDelete: false,
      isChanged: false,
      itemProps: {
        // onDoubleClick: () => { console.log("You clicked double!"); },
        style: {
          background: "#90ef90",
          border: "1px solid gray",
          color: "red",
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:active": { background: "#ffa4a4" },
        },
      },
    })),
  );
  const [initConflictArr] = useState(
    selectedConflictDate.extendedProps.conflicts.map((reserv) => ({
      shiftTime: reserv.shiftTime,
      id: `conflict_${uuidv4()}`,
      date: todayFormated,
      group: +reserv.groupId,
      start_time: setStartTimeSelectedItem(reserv.shiftTime),
      end_time: setEndTimeSelectedItem(reserv.shiftTime),
      isDelete: false,
      isChanged: false,
      itemProps: {
        style: {
          background: "#ffa4a4",
          backgroundImage: `url(${ConflCirle})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          border: "1px solid gray",
          color: "red",
          fontSize: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    })),
  );
  // console.log("PR_SEL", PR_SEL);
  // console.log("initSuccessArr", initSuccessArr);
  // console.log("initConflictArr", initConflictArr);
  const [visibleTimeStart, setVisibleTimeStart] = useState(today.startOf("day").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(today.endOf("day").valueOf());
  // .subtract(1, "seconds");

  const [isClickedItem, setIsClickedItem] = useState(false);
  const [elementForChange, setElementForChange] = useState(null);

  const [modifSuccessArr, setModifSuccessArr] = useState(initSuccessArr);
  const [modifConflictArr, setModifConflictArr] = useState(initConflictArr);
  // console.log("modifSuccessArr", modifSuccessArr);
  // console.log("modifConflictArr", modifConflictArr);

  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (isEditMode) {
      const filteredArr = items.filter((item) => todayFormated === item.date
      && PR_COM.idCategArr.includes(item.group)
      && item?.rentOrderId !== editOrderData?.rentOrderId);
      setFilteredItems(filteredArr.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4", border: "1px solid gray" } } })));
      return;
    }
    const filteredArr = items.filter((item) => todayFormated === item.date
    && PR_COM.idCategArr.includes(item.group));
    setFilteredItems(filteredArr.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4", border: "1px solid gray" } } })));
  }, [selectedConflictDate]);

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
    const selectedElInGroup = el.id === PR_COM.preferredGroupId;
    return {
      ...el,
      title: (
        <div className={selectedElInGroup && !isEditMode ? styleConflict.highlightRow : ""}>
          {el.title}
        </div>
      ),
    };
  });

  const handleCanvasClick = (groupId, time) => {
    const formattedTime = Math.floor(moment(time).hours() / PR_COM.shiftCateg) * PR_COM.shiftCateg;
    if (formattedTime < PR_COM.workTime.start || formattedTime >= PR_COM.workTime.end) {
      return;
    }

    if (isClickedItem) {
      if (elementForChange.status === "conflict") {
        setModifConflictArr((prev) => {
          const newConfArr = [...prev];
          newConfArr.splice(elementForChange.index, 1);
          return newConfArr;
        });
      }
      // const repeatedItem = () => {
      //   if (elementForChange.status === "success") {
      //     const arr = initSuccessArr[elementForChange.index];
      //     return !((arr.id === elementForChange.id
      //     && arr.group === groupId
      //     && arr.start_time === setStartTimeSelectedItem(formattedTime)
      //     && arr.end_time === setEndTimeSelectedItem(formattedTime)));
      //   }
      //   if (elementForChange.status === "conflict") {
      //     const arr = initConflictArr[elementForChange.index];
      //     return !((arr.id === elementForChange.id
      //     && arr.group === groupId
      //     && arr.start_time === setStartTimeSelectedItem(formattedTime)
      //     && arr.end_time === setEndTimeSelectedItem(formattedTime)));
      //   }
      //   return true;
      // };
      const reselectedItem = {
        shiftTime: formattedTime,
        id: `success_${elementForChange.id.split("_")[1]}`,
        date: todayFormated,
        group: groupId,
        start_time: setStartTimeSelectedItem(formattedTime),
        end_time: setEndTimeSelectedItem(formattedTime),
        canMove: false,
        isDelete: false,
        isChanged: true,
        itemProps: {
          style: {
            background: "#90ef90",
            border: "1px solid gray",
            color: "red",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      };
      setModifSuccessArr((prev) => {
        const newSuccArr = [...prev];
        if (elementForChange.status === "conflict") {
          newSuccArr.push(reselectedItem); // Добавляем
        }
        if (elementForChange.status === "success") {
          newSuccArr[elementForChange.index] = reselectedItem; // Заменяем
        }
        return newSuccArr;
      });
      setIsClickedItem(false);
      setElementForChange(null);
    }
  };

  const handleItemSelect = (itemId) => {
    // console.log("itemId", itemId);
    const splitedStatus = itemId.split("_")[0];
    const arrayStatuses = ["success", "conflict"];

    if (elementForChange === null && arrayStatuses.includes(splitedStatus)) {
      const dataStatus = { array: [], setArray: null };
      switch (splitedStatus) {
        case "conflict":
          dataStatus.array = modifConflictArr;
          dataStatus.setArray = setModifConflictArr;
          break;
        case "success":
          dataStatus.array = modifSuccessArr;
          dataStatus.setArray = setModifSuccessArr;
          break;
        default:
          return;
      }
      const foundIndex = dataStatus.array.findIndex((el) => el.id === itemId);
      setElementForChange({
        id: itemId,
        index: foundIndex,
        group: dataStatus.array[foundIndex].group,
        status: splitedStatus,
      });
      const updatedData = dataStatus.array.map((item) => {
        if (item.id === itemId) {
          const updatedItemPropsStyle = { ...item.itemProps.style };
          updatedItemPropsStyle.border = "2px solid yellow";
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
      });
      dataStatus.setArray(updatedData);
      setIsClickedItem(true);
    }
  };

  const handleCancelSelectedItem = () => {
    setSelectedConflictDate(null);
    deactivatedCells();
  };

  const handleClearSelectedItem = () => {
    const choseStatus = elementForChange.status === "success"
      ? { array: modifSuccessArr, setArray: setModifSuccessArr }
      : { array: modifConflictArr, setArray: setModifConflictArr };

    const updatedData = choseStatus.array.map((item) => {
      if (item.id === elementForChange.id) {
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
    });
    choseStatus.setArray(updatedData);
    setIsClickedItem(false);
    setElementForChange(null);
  };

  const handleResolveConflict = () => {
    // console.log("SEND MESSAGE");
    if (PR_SEL.countOrders === modifSuccessArr.length + modifConflictArr.length) {
      pushOrderInBasePreOrder({
        date: todayFormated,
        success: modifSuccessArr.map((order) => (
          {
            shiftTime: order.shiftTime,
            date: order.date,
            grid: addGrid(Math.floor(order.shiftTime / PR_COM.shiftCateg), PR_COM.shiftCateg),
            group: order.group,
          }
        )),
        conflicts: modifConflictArr.map((order) => (
          {
            shiftTime: order.shiftTime,
            groupId: order.group,
          }
        )),
      });
      setSelectedConflictDate(null);
      return;
    }
    openAlertWindow("Заказ не сохранён! Ошибка общего количества заказов.");
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
              if (moment(currentTimeStart, "HH").isBefore(moment(PR_COM.workTime.start, "HH"), "hours")
              || moment(currentTimeEnd, "HH").isSameOrAfter(moment(PR_COM.workTime.end, "HH"), "hours")
              ) {
                return [styleConflict.highlightColumn];
              }
              return [];
            }}
            horizontalLineClassNamesForGroup={(group) => {
              if (statusCheckboxSelected === "AUTO") return;
              const selectedGroup = group.id === PR_COM.preferredGroupId;
              // eslint-disable-next-line
              return [selectedGroup && !isEditMode ? styleConflict.highlightRow : ""];
            }}
            items={filteredItems.concat(modifSuccessArr, modifConflictArr)}
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
            selected={[]}
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
                    {`${today.format("D")} ${today.format("MMMM").charAt(0).toUpperCase()}${today.format("MMMM").slice(1)}`}
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
                        {/* eslint-disable-next-line */}
                        {/* {moment(+getIntervalProps().key.slice(6)).isSame(setStartTimeSelectedItem(curTime), "hours")
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
                          : ( */}
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
                        {/* )} */}
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
          className={elementForChange !== null
            ? styleConflict.reserveBtnDisable
            : styleConflict.reserveBtn}
          disabled={elementForChange !== null}
          onClick={handleResolveConflict}
        >
          {buttonTitleConstants.CONFIRM}
        </button>
        <button
          type="button"
          className={styleConflict.closeBtn}
          onClick={() => (
            elementForChange === null
              ? handleCancelSelectedItem()
              : handleClearSelectedItem()
          )}
        >
          {elementForChange === null
            ? buttonTitleConstants.CANCEL
            : buttonTitleConstants.REMOVE_SELECTION}
        </button>
      </div>
      {elementForChange !== null
        ? (
          <EquipmentDescription equipment={
            groups.find((group) => group.id === elementForChange.group)
          }
          />
        )
        : (
          <div style={{ height: "106px", margin: "25px auto 5px" }} />
        )}
    </>
  );
}
