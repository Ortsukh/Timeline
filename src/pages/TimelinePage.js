import moment from "moment";
import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";

import {
  convertTrucksToTimelineGroups,
  convertOrdersToTimelineItems,
} from "../DataConvertHelper";
import ToolsFilter from "../components/ToolsFilter";
import CountTools from "../components/CountToolsFilter";
import DateFilter from "../components/DateFilter";
import CountOrderFilter from "../components/CountOrderFilter";
import MessageWindow from "../components/MessageWindow";
import TimeLineRenderer from "../components/TimeLineRenderer";
import CompaniesSelect from "../components/CompaniesSelect";
import StatusSelect from "../components/StatusSelect";
import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";

export default function TimelinePage(props) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsPreOrder, setItemsPreOrder] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveDate, setIsActiveDate] = useState(false);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [toolsCount, setToolsCount] = useState(0);
  const [chosenDate, setChosenDate] = useState(null);
  const [orderDate, setOrderDate] = useState({
    selection1: {
      startDate: moment(
        moment().year() + "-" + moment().month() + "-" + moment().date()
      ).valueOf(),

      endDate: null,
      key: "selection1",
    },
  });

  const isAdmin = true;

  useEffect(() => {
    props.dataComponent
      .getData()
      .then((response) => {
        console.log(response);
        setGroups(convertTrucksToTimelineGroups(response.tools));
        console.log(
          convertOrdersToTimelineItems(
            response.orders,
            response.tools,
            response.companies
          )
        );
        setItems(
          convertOrdersToTimelineItems(
            response.orders,
            response.tools,
            response.companies
          )
        );
        setCompanies(response.companies);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [props.dataComponent]);

  const handleInputChange = (newInput) => {
    setSelectedGroups(() => {
      return [newInput];
    });
  };

  const addPreOrder = (groupId, time) => {
    const date = moment(time).format("MMMM DD YYYY");
    const hour = moment(time).hours();
    let start, end;

    if (hour % 2 !== 0) {
      start = date + ` ${hour - 1}:00`;
      end = date + ` ${hour + 1}:00`;
    } else {
      start = date + ` ${hour}:00`;
      end = date + ` ${hour + 2}:00`;
    }
    const obj = {
      id: Math.random() * 100,
      group: groupId,
      status: "preOrder",
      canMove: false,
      itemTouchSendsClick:true,

      start_time: moment(start).valueOf(),
      end_time: moment(end).valueOf(),
      itemTouchSendsClick: false,
      itemProps: { style: { background: "gray" } },
    };
    console.log(items);
    setItemsPreOrder((pred) => [...pred, obj]);
  };

  const clearFilter = () => {
    setSelectedGroups([]);
  };

  const choseCount = (e) => {
    setToolsCount(e.target.value);
  };

  const showDatePicker = () => {
    setIsActiveDate((current) => !current);
  };

  const mapTruckNames = () => {
    return [...new Set(groups.map((group) => group.category))];
  };

  const getGroupsToShow = () => {
    return selectedGroups.length
      ? groups.filter((group) => selectedGroups.includes(group.category))
      : groups;
  };

  const clickOnItem = (time, itemId) => {
    const item = itemId ? itemsPreOrder.find((item) => item.id === itemId) : null;
    if (!item || item.status !== "preOrder") return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const openBookingWindow = (time, posX, posY, kindModal, itemId) => {
    const item = itemId ? items.find((item) => item.id === itemId) : null;
    if (!item || item.status === "preOrder") return;
    setIsActiveMessage((current) => !current);
    const date = moment(time).format("MMMM Do YYYY");
    const hour = moment(time).hours();
    let result = date;

    result +=
      hour % 2 !== 0
        ? ` ${hour - 1}:00 - ${hour + 1}:00`
        : ` ${hour}:00 - ${hour + 2}:00`;

    // const item = itemId ? items.find((item) => item.id === itemId) : null; // дальше будет фильтр по времени и группе
    console.log(item);

    setChosenDate({
      date: result,
      posX: posX,
      posY: posY,
      kindModal,
      item: item,
    });
  };

  const closeBookingWindow = () => {
    setIsActiveMessage((current) => !current);
  };

  return isLoading ? (
    <div>"Loading Data..."</div>
  ) : (
    <>
      <div className="container sort-box">
        <div className="sort-box_item">
          <ToolsFilter
            toolNames={mapTruckNames()}
            onInputChange={handleInputChange}
            selectedGroups={selectedGroups}
            clearFilter={clearFilter}
          />

          {selectedGroups.length ? (
            <CountTools
              choseCount={choseCount}
              groupsCount={getGroupsToShow()}
            />
          ) : null}
        </div>
        <div className="sort-box_item">
          {isAdmin ? (
            <>
              {" "}
              <CompaniesSelect companies={companies} /> <StatusSelect />
            </>
          ) : null}

          <DateFilter
            showDatePicker={showDatePicker}
            isActiveDate={isActiveDate}
            setOrderDate={setOrderDate}
            orderDate={orderDate}
          />
        </div>
        <div className="sort-box_item">
          <CountOrderFilter />

          <div>
            <button className="reserved-btn">Забронировать</button>
          </div>

          {isActiveMessage ? (
            <MessageWindow
              closeBookingWindow={closeBookingWindow}
              data={chosenDate}
            />
          ) : null}
        </div>
      </div>

      <TimeLineRenderer
        groups={
          toolsCount
            ? getGroupsToShow().slice(0, toolsCount)
            : getGroupsToShow()
        }
        toolsCount={toolsCount}
        isActiveDate={isActiveDate}
        orderDate={orderDate}
        openBookingWindow={openBookingWindow}
        items={items.concat(itemsPreOrder)}
        addPreOrder={addPreOrder}
        clickOnItem={clickOnItem}
      />
    </>
  );
}
