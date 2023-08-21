/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import Calendar from "react-calendar";
import { v4 as uuidv4 } from "uuid";
import style from "./BookingTimeline.module.css";
import "react-calendar-timeline/lib/Timeline.css";
import "react-calendar/dist/Calendar.css"; // удалить для изменения стиля календаря
import GroupSwitching from "./components/GroupSwitching";
import "../../style.css";
import { addGrid } from "../../../common/DataConvertHelper";

export default function BookingTimeline({
  groups,
  items,
  itemsPreOrder,
  setItemsPreOrder,
  editOrderData,
  setCopyEditItems,
  setUpdatedItems,
  isEditMode,
  currentDevice,
  setCurrentDevice,
  orderDatePlanning,
  setCurrentDeviceIndex,
  currentDeviceIndex,
}) {
  const today = editOrderData?.date ? moment(editOrderData.date) : moment();
  const startOfDay = (day) => moment(day).startOf("day");
  const endOfDay = (day) => moment(day).endOf("day");
  const startDate = moment(orderDatePlanning.selection1.startDate).startOf(
    "day",
  );
  const endDate = moment(orderDatePlanning.selection1.endDate).startOf("day");
  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today).valueOf());
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today).valueOf());
  const [currentMonth, setCurrentMonth] = useState(
    moment(today).startOf("month"),
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const [openGroups, setOpenGroups] = useState(false);

  const handleBoundsChange = (timeStart, timeEnd) => {
    setVisibleTimeStart(timeStart);
    setVisibleTimeEnd(timeEnd);
  };
  const convertGrid = (length, grid, date) => {
    const arr = grid.split("");
    const orderedTimes = {};
    for (let i = 0; i < 24; i += length) {
      if (arr[i] === "1") {
        orderedTimes.start_time = moment(`${date} ${i}:00`).valueOf();
        orderedTimes.end_time = moment(
          `${date} ${i + length}:00`,
        ).valueOf();
      }
    }
    return orderedTimes;
  };

  const convertItemsData = (data) => data
    .filter((item) => (
      item.group === currentDevice.id
          && item.date.startsWith(currentMonth.format("YYYY-MM"))
    ))
    .map((item) => {
      item.deviceGroup = item.group;
      item.group = item.date;
      const orderedTimes = convertGrid(
        currentDevice.shiftLength,
        item.grid,
        today.format("YYYY-MM-DD"),
      );
      item.start_time = orderedTimes.start_time;
      item.end_time = orderedTimes.end_time;
      return item;
    });

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

  const copyItems = items.map((item) => ({ ...item }));

  const filteredItems = convertItemsData(copyItems);

  const generateDaysOfMonth = () => {
    const daysInMonth = moment(currentMonth).daysInMonth();
    const days = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(currentMonth).date(i);
      days.push({
        id: date.format("YYYY-MM-DD"), // дата в качестве ID
        title: date.format("D dd").toUpperCase(), // день месяца числом - D, сокращенная абривиатура - dd
        date, // объект `moment(today).date(i)` для использования в items
        height: 18, // высота строчки
      });
    }

    return days;
  };

  const daysOfMonth = generateDaysOfMonth();

  const toggleGroup = (id) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setItemsPreOrder((pred) => pred.filter((el) => el.group !== id));
  };

  const newGroups = daysOfMonth.map((group) => {
    const selectedDate = moment(group.date).isSameOrAfter(startDate)
      && moment(group.date).isSameOrBefore(endDate);
    return {
      ...group,
      title: (
        <div
          className={`${openGroups[group.id] ? style.blocked : ""}  ${
            selectedDate ? style.highlight : ""
          }`}
          onClick={() => toggleGroup(group.id)}
          onKeyDown={() => toggleGroup(group.id)}
          aria-hidden="true"
          style={{ cursor: "pointer" }}
        >
          {openGroups[group.id] ? "+" : "-"}
          {" "}
          {group.title}
        </div>
      ),
    };
  });

  const getFormatedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const { shiftLength } = currentDevice;
    const formatHour = Math.floor(hour / shiftLength);

    let start; let
      end;

    start = formatHour * shiftLength;
    end = start + shiftLength;
    start = `${date} ${start}:00`;
    end = `${date} ${end}:00`;
    return {
      start,
      end,
    };
  };

  const clickOnEmptySpace = (groupId, time) => {
    const hour = moment(time).hours();
    const { shiftLength } = currentDevice;
    const formatHour = Math.floor(hour / shiftLength);

    const formatedDate = getFormatedDate(groupId, time);

    const obj = {
      id: uuidv4(),
      group: groupId,
      status: "preOrder",
      canMove: false,
      date: groupId,
      grid: addGrid(formatHour, shiftLength),
      start_time: moment(formatedDate.start).valueOf(),
      end_time: moment(formatedDate.end).valueOf(),
      itemTouchSendsClick: false,
      itemProps: { style: { background: "gray" } },
      deviceGroup: currentDevice.id,
      checkBoxId: `${groupId} ${formatHour}`,
    };
    setItemsPreOrder((pred) => [...pred, obj]);
  };

  const handleCanvasClick = (groupId, time) => {
    if (openGroups[groupId]) return;
    clickOnEmptySpace(groupId, time);
  };

  const handleItemSelect = (itemId) => {
    const item = itemId
      ? itemsPreOrder.find((el) => el.id === itemId)
      : null;
    if (!item) return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const onPreviousMonth = () => {
    const prevMonth = moment(currentMonth).startOf("month").add(-1, "months");
    setCurrentMonth(prevMonth);
  };

  const chooseFromCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const onNextMonth = () => {
    const nextMonth = moment(currentMonth).startOf("month").add(1, "months"); // .startOf('month') что бы не было бага с 31 числом
    setCurrentMonth(nextMonth);
  };

  const handleDateChange = (value) => {
    const newDate = moment(value);
    setCurrentMonth(newDate);
    setShowCalendar(false);
  };

  const getCurrentDevicePreOrderedItems = () => itemsPreOrder.filter(
    (item) => item.deviceGroup === currentDevice.id,
  );

  return (
    <div className={style.containerTimeline}>
      <GroupSwitching
        groups={groups}
        currentDevice={currentDevice}
        setCurrentDevice={setCurrentDevice}
        currentDeviceIndex={currentDeviceIndex}
        setCurrentDeviceIndex={setCurrentDeviceIndex}
      />
      <div className={style.customCalendar}>
        {showCalendar && (
        <Calendar
          onClickMonth={handleDateChange}
          value={currentMonth.format("YYYY MM")}
          view="year"
        />
        )}
      </div>
      <div className="style">
        <Timeline
          className={style.tableTimeline}
          groups={newGroups}
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
          items={filteredItems.concat(getCurrentDevicePreOrderedItems())}
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
          timeSteps={{
            hour: currentDevice.shiftLength,
            day: 1,
            month: 1,
            year: 1,
          }}
        >
          <TimelineHeaders>
            <SidebarHeader>
              {({ getRootProps }) => (
                <>
                  <button
                    type="button"
                    {...getRootProps()}
                    style={{
                      width: "40px",
                      color: "rgb(39, 128, 252)",
                      border: "1px solid rgb(39, 128, 252)",
                      cursor: "pointer",
                      backgroundColor: "white",
                    }}
                    onClick={onPreviousMonth}
                  >
                    &#9668;
                  </button>
                  <button
                    type="button"
                    {...getRootProps()}
                    style={{
                      width: "70px",
                      backgroundColor: "white",
                      border: "1px solid rgb(39, 128, 252)",
                      cursor: "pointer",
                    }}
                    onClick={chooseFromCalendar}
                  >
                    {currentMonth.format("MMMM")}
                  </button>
                  <button
                    type="button"
                    {...getRootProps()}
                    style={{
                      width: "40px",
                      color: "rgb(39, 128, 252)",
                      border: "1px solid rgb(39, 128, 252)",
                      cursor: "pointer",
                      backgroundColor: "white",
                    }}
                    onClick={onNextMonth}
                  >
                    &#9658;
                  </button>
                </>
              )}
            </SidebarHeader>
            {currentDevice.shiftLength < 2 ? (
              <DateHeader unit="hour" labelFormat="H" />
            )
              : (
                <DateHeader
                  unit="hour"
                  style={{ fontSize: 10 }}
              // eslint-disable-next-line react/no-unstable-nested-components
                  intervalRenderer={({
                    getIntervalProps,
                    intervalContext,
                  }) => {
                    console.log(getIntervalProps());
                    return (
                      <div {...getIntervalProps()}>
                        <div
                          style={{
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
                    );
                  }}
                />
              )}
          </TimelineHeaders>
        </Timeline>
      </div>
    </div>
  );
}
