import moment from "moment";
import React, { useState, useEffect } from "react";

import {
  convertTrucksToTimelineGroups,
  convertOrdersToTimelineItems,
  createEquipmentGroup,
  createOrderGroup,
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
import { createOrder, getAllEqupments, getAllEqupments1, getAllOrders, getAllOrders1 } from "../Api/API";

export default function TimelinePage(props) {
  const [groups, setGroups] = useState([]);
  const [groups1, setGroups1] = useState([]);
  const [items, setItems] = useState([]);
  const [items1, setItems1] = useState([]);
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

  const isAdmin = false;

  // useEffect(() => {
  //   getAllEqupments().then((response) => {
  //     console.log("response", response);
  //     console.log("23123", createEquipmentGroup(response.data));
  //     setGroups1(createEquipmentGroup(response.data));

  //   });
  // }, []);

  useEffect(() => {
    getAllEqupments1().then((response) => {
      setGroups1(createEquipmentGroup(response.data));
    });

    getAllOrders1().then((response) => {
      console.log(createOrderGroup(response.data));
      setItems1(createOrderGroup(response.data));
    });
  }, []);

  useEffect(() => {
    props.dataComponent
      .getData()
      .then((response) => {
        setGroups(convertTrucksToTimelineGroups(response.tools));
    
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
    localStorage.setItem("toolsFilter", newInput);

    setSelectedGroups(() => {
      return [newInput];
    });
  };

  const sendNewOrder= () =>{
    const orders = createOrderGrid()
    console.log(orders);
    createOrder(orders).then(response => console.log(response))
  }

  const createOrderGrid = () => {
    const equipmentIdArray = {};
    const dateIntervals = [];

    itemsPreOrder.forEach((order) => {
      if (!equipmentIdArray[order.group]) {
        equipmentIdArray[order.group] = [];
      }
      equipmentIdArray[order.group].push(order);
    });
    for (let key in equipmentIdArray) {
      const equipmentIdArrayByDate = {};
      equipmentIdArray[key].forEach((order) => {
        if (!equipmentIdArrayByDate[order.date]) {
          equipmentIdArrayByDate[order.date] = [];
        }
        equipmentIdArrayByDate[order.date].push(order);
      });
      dateIntervals.push({
        equipmentId: key,
        intervals: equipmentIdArrayByDate,
      });
    }

    const result = [];
    dateIntervals.forEach((el) => {
      for (let keyObj in el.intervals) {
        let partA = 2000000000000;
        let partB = 2000000000000;

        el.intervals[keyObj].map((el) => {
          partA += Number(el.grid.slice(0, 12));
          partB += Number(el.grid.slice(12, 24));
        });

        result.push({
          equipmentId: el.equipmentId,
          date: keyObj,
          grid: String(partA).slice(1, 13) + String(partB).slice(1, 13),
        });
      }
    });
    return result
  };
  // const createOrderGrid = () => {

  //     const equipmentIdArray = {}
  //     const dateIntervals = []

  //     itemsPreOrder.map(order => {
  //       if(!equipmentIdArray[order.group]) equipmentIdArray[order.group] = []
  //       equipmentIdArray[order.group].push(order)
  //     })
  //     console.log(equipmentIdArray);
  //     for(let key in equipmentIdArray) {
  //       const equipmentIdArrayByDate = {}
  //       equipmentIdArray[key].map(order => {
  //           if(!equipmentIdArrayByDate[order.date]) equipmentIdArrayByDate[order.date] = []
  //           equipmentIdArrayByDate[order.date].push(order)
  //       })
  //       dateIntervals.push({
  //         equipmentId: key,
  //         intevals: equipmentIdArrayByDate

  //       })
  //     }
  //     const result = []
  //      dateIntervals. map(el =>  {
  //       for(let keyObj in el.intevals)  {
  //         const grid = el.intevals[keyObj].reduce((acc, interval) => {
  //           console.log(interval.grid);
  //           return (acc + Number(interval.grid))
  //         }, 5) -5 + ''
  //         let str = new Array ( 24 - grid.length).fill(0).join('')
  //       result.push({
  //         equipmentId: el.equipmentId,
  //         data:  keyObj,
  //         grid: str + grid
  //       })}})

  //     console.log(result);
  //     return result
  // }

  const addPreOrder = (groupId, time) => {
    const date = moment(time).format("MMMM DD YYYY");

    const hour = moment(time).hours();
    const formatHour = hour % 2 !== 0 ? hour - 1 : hour;
    const length = 2;
    let start, end;

    if (hour % 2 !== 0) {
      start = date + ` ${hour - 1}:00`;
      end = date + ` ${hour + 1}:00`;
    } else {
      start = date + ` ${hour}:00`;
      end = date + ` ${hour + 2}:00`;
    }
    const grid = new Array(24).fill(0);
    for (let i = 0; i < length; i++) {
      grid[formatHour + i] = 1;
    }

    const obj = {
      id: Math.random() * 100,
      group: groupId,
      status: "preOrder",
      canMove: false,
      // itemTouchSendsClick:true,
      date: date,
      grid: grid.join(""),
      start_time: moment(start).valueOf(),
      end_time: moment(end).valueOf(), //Добавить length
      itemTouchSendsClick: false,
      itemProps: { style: { background: "gray" } },
    };
    setItemsPreOrder((pred) => [...pred, obj]);
  };

  const clearFilter = () => {
    localStorage.clear("toolsFilter");
    setSelectedGroups([]);
  };

  const choseCount = (e) => {
    setToolsCount(e.target.value);
  };

  const showDatePicker = () => {
    setIsActiveDate((current) => !current);
  };

  const mapTruckNames = () => {
    return [...new Set(groups1.map((group) => group.category))];
  };

  const getGroupsToShow = () => {
    return selectedGroups.length
      ? groups1.filter((group) => selectedGroups.includes(group.category))
      : groups1;
  };

  const clickOnItem = (time, itemId) => {
    const item = itemId
      ? itemsPreOrder.find((item) => item.id === itemId)
      : null;
    if (!item || item.status !== "preOrder") return;
    setItemsPreOrder((pred) => pred.filter((el) => el.id !== itemId));
  };

  const openBookingWindow = (time, posX, posY, kindModal, itemId) => {
    console.log(itemId);
    const item = itemId ? items1.find((item) => item.id === itemId) : null;
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
              <CompaniesSelect companies={companies} /> 
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
          {/* <CountOrderFilter /> */}

          <div>
            <button
              className="reserved-btn"
              onClick={() => sendNewOrder()}
            >
              Забронировать
            </button>
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
        // groups={groups1}
        toolsCount={toolsCount}
        isActiveDate={isActiveDate}
        orderDate={orderDate}
        openBookingWindow={openBookingWindow}
        // items={items.concat(itemsPreOrder)}
        items={items1.concat(itemsPreOrder)}
        addPreOrder={addPreOrder}
        clickOnItem={clickOnItem}
      />
    </>
  );
}
