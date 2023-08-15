import React, { useEffect, useState } from "react";
import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader,
} from "react-calendar-timeline";
import moment from "moment";
import "moment/locale/ru";
import Calendar from "react-calendar";
import style from "./BookingTimeline.module.css";
import "react-calendar-timeline/lib/Timeline.css";
import { v4 as uuidv4 } from "uuid";
import "react-calendar/dist/Calendar.css"; // удалить для изменения стиля календаря
import { GroupSwitching } from "./components/GroupSwitching";
import "../../style.css";
import { addGrid } from "../../../DataConvertHelper";

export const BookingTimeline = ({
  selectedGroups,
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
}) => {
  const today = editOrderData?.date ? moment(editOrderData.date) : moment();
  const startOfDay = (day) => moment(day).startOf("day");
  const endOfDay = (day) => moment(day).endOf("day");

  const [visibleTimeStart, setVisibleTimeStart] = useState(startOfDay(today));
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(endOfDay(today));
  const [currentMonth, setCurrentMonth] = useState(
    moment(today).startOf("month")
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const [openGroups, setOpenGroups] = useState(false);

  // console.log("date", currentMonth.format("YYYY-MM"));
  const handleBoundsChange = (visibleTimeStart, visibleTimeEnd) => {
    setVisibleTimeStart(visibleTimeStart);
    setVisibleTimeEnd(visibleTimeEnd);
  };

  const convertGrid = (length, grid, date) => {
    const arr = grid.split("");
    const orderedTimes = {};
    for (let i = 0; i < 24; i += length) {
      if (arr[i] === "1") {
        orderedTimes.start_time = moment(date + " " + i + ":00").valueOf();
        orderedTimes.end_time = moment(
          date + " " + (i + length) + ":00"
        ).valueOf();
      }
    }
    return orderedTimes;
  };

  const convertItemsData = (items) => {
    return items
      .filter((item) => {
        console.log(
          item.group,
          currentDevice.id,
          item.date,
          currentMonth.format("YYYY-MM")
        );
        return (
          item.group === currentDevice.id &&
          item.date.startsWith(currentMonth.format("YYYY-MM"))
        );
      })
      .map((item) => {
        console.log(item);
        item.deviceGroup = item.group;
        item.group = item.date;
        const orderedTimes = convertGrid(
          groups[0].shiftLength,
          item.grid,
          today.format("YYYY-MM-DD")
        );
        item.start_time = orderedTimes.start_time;
        item.end_time = orderedTimes.end_time;
        return item;
      });
  };

  useEffect(() => {
    if (isEditMode) {
      // console.log(123, editOrderData, items, itemsPreOrder);
      const selectedItems = items.filter(
        (item) => item.rentOrderId === editOrderData.rentOrderId
      );
      // console.log(selectedItems);
      const allItems = items.filter(
        (item) => item.rentOrderId !== editOrderData.rentOrderId
      );

      const selectedItemsWithColor = convertItemsData(selectedItems).map(
        (el) => {
          // console.log(el);
          return {
            ...el,
            group: el.date,
            itemProps: { style: { background: "gray" } },
          };
        }
      );
      setUpdatedItems(allItems);
      setItemsPreOrder(selectedItemsWithColor);
      setCopyEditItems(selectedItems);
    }
  }, [editOrderData, isEditMode]);

  const copyItems = items.map((item) => Object.assign({}, item));
  console.log(itemsPreOrder);
  console.log(copyItems);

  const filteredItems = convertItemsData(copyItems);

  const generateDaysOfMonth = () => {
    const daysInMonth = moment(currentMonth).daysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = moment(currentMonth).date(i);
      days.push({
        id: date.format("YYYY-MM-DD"), //дата в качестве ID
        title: date.format("D dd").toUpperCase(), // день месяца числом - D, сокращенная абривиатура - dd
        date: date, // объект `moment(today).date(i)` для использования в items
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
    return Object.assign({}, group, {
      title: (
        <div
          className={openGroups[group.id] ? style.highlight : ""}
          onClick={() => toggleGroup(group.id)}
          style={{ cursor: "pointer" }}
        >
          {openGroups[group.id] ? "+" : "-"} {group.title}
        </div>
      ),
    });
  });

  const clickOnEmptySpace = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const shiftLength = groups[0].shiftLength;
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
    };
    setItemsPreOrder((pred) => [...pred, obj]);
  };

  const handleCanvasClick = (groupId, time, e) => {
    if (openGroups[groupId]) return;
    console.log(groupId, time, e);
    clickOnEmptySpace(groupId, time);
  };

  const handleItemSelect = (itemId) => {
    const item = itemId
      ? itemsPreOrder.find((item) => item.id === itemId)
      : null;
    if (!item) return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const getFormatedDate = (groupId, time) => {
    const date = moment(time).format("YYYY-MM-DD");
    const hour = moment(time).hours();
    const shiftLength = groups[0].shiftLength;
    const formatHour = Math.floor(hour / shiftLength);

    let start, end;

    start = formatHour * shiftLength;
    end = start + shiftLength;
    start = date + " " + start + ":00";
    end = date + " " + end + ":00";
    return {
      start,
      end,
    };
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

  const getCurrentDevicePreOrderedItems = () => {
    console.log(itemsPreOrder);
    console.log(currentDevice);
    return itemsPreOrder.filter(
      (item) => item.deviceGroup === currentDevice.id
    );
  };

  // console.log(filteredItems);
  // console.log(filteredItems.concat(getCurrentDevicePreOrderedItems()));
  // console.log(newGroups);
  return (
    <div className={style.containerTimeline}>
      <GroupSwitching
        groups={groups}
        currentDevice={currentDevice}
        setCurrentDevice={setCurrentDevice}
      />
      <div className={style.customCalendar}>
        {showCalendar && (
          <Calendar
            onClickMonth={handleDateChange}
            value={currentMonth}
            view="year"
          />
        )}
      </div>
      <Timeline
        className={style.tableTimeline}
        groups={newGroups}
        lineHeight={18}
        itemHeightRatio={1}
        horizontalLineClassNamesForGroup={(group) =>
          openGroups[group.id] ? [style.highlight] : []
        }
        items={filteredItems.concat(getCurrentDevicePreOrderedItems())}
        visibleTimeStart={visibleTimeStart}
        visibleTimeEnd={visibleTimeEnd}
        // sidebarWidth={150} // ширина левой панели по дефолту - 150px
        // rightSidebarWidth={80} // задать ширину правой панели
        buffer={1} // убрать прокрутку на колесико (день вперед/назад)
        onBoundsChange={handleBoundsChange} // границы показа времени
        maxZoom={24 * 60 * 60 * 1000} // ограничение масштаба до 1 дня
        onCanvasClick={handleCanvasClick}
        onItemSelect={handleItemSelect}
      >
        <TimelineHeaders>
          <SidebarHeader>
            {({ getRootProps }) => {
              return (
                <>
                  <button
                    {...getRootProps()}
                    style={{ width: "40px", color: "rgb(39, 128, 252)", border: "1px solid rgb(39, 128, 252)", cursor:"pointer", backgroundColor:"white" }}
                    onClick={onPreviousMonth}
                  >
                    &#9668;
                  </button>
                  <button
                    {...getRootProps()}
                    style={{ width: "70px", backgroundColor:"white",  border: "1px solid rgb(39, 128, 252)", cursor:"pointer" }}
                    onClick={chooseFromCalendar}
                  >
                    {currentMonth.format("MMMM")}
                  </button>
                  <button
                    {...getRootProps()}
                    style={{ width: "40px", color: "rgb(39, 128, 252)", border: "1px solid rgb(39, 128, 252)", cursor:"pointer", backgroundColor:"white"  }}
                    onClick={onNextMonth}
                  >
                    &#9658;
                  </button>
                </>
              );
            }}
          </SidebarHeader>
          <DateHeader unit="hour" labelFormat="H" />{" "}
          {/* отображать только часы, без минут */}
        </TimelineHeaders>
      </Timeline>
    </div>
  );
};
