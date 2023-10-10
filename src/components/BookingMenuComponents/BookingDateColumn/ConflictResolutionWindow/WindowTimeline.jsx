import React, { useState, useEffect, useCallback } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "react-tooltip";
import { addGrid } from "../../../../common/DataConvertHelper";
import buttonTitleConstants from "../../../../constants/buttonTitleConstants";
import ViewChanges from "../components/ViewChanges";
import EquipmentDescription from "../components/EquipmentDescription";
import "../../../style.css";
import style from "../BookingTimeline.module.css";
import styleConflict from "./Conflict.module.css";
import { ConflCirle } from "../../../../others/importImg";
import { generateClue } from "../../../../common/GenerateElementsData";
import PluralizeWordConflict from "../../../../common/PluralizeWordConflict";

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
  // openAlertWindow,
  deactivatedCells,
  openOverLay,
  isAddNewItem,
  setIsAddNewItem,
  calculatedOrSelectedDevice,
}) {
  const PR_COM = {
    category: baseOrder.equipment.category,
    idCategArr: groups.map((el) => el.id),
    shiftCateg: baseOrder.equipment.shiftLength,
    preferredGroupId: baseOrder.equipment.id,
    workTime: baseOrder.equipment.workTime,
    calcGroup: calculatedOrSelectedDevice,
  };
  const PR_SEL = {
    today: moment(selectedConflictDate.start),
    todayFormated: moment(selectedConflictDate.start).format("YYYY-MM-DD"),
    countOrders: selectedConflictDate.extendedProps.conflicts.length
    + selectedConflictDate.extendedProps.success.length,
  };
  // console.log("PR_COM", PR_COM);
  // console.log("PR_SEL", PR_SEL);

  const [visibleTimeStart, setVisibleTimeStart] = useState(PR_SEL.today.startOf("day").valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(PR_SEL.today.endOf("day").valueOf());
  const setStartTimeSelectedItem = (time) => PR_SEL.today.clone().set("hour", time).startOf("hour");
  const setEndTimeSelectedItem = (time) => PR_SEL.today.clone().set("hour", time).startOf("hour").add(PR_COM.shiftCateg, "hour");
  // .subtract(1, "seconds");

  const [initSuccessArr, setInitSuccessArr] = useState(
    selectedConflictDate.extendedProps.success.map((reserv) => ({
      shiftTime: reserv.shiftTime,
      id: `success_${uuidv4()}`,
      date: PR_SEL.todayFormated,
      group: +reserv.groupId,
      start_time: setStartTimeSelectedItem(reserv.shiftTime),
      end_time: setEndTimeSelectedItem(reserv.shiftTime),
      isDeleted: false,
      isChanged: false,
      itemStatus: "success",
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
        },
      },
    })),
  );
  const [initConflictArr] = useState(
    selectedConflictDate.extendedProps.conflicts.map((reserv) => ({
      shiftTime: reserv.shiftTime,
      id: `conflict_${uuidv4()}`,
      date: PR_SEL.todayFormated,
      group: +reserv.groupId,
      start_time: setStartTimeSelectedItem(reserv.shiftTime),
      end_time: setEndTimeSelectedItem(reserv.shiftTime),
      isDeleted: false,
      isChanged: false,
      itemStatus: "conflict",
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
  // console.log("initSuccessArr", initSuccessArr);
  // console.log("initConflictArr", initConflictArr);
  const [modifSuccessArr, setModifSuccessArr] = useState(initSuccessArr);
  const [modifConflictArr, setModifConflictArr] = useState(initConflictArr);
  // console.log("modifSuccessArr", modifSuccessArr);
  // console.log("modifConflictArr", modifConflictArr);
  const [isClickedItem, setIsClickedItem] = useState(false);
  const [isOrderChanged, setIsOrderChanged] = useState(false);
  const [elementForChange, setElementForChange] = useState(null);

  const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    if (isEditMode) {
      const filteredArr = items.filter((item) => PR_SEL.todayFormated === item.date
      && PR_COM.idCategArr.includes(item.group)
      && item?.rentOrderId !== editOrderData?.rentOrderId);
      setFilteredItems(filteredArr.map((prev) => ({ ...prev, itemProps: { style: { background: "#ffa4a4", border: "1px solid gray" } } })));
      return;
    }
    const filteredArr = items.filter((item) => PR_SEL.todayFormated === item.date
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
    date: el.category,
    title: (
      <div style={{
        display: "flex", alignItems: "center", height: "100%",
      }}
      >
        <div
          aria-hidden="true"
          style={{
            cursor: "pointer",
            whiteSpace: "break-spaces",
            overflow: "hidden",
            height: "100%",
            maxWidth: "155px",
            lineHeight: "15px",
            display: "flex",
            alignItems: "center",
            fontSize: "0.85rem",
          }}
        >
          {el.title}
        </div>
      </div>
    ),
    height: 36,
  }));
  const elInGroup = generateGroup().filter((el) => el.category === PR_COM.category);
  const highlightElInGroup = elInGroup.map((el) => {
    const selectedElInGroup = el.id === PR_COM.preferredGroupId;
    return {
      ...el,
      title: (
        <div
          className={selectedElInGroup && !isEditMode ? styleConflict.highlightRow : ""}
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <div
            aria-hidden="true"
            style={{
              cursor: "pointer",
              whiteSpace: "break-spaces",
              overflow: "hidden",
              height: "100%",
              maxWidth: "155px",
              lineHeight: "15px",
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
            }}
          >
            {el.title}
          </div>
        </div>
      ),
    };
  });

  const handleCanvasClick = (groupId, time) => {
    // eslint-disable-next-line
    // const formattedTime = Math.floor(moment(time).hours() / PR_COM.shiftCateg) * PR_COM.shiftCateg;
    const startWorkDay = Number(PR_COM.workTime.shiftTimes.start.split(":")[0]);
    const endWorkDay = Number(PR_COM.workTime.shiftTimes.end.split(":")[0]);
    const formattedTime = Math.floor((moment(time).hours() - startWorkDay) / PR_COM.shiftCateg)
        * PR_COM.shiftCateg + startWorkDay;

    if (formattedTime < startWorkDay || formattedTime >= endWorkDay) {
      return;
    }
    const newObjItem = {
      shiftTime: formattedTime,
      date: PR_SEL.todayFormated,
      group: groupId,
      start_time: setStartTimeSelectedItem(formattedTime),
      end_time: setEndTimeSelectedItem(formattedTime),
      isDeleted: false,
      itemStatus: "success",
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

    if (isClickedItem) {
      if (elementForChange.status === "conflict") {
        setModifConflictArr((prev) => {
          const newConfArr = [...prev];
          newConfArr.splice(elementForChange.index, 1);
          return newConfArr;
        });
      }
      const isItemBack = () => {
        if (elementForChange.status === "success") {
          const initObj = initSuccessArr[elementForChange.index];
          return !(initObj
            && initObj.id === elementForChange.id
            && initObj.group === groupId
            && initObj.shiftTime === formattedTime);
        }
        return true;
      };
      const reselectedItem = {
        id: `success_${elementForChange.id.split("_")[1]}`,
        isChanged: isItemBack(),
        ...newObjItem,
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
      setIsOrderChanged(true);
      setElementForChange(null);
    }
    if (isAddNewItem) {
      const reselectedItem = {
        id: `success_${uuidv4()}`,
        isChanged: false,
        ...newObjItem,
      };
      setInitSuccessArr((prev) => {
        const newSuccArr = [...prev];
        newSuccArr.push(reselectedItem); // Добавляем
        return newSuccArr;
      });
      setModifSuccessArr((prev) => {
        prev.splice(initSuccessArr.length, 0, reselectedItem); // Заменяем на аналог-ю позицию
        return prev;
      });
      setIsAddNewItem(false);
      setIsOrderChanged(true);
      openOverLay(false);
    }
  };

  const handleDeselectItem = () => {
    if (elementForChange) {
      let setArrayStatus = null;
      switch (elementForChange.status) {
        case "conflict":
          setArrayStatus = setModifConflictArr;
          break;
        case "success":
          setArrayStatus = setModifSuccessArr;
          break;
        default:
          return;
      }
      setArrayStatus((prev) => prev.map((item, index) => {
        if (index === elementForChange.index) {
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
      setIsClickedItem(false);
      setElementForChange(null);
    }
  };

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      handleDeselectItem();
    }
  }, [elementForChange]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return function cleanup() {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  const handleItemSelect = (itemId) => {
    // console.log("itemId", itemId);
    if (elementForChange && itemId === elementForChange.id) {
      handleDeselectItem();
    }
    const splitedStatus = itemId.split("_")[0];
    if (!elementForChange && !isAddNewItem && ["success", "conflict"].includes(splitedStatus)) {
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
      dataStatus.setArray((prev) => prev.map((item) => {
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
      }));
      setIsClickedItem(true);
    }
  };

  const handleCancelWindow = () => {
    setSelectedConflictDate(null);
    deactivatedCells();
  };

  const handleDeleteItem = () => {
    if (elementForChange) {
      let setArrayStatus = null;
      switch (elementForChange.status) {
        case "conflict":
          setArrayStatus = setModifConflictArr;
          break;
        case "success":
          setArrayStatus = setModifSuccessArr;
          break;
        default:
          return;
      }
      setArrayStatus((prev) => prev.map((item, index) => {
        if (index === elementForChange.index) {
          const updatedItemPropsStyle = { ...item.itemProps.style };
          updatedItemPropsStyle.border = "1px solid gray";
          const updatedItem = {
            ...item,
            isDeleted: true,
            itemProps: {
              ...item.itemProps,
              style: updatedItemPropsStyle,
            },
          };
          return updatedItem;
        }
        return item;
      }));
      setIsClickedItem(false);
      setIsOrderChanged(true);
      setElementForChange(null);
    }
  };

  const handleResolveConflict = () => {
    // console.log("SEND MESSAGE");
    pushOrderInBasePreOrder({
      date: PR_SEL.todayFormated,
      success: modifSuccessArr.filter((order) => order.isDeleted === false)
        .map((order) => (
          {
            date: order.date,
            group: order.group,
            shiftTime: order.shiftTime,
            grid: addGrid(Math.floor(order.shiftTime / PR_COM.shiftCateg), PR_COM.shiftCateg),
          }
        )),
      conflicts: modifConflictArr.filter((order) => order.isDeleted === false)
        .map((order) => (
          {
            groupId: order.group,
            shiftTime: order.shiftTime,
          }
        )),
    });
    setSelectedConflictDate(null);
    // if (PR_SEL.countOrders === modifSuccessArr.length
    //  + modifConflictArr.length + countAddedItems) {
    //   return;
    // }
    // openAlertWindow("Заказ не сохранён! Ошибка общего количества заказов.");
  };

  const sortingArrayViewChanges = (array) => {
    array.sort((a, b) => {
      if (a.shiftTime < b.shiftTime) return -1;
      if (a.shiftTime > b.shiftTime) return 1;
      // Если shift равны, то сравниваем по полю id
      if (a.group < b.group) return -1;
      if (a.group > b.group) return 1;
      return 0;
    });
    return array;
  };

  return (
    <>
      <div className={style.containerTimeline} style={isAddNewItem ? { zIndex: "201" } : {}}>
        <div id="riddler" className={styleConflict.riddler}>?</div>
        <Tooltip anchorSelect="#riddler" openOnClick place="bottom">
          {generateClue("TIMELINE_ROLE_COMPANY_CONFLICT")}
        </Tooltip>
        <div className="style">
          <Timeline
            className={style.tableTimeline}
            groups={statusCheckboxSelected === "AUTO" ? elInGroup : highlightElInGroup}
            lineHeight={36}
            itemHeightRatio={1}
            verticalLineClassNamesForTime={(timeStart, timeEnd) => {
              const currentTimeStart = moment(timeStart).format("HH");
              const currentTimeEnd = moment(timeEnd).format("HH");
              const day = moment(selectedConflictDate.start).locale("en").format("dddd").toLowerCase();
              if (moment(currentTimeStart, "HH").isBefore(moment(PR_COM.workTime.dayMap[day].start, "HH"), "hours")
                || moment(currentTimeEnd, "HH").isSameOrAfter(moment(PR_COM.workTime.dayMap[day].end, "HH"), "hours")
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
            items={filteredItems.concat([...modifSuccessArr, ...modifConflictArr].filter((item) => (
              item.isDeleted === false
            )))}
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
                    {`${PR_SEL.today.format("D")} ${PR_SEL.today.format("MMMM").charAt(0).toUpperCase()}${PR_SEL.today.format("MMMM").slice(1)}`}
                  </div>
                )}
              </SidebarHeader>
              <DateHeader
                unit="hour"
                labelFormat="H"
              />

              {/* {PR_COM.shiftCateg < 2 */}
              {/*  ? ( */}
              {/*    <DateHeader */}
              {/*      unit="hour" */}
              {/*      labelFormat="H" */}
              {/*    /> */}
              {/* ) */}
              {/*: ( */}
              {/*  <DateHeader */}
              {/*    unit="hour" */}
              {/* // eslint-disable-next-line react/no-unstable-nested-components */}
              {/*    intervalRenderer={({ */}
              {/*      getIntervalProps, */}
              {/*      intervalContext, */}
              {/*    }) => ( */}
              {/*      <div {...getIntervalProps()}> */}
              {/*        eslint-disable-next-line */}
              {/*        /!* {moment(+getIntervalProps().key.slice(6)).isSame(setStartTimeSelectedItem(curTime), "hours") */}
              {/*        && statusCheckboxSelected === "AUTO" */}
              {/*          ? ( */}
              {/*            <div */}
              {/*              style={{ */}
              {/*                border: "1px solid rgba(0, 0, 0)", */}
              {/*                display: "flex", */}
              {/*                justifyContent: "center", */}
              {/*              }} */}
              {/*              className={styleConflict.highlightColumn} */}
              {/*            > */}
              {/*              { */}
              {/*              `${moment(intervalContext.interval.startTime).format("H")}-${ */}
              {/*                moment(intervalContext.interval.endTime).format("H")}` */}
              {/*            } */}
              {/*            </div> */}
              {/*          ) */}
              {/*          : ( *!/ */}
              {/*        <div */}
              {/*          style={{ */}
              {/*            border: "1px solid rgba(0, 0, 0)", */}
              {/*            backgroundColor: "white", */}
              {/*            display: "flex", */}
              {/*            justifyContent: "center", */}
              {/*          }} */}
              {/*        > */}
              {/*          { */}
              {/*              `${moment(intervalContext.interval.startTime).format("H")}-${ */}
              {/*                moment(intervalContext.interval.endTime).format("H")}` */}
              {/*            } */}
              {/*        </div> */}
              {/*        /!* )} *!/ */}
              {/*      </div> */}
              {/*    )} */}
              {/*  /> */}
              {/* )} */}
            </TimelineHeaders>
          </Timeline>
        </div>
      </div>
      <div style={{
        // display: "flex", justifyContent: "space-between",
        width: "auto", margin: "0 auto",
      }}
      >
        <div>
          {modifConflictArr.length > 0
            ? (
              <p style={{ fontSize: "14px" }}>
                {"У вас "}
                <span style={{ fontWeight: "bold", color: "#f03333" }}>{modifConflictArr.length}</span>
                {" "}
                { PluralizeWordConflict(modifConflictArr.length, "конфликт")}
                .
                {/* . Нажмите на нужную смену и измените её путём нажатия на пустую ячейку. */}
              </p>
            )
            : (
              <p style={{ fontSize: "14px" }}>Подсчет смен прошел успешно.</p>
            )}
        </div>
        <div className={styleConflict.displayActionBtns}>
          <div className={styleConflict.actionBtns}>
            <button
              type="button"
              className={elementForChange || !isOrderChanged
                ? styleConflict.disableBtn
                : styleConflict.resolveBtn}
              disabled={elementForChange || !isOrderChanged}
              onClick={handleResolveConflict}
            >
              {buttonTitleConstants.CONFIRM}
            </button>
            <button
              type="button"
              className={elementForChange ? styleConflict.disableBtn : styleConflict.rejectBtn}
              disabled={elementForChange}
              onClick={handleCancelWindow}
            >
              {buttonTitleConstants.CANCEL}
            </button>
          </div>
          <div className={styleConflict.actionBtns}>
            <button
              type="button"
              className={elementForChange ? styleConflict.disableBtn : "reserved-btn reserve-timeline"}
              disabled={elementForChange}
              onClick={() => {
                setIsAddNewItem(true);
                openOverLay(true);
              }}
            >
              {buttonTitleConstants.ADD_NEW}
            </button>
            <button
              type="button"
              className={!elementForChange ? styleConflict.disableBtn : styleConflict.rejectBtn}
              disabled={!elementForChange}
              onClick={handleDeleteItem}
            >
              {buttonTitleConstants.DELETE}
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <div style={{ width: "49%" }}>
          <ViewChanges
            prevItems={sortingArrayViewChanges(initConflictArr)
              .concat(sortingArrayViewChanges(initSuccessArr))}
            newItems={modifConflictArr.concat(modifSuccessArr)}
            groups={groups}
            elementForChange={elementForChange}
            openOverLay={openOverLay}
            setIsAddNewItem={setIsAddNewItem}
            handleDeleteItem={handleDeleteItem}
            handleItemSelect={handleItemSelect}
          />
        </div>
        <div style={{ width: "49%" }}>
          {elementForChange !== null
            ? (
              <EquipmentDescription
                equipment={
                  groups.find((group) => group.id === elementForChange.group)
                }
                text="Выбранная ячейка соответствует оборудованию: "
              />
            )
            : (
              <EquipmentDescription
                equipment={PR_COM.calcGroup}
                text="Рассчёт дня производился по оборудованию: "
              />
            )}
        </div>
      </div>
    </>
  );
}
