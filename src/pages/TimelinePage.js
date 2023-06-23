import moment from "moment";
import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";

import Timeline from "react-calendar-timeline";
import DataConvertHelper from "../DataConvertHelper";
import ToolsFilter from "../components/ToolsFilter";
import CountTools from "../components/CountToolsFilter";
import DateFilter from "../components/DateFilter";
import CountOrderFilter from "../components/CountOrderFilter";
import MessageWindow from "../components/MessageWindow";
import TimeLineRenderer from "../components/TimeLineRenderer";
import "react-calendar-timeline/lib/Timeline.css";
import "../components/style.css";

export default function TimelinePage(props) {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActiveDate, setIsActiveDate] = useState(false);
  const [isActiveMessage, setIsActiveMessage] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [toolsCount, setToolsCount] = useState(0);
  const [chosenDate, setChosenDate] = useState(0);
  const [orderDate, setOrderDate] = useState({
    selection1: {
      startDate: addDays(new Date(), 1),

      endDate: null,
      key: "selection1",
    },
  }); 

  const admin = true

  useEffect(() => {
    props.dataComponent
      .getData()
      .then((response) => {
        console.log(response);
        console.log(
          DataConvertHelper.convertTrucksToTimelineGroups(response.tools)
        );
        setGroups(
          DataConvertHelper.convertTrucksToTimelineGroups(response.tools)
        );
        setItems(
          DataConvertHelper.convertOrdersToTimelineItems(
            response.orders,
            response.tools
          )
        );
        setCompanies( response.companies)
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [props.dataComponent]);

  const handleInputChange = (newInput) => {
    setSelectedGroups(() => {
      return [newInput];
    });
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

  const openBookingWindow = (time) => {
    setIsActiveMessage((current) => !current);
    const date = moment(time).format("MMMM Do YYYY");
    const hour = moment(time).hours();
    let result = date;
    result +=
      hour % 2 !== 0
        ? ` ${hour - 1}:00 - ${hour + 1}:00`
        : ` ${hour}:00 - ${hour + 2}:00`;

    setChosenDate(result);
  };

  const closeBookingWindow = () => {
    setIsActiveMessage((current) => !current);
  };

  return isLoading ? (
    <div>"Loading Data..."</div>
  ) : (
    <>
      <div className="container sort-box">
        <ToolsFilter
          toolNames={mapTruckNames()}
          onInputChange={handleInputChange}
          selectedGroups={selectedGroups}
          clearFilter={clearFilter}
        />

        {selectedGroups.length ? (
          <CountTools choseCount={choseCount} groupsCount={getGroupsToShow()} />
        ) : null}

        <DateFilter
          showDatePicker={showDatePicker}
          isActiveDate={isActiveDate}
          setOrderDate={setOrderDate}
          orderDate={orderDate}
        />

        <CountOrderFilter />

        <div>
          <button>забронировать</button>
        </div>

        {isActiveMessage ? (
          <MessageWindow
            closeBookingWindow={closeBookingWindow}
            date={chosenDate}
          />
        ) : null}
      </div>

      <TimeLineRenderer
        groups={groups}
        toolsCount={toolsCount}
        isActiveDate={isActiveDate}
        orderDate={orderDate}
        openBookingWindow={openBookingWindow}
        items={items}
      />
    </>
  );
}
