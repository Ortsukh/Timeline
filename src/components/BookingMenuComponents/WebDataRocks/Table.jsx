/* eslint-disable */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import * as WebDataRocksReact from "react-webdatarocks";
import moment from "moment";
import "moment/locale/ru";
import "webdatarocks/webdatarocks.css";
import "./custom-styles.css"; // Подключаем кастомные стили
import { v4 as uuidv4 } from "uuid";
import Calendar from "react-calendar";
import GroupSwitching from "../BookingDateColumn/components/GroupSwitching";
// import deleteItemToolbar from "./Toolbar/deleteItem";
// import addThemeToolbar from "./Toolbar/theme";
// eslint-disable-next-line
// eslint-disable-next-line
const BookedOthersKey = [
  // { grid: "Hour.1", date: "Date.04-09-2023" },
  // { grid: "Hour.4", date: "Date.08-09-2023" },
  // { grid: "Hour.5", date: "Date.09-09-2023" },
  // { grid: "Hour.3", date: "Date.02-09-2023" },
  // { grid: "Hour.2", date: "Date.11-09-2023" },
  // { grid: "Hour.0", date: "Date.07-09-2023" },
];
// eslint-disable-next-line
const BookedMeKey = [
  // { grid: "Hour.0", date: "Date.03-09-2023" },
  // { grid: "Hour.2", date: "Date.06-09-2023" },
  // { grid: "Hour.4", date: "Date.09-09-2023" },
  // { grid: "Hour.1", date: "Date.09-09-2023" },
];

export default function Table({
  items, currentDevice, selectedCompany, groups, setCurrentDevice, currentDeviceIndex, setCurrentDeviceIndex
}) {
  const BookedOthersKey = [];
  items.map((item) => {
    if (item.group === currentDevice.id ) { // TODO Оптимизировать Вернуться позже
      const company = item.company;
      const deviceId = item.group;
      const formateDate = moment(item.date).format("DD-MM-YYYY");
      const formateTime = [];
      item.grid.split("").map((number, index) => {
        if (number === "1") {
          formateTime.push(index);
        }
      });
      formateTime.map((time) => {
        BookedOthersKey.push({
          company: company,
          deviceId: deviceId,
          grid: `Hour.${time}`, 
          date: `Date.${formateDate}`,
        });
      })
    }
  })

  // console.log("BookedOthersKey", BookedOthersKey);
  // console.log("selectedCompany", selectedCompany);
  // console.log("items", items);
  // console.log("currentDevice", currentDevice.shiftLength);
  const [history, setHistory] = useState([[]]);
  const [bookingTime, setBookingTime] = useState(history[0]);
  const [indexCurentHistory, setIndexCurentHistory] = useState(0);
  const today = moment();
  const [viewedMonth, setViewedMonth] = useState(today.startOf("month"));
  const [showCalendar, setShowCalendar] = useState(false);
  const [rernderTable, setRernderTable] = useState(0);

  useEffect(() => {
    setRernderTable((prev) => prev + 1);
  }, [currentDevice, viewedMonth, selectedCompany]);
  // console.log("viewedMonth", viewedMonth.format("MMMM"));
  // console.log("СР", new Date().getDay());

  const handleClickOnBack = () => {
    // console.log("!!!!!!!!!!!!!!!! history Back:", history);
    // console.log("!!!!!!!!!!!!!!!! history.length Back:", history.length - 1);
    // console.log("!!!!!!!!!!!!!!!! indexCurent Back:", indexCurentHistory);
    if (indexCurentHistory - 1 !== history.length - 1) {
      setHistory(history.slice(0, indexCurentHistory));
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickOnBack);
    }
  };
  const handleClickForward = () => {
    // console.log("!!!!!!!!!!!!!!!! history Forward:", history);
    // console.log("!!!!!!!!!!!!!!!! history.length Forward:", history.length - 1);
    // console.log("!!!!!!!!!!!!!!!! indexCurent Forward:", indexCurentHistory);
    if (indexCurentHistory !== history.length - 1) {
      setHistory(history.slice(0, indexCurentHistory + 2));
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickForward);
    }
  };

  useEffect(() => {
    setBookingTime(history[history.length - 1]);
    setIndexCurentHistory(history.length - 1);
  }, [history, viewedMonth, selectedCompany]);

  useEffect(() => {
    // eslint-disable-next-line
    webdatarocks.removeAllConditions();
    // eslint-disable-next-line
    bookingTime.map((el) => webdatarocks.addCondition({
      formula: `#value = ${el.deviceId + parseInt(el.date.split('.')[1].split('-')[1])}`,
      row: el.rowCell,
      column: el.columnCell,
      id: uuidv4(),
      format: { backgroundColor: "lightblue", color: "lightblue" },
    }));
    // eslint-disable-next-line
    webdatarocks.refresh();
  }, [bookingTime, viewedMonth, selectedCompany]);

  const commonWidthColumn = 800;
  const countColumn = 24 / currentDevice.shiftLength;
  const arrayEmpty = new Array(countColumn).fill({})
  const widthMainCell = 100;
  const widthCell = (commonWidthColumn - widthMainCell) / countColumn;
  const widthColumnObj = [{ idx: 0, width: widthMainCell }]
  const addSizeCell = () => {
    // console.log("HEllo");
    // widthColumnObj.push({ idx: 0, width: `${widthMainCell}px` })
    arrayEmpty.forEach((_, ind) => widthColumnObj.push({ idx: ind + 1, width: widthCell }))
    // for (let hourColumn = 1; hourColumn <= countColumn.length; hourColumn++) {
      // console.log("HEllo");
    //   // console.log("widthColumnObject:", { idx: `${hourColumn}px`, width: `${widthCell}px` });
    //   widthColumnObject.push({ idx: `${hourColumn}px`, width: `${widthCell}px` })
    // }
  }
  addSizeCell()

  console.log("widthColumnObj:", widthColumnObj);

  const generateData = () => {
    const data = [];
    const hoursInDay = 24;
    const daysInMonth = viewedMonth.daysInMonth();
    // const nameMonth = viewedMonth.format("MMMM");
    const smena = currentDevice.shiftLength;

    for (let day = 1; day <= daysInMonth; day++) {
      for (let hour = 0; hour < hoursInDay; hour += smena) {
        // eslint-disable-next-line
        const test = day % 2 === 0 && hour % 2 === 0 ? 5 : 0;
        data.push({
          // Date: moment(viewedMonth).date(day).format("D dd").toUpperCase(),
          Date: moment(viewedMonth).date(day).format("DD-MM-YYYY"),
          Hour: smena !== 1 ? `${hour}-${hour + smena}` : hour,
          Value: currentDevice.id + parseInt(moment(viewedMonth).date(day).format("MM")),
          // Month: nameMonth,
        });
      }
    }
    return data;
  };

  // eslint-disable-next-line
  const updateData = () => {
    // eslint-disable-next-line
    webdatarocks.updateData({
      data: generateData(),
    });
    // eslint-disable-next-line
    webdatarocks.refresh();
  };

  const isBookedOthers = (objectKey) => BookedOthersKey.some(
    (obj) => JSON.stringify(obj) === JSON.stringify(objectKey),
  );
  const isBookedMe = (objectKey) => BookedMeKey.some(
    (obj) => JSON.stringify(obj) === JSON.stringify(objectKey),
  );
  const isBookingMeNOW = (objectKey) => bookingTime.some(
    (obj) => JSON.stringify(obj) === JSON.stringify(objectKey),
  );

  // eslint-disable-next-line
  const handleCellClick = (cell) => {
    // console.log("Выделена ячейка:", cell);
    // console.log("conditions", webdatarocks.getAllConditions());
    // eslint-disable-next-line
    const value = webdatarocks.getSelectedCell(); // Если выделен одная ячейка - Object, несколько - Array
    console.log("Выделенные ячейки:", value);
    const dataHeaderClick = [];
    if (value.type === "header") {
      // console.log("Выделенные ячейки:", generateData());
      const daysInCells = viewedMonth.daysInMonth();
      if (value.columns.length) {
        for (let day = 1; day <= daysInCells + 1; day++) { // 1 + 1 потому что не включая header
          // eslint-disable-next-line
          dataHeaderClick.push(webdatarocks.getCell(day, value.columnIndex));
        }
      }
      for (let hour = 1; hour <= 24; hour++) {
        // eslint-disable-next-line
        dataHeaderClick.push(webdatarocks.getCell(value.rowIndex, hour));
      }
    }
    // console.log("Выделенные ячейки:", dataHeaderClick);

    if (value.type === "value") { // Проверка на Object
      const selectedCell = {
        company: {id: selectedCompany.id, name: selectedCompany.name},
        deviceId: currentDevice.id,
        grid: value.columns.map((column) => column.uniqueName)[0],
        date: value.rows.map((row) => row.uniqueName)[0],
      };
      if (!isBookedOthers(selectedCell) && !isBookedMe(selectedCell)) {
        setHistory((prevHistory) => {
          const even = (element) => (
            JSON.stringify(element) === JSON.stringify(
              Object.assign(
                selectedCell,
                { rowCell: value.rowIndex, 
                  columnCell: value.columnIndex,
                }
              )

            )
          );

          if (prevHistory[prevHistory.length - 1].some(even)) {
            return [
              ...prevHistory, [...new Set([...prevHistory[prevHistory.length - 1]].flat())].filter(
                (el) => JSON.stringify(el) !== JSON.stringify(
                  Object.assign(
                    selectedCell,
                    { rowCell: value.rowIndex, 
                      columnCell: value.columnIndex,
                    }
                  ),
                ),
              ),
            ];
          }

          return [
            ...prevHistory,
            [
              ...new Set(
                [
                  ...prevHistory[prevHistory.length - 1],
                  Object.assign(
                    selectedCell,
                    { rowCell: value.rowIndex, 
                      columnCell: value.columnIndex,
                    }
                  ),
                ].flat(),
              ),
            ],
          ];
        });
      }
    }

    if (Array.isArray(value) || dataHeaderClick.length) { // Проверка на Array
      const newObjs = [];
      const arrayValues = dataHeaderClick.length ? dataHeaderClick : value;
      arrayValues.forEach((elCell) => {
        if (elCell.type === "value") {
          const selectedCells = {
            company: {id: selectedCompany.id, name: selectedCompany.name},
            deviceId: currentDevice.id,
            grid: elCell.columns.map((column) => column.uniqueName)[0],
            date: elCell.rows.map((row) => row.uniqueName)[0],
          };
          // eslint-disable-next-line
          if (!isBookedOthers(selectedCells) && !isBookedMe(selectedCells)) {
            newObjs.push(Object.assign(
              selectedCells,
              { rowCell: elCell.rowIndex, 
                columnCell: elCell.columnIndex,
              }
            ));
          }
        }
      });
      setHistory((prevHistory) => {
        if (newObjs.length
          // TODO Очень большой костыль !!ИСПРАВИТЬ
          && JSON.stringify(prevHistory[prevHistory.length - 1]) !== JSON.stringify(
            [...new Set([[...prevHistory[prevHistory.length - 1], newObjs]]
              .flat(2)
              .map(JSON.stringify))]
              .map(JSON.parse),
          )) {
          const result = [[...prevHistory[prevHistory.length - 1], newObjs]].flat(2);
          return [
            ...prevHistory,
            [...new Set(result.map(JSON.stringify))].map(JSON.parse),
          ];
        }

        return prevHistory;
      });
    }
  };

  const handleBackHistory = () => {
    if (indexCurentHistory > 0) {
      console.log("indexCurentHistory FIRST", indexCurentHistory);
      setBookingTime(() => history[indexCurentHistory - 1]);
      setIndexCurentHistory((prev) => prev - 1);
      console.log("indexCurentHistory SECOND", indexCurentHistory);
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickOnBack);
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickForward);
      // eslint-disable-next-line
      (function () {
        // eslint-disable-next-line
        webdatarocks.on("cellclick", handleClickOnBack);
      }());
      console.log("indexCurentHistory THIRD", indexCurentHistory);
    }
  };

  const handleForwardHistory = () => {
    if (indexCurentHistory < history.length - 1) {
      setBookingTime(() => history[indexCurentHistory + 1]);
      setIndexCurentHistory((prev) => prev + 1);
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickOnBack);
      // eslint-disable-next-line
      webdatarocks.off("cellclick", handleClickForward);
      // eslint-disable-next-line
      (function () {
        // eslint-disable-next-line
        webdatarocks.on("cellclick", handleClickForward);
      }());
    }
  };
  // console.log("history:", history);
  // console.log("indexCurentHistory:", indexCurentHistory);
  console.log("bookingTime:", bookingTime);

  // const customizeToolbar = (toolbar) => {
  //   // console.log("toolbar:", toolbar);
  //   deleteItemToolbar(toolbar);
  //   addThemeToolbar(toolbar);
  // };

  // eslint-disable-next-line
  const setTitle = () => {
    // eslint-disable-next-line
    webdatarocks.setOptions({
      grid: { title: "Меняем оборудование" },
    });
    // eslint-disable-next-line
    webdatarocks.refresh();
  };

  const customizeCellFunction = (cellBuilder, cellData) => {
    // console.log("cellData", cellData);
    // cellBuilder.addClass("siza_cell_custome");
    if (cellData.type === "header" && cellData.columns.length) {
      cellBuilder.addClass("custome_header_columns");
    }

    if (cellData.type === "header" && cellData.rows.length) {
      cellBuilder.addClass("custome_header_rows");
      const captionInMomentMember = moment(
        cellData.member.caption,
        "DD-MM-YYYY",
      );
      const newCaptionMember = captionInMomentMember
        .format("D dd")
        .toUpperCase();
      cellData.member.caption = newCaptionMember;

      cellData.rows.forEach((el) => {
        const captionInMoment = moment(el.caption, "DD-MM-YYYY");
        const newCaption = captionInMoment.format("D dd").toUpperCase();
        el.caption = newCaption;
      });
    }

    if (cellData.type === "value") {
      const ObjectKey = {
        company: {id: selectedCompany.id, name: selectedCompany.name},
        deviceId: currentDevice.id,
        grid: cellData.columns.map((column) => column.uniqueName)[0],
        date: cellData.rows.map((row) => row.uniqueName)[0],
      };
      const ObjectKeyForBooking = {
        company: {id: selectedCompany.id, name: selectedCompany.name},
        deviceId: currentDevice.id,
        grid: cellData.columns.map((column) => column.uniqueName)[0],
        date: cellData.rows.map((row) => row.uniqueName)[0],
        rowCell: cellData.rowIndex, 
        columnCell: cellData.columnIndex,
      };
      if (isBookedOthers(ObjectKey)) {
        cellBuilder.addClass("booked_by_others");
      } else if (isBookedMe(ObjectKey)) {
        cellBuilder.addClass("booked_by_me");
      } else if (isBookingMeNOW(ObjectKeyForBooking)) {
        cellBuilder.addClass("booking_me_now");
      } else {
        cellBuilder.addClass("default");
      }
    }
  };

  // eslint-disable-next-line
  const showWebDataRocks = () => {
    console.log(
      "getData",
      // eslint-disable-next-line
      webdatarocks.getData({}, (data) => {
        console.log(data);
      }),
    );
    // eslint-disable-next-line
    const info = webdatarocks.getCell(2, 1);
    console.log("getCell(2, 1)", info);
    // eslint-disable-next-line
    console.log("OPTIONS", webdatarocks.getOptions());

    console.log(
      "webdatarocks.getAllConditions()",
      // eslint-disable-next-line
      webdatarocks.getAllConditions(),
    );
    // eslint-disable-next-line
    const cond = webdatarocks.getAllConditions();
    // eslint-disable-next-line
    webdatarocks.removeAllConditions();
    // eslint-disable-next-line
    webdatarocks.addCondition({
      formula: "#value > 50",
      format: {
        backgroundColor: "#C5E1A5",
        color: "#000000",
        fontFamily: "Arial",
        fontSize: "12px",
      },
    });
    // eslint-disable-next-line
    webdatarocks.refresh();
  };

  const chooseFromCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (value) => {
    const newDate = moment(value);
    setViewedMonth(newDate);
    setShowCalendar(false);
    setRernderTable((prev) => prev + 1)
  };

  const addGrid = (formatHour, shiftLength) => {
    const grid = new Array(24).fill(0);
    for (let i = 0; i < shiftLength; i++) {
      grid[formatHour * shiftLength + i] = 1;
    }
    return grid.join("");
  };
  const handleSendBookingTime = () => {
    const arrayBook = []
    const { shiftLength } = currentDevice;

    // const formattedDate = getFormattedDate(groupId, time);
    // if (moment(`${groupId} ${hour}:00`).isBefore(moment.now())) return;

    bookingTime.map((reservation) => {
      const reversFormatedDate = reservation.date.split(".")[1];
      const reversFormatedTime = reservation.grid.split(".")[1];
      const formatHour = Math.floor(reversFormatedTime / shiftLength);
      const obj = {
        company: reservation.company,
        status: "pending",
        equipmentItems: [{
          equipment: {
            id: reservation.deviceId
          },
          intervals: [
            {
              date: moment(reversFormatedDate).format("YYYY-MM-DD"),
              grid: addGrid(formatHour, shiftLength),
            }
          ]
        }],
      };
      arrayBook.push(obj)
    })
    const groupedData = {};

    arrayBook.forEach(item => {
      const companyId = item.company.id;
      const equipmentId = item.equipmentItems[0].equipment.id;
      
      const key = `${companyId}-${equipmentId}`;
      
      if (!groupedData[key]) {
        groupedData[key] = { ...item };
      } else {
        groupedData[key].equipmentItems[0].intervals.push(...item.equipmentItems[0].intervals);
      }
    });
    
    // Преобразуем объект сгруппированных данных обратно в массив
    const resultArray = Object.values(groupedData);
    
    console.log("sendArray:", arrayBook);
    console.log("resultArray:", resultArray);
    console.log("webdatarocks.getAllConditions():", webdatarocks.getAllConditions());
    // setItemsPreOrder((pred) => [...pred, obj]);
  };

  const pivotData = generateData();

  return (
    <div className="App">
      {/* <button type="button" className="btn" onClick={setTitle}>
        Change Title
      </button>
      <button type="button" className="btn" onClick={updateData}>
        Update Data
      </button>
      <button type="button" className="btn" onClick={showWebDataRocks}>
        WebDataRocks
      </button> */}

      <div className="btn-cont">
        {showCalendar && (
        <Calendar
          onClickMonth={handleDateChange}
          value={viewedMonth.format("YYYY MM")}
          view="year"
          formatMonth={(locale, date) => date.toLocaleDateString(locale, { month: "long" }).charAt(0).toUpperCase()
            + date.toLocaleDateString(locale, { month: "long" }).slice(1)}
        />
        )}
        <button type="button" className="btn btn-calendar" onClick={chooseFromCalendar}>
          {viewedMonth.format("MMMM").charAt(0).toUpperCase() + viewedMonth.format("MMMM").slice(1)}
        </button>
        {/* <button type="button" className="btn" onClick={handleSendBookingTime}>
          Send
        </button> */}
        <GroupSwitching 
          groups={groups}
          currentDevice={currentDevice}
          setCurrentDevice={setCurrentDevice}
          currentDeviceIndex={currentDeviceIndex}
          setCurrentDeviceIndex={setCurrentDeviceIndex}
        />
        <div className="btn-arrow-cont">
          <button type="button" className="btn btn-back" onClick={handleBackHistory}></button>
          <button type="button" className="btn btn-forward" onClick={handleForwardHistory}></button>
        </div>
      </div>

      <div key={rernderTable}>
      <WebDataRocksReact.Pivot
        // toolbar
        width={`${commonWidthColumn}px`} //860
        height="600px" //615
        report={{
          dataSource: {
            data: pivotData,
            // filename: "https://cdn.webdatarocks.com/reports/report.json", //! Данные можно получать по ссылке
            // filename: "https://cdn.webdatarocks.com/data/data.csv",
          },
          tableSizes: {
            columns: widthColumnObj,
            // rows: [
            //   {
            //     idx: 3,
            //     height: 10
            //   }
            // ]
          },
          slice: {
            rows: [{ uniqueName: "Date", caption: "Дни", sort: "unsorted" }],
            columns: [
              { uniqueName: "Hour", caption: "Часы", sort: "unsorted" },
            ],
            measures: [
              { uniqueName: "Value", caption: "Цена", aggregation: "sum" },
            ],
          },
          options: {
            showHeaders: false, // Убираем нумерацию строк и столбцов
            showTotals: false, // Убираем суммы снизу
            showGrandTotals: false, // Убираем суммы справа
            configuratorButton: false, // Убираем бургер с настройками
            sorting: "off", // Убираем сортировку в ячейках
            // drillThrough: false, //! Убираем подробное описание ячейки
            // dragging: false, // Отключаем Drag and Drop //! НЕ работает
            // grid: {
            //   title: "Название оборудования",
            // },
          },
        }}
        toolbar={false}
        cellclick={handleCellClick}
        // beforetoolbarcreated={customizeToolbar}
        customizeCell={customizeCellFunction}
      />
      </div>
    </div>
  );
}

// {
//   "company": {
//       "id": 1,
//       "name": "Суши \"Минск-сити\""
//   },
//   "status": "pending",
//   "equipmentItems": [
//       {
//           "equipment": {
//               "id": "11"
//           },
//           "intervals": [
//               {
//                   "date": "2023-09-16",
//                   "grid": "001100000000000000000000"
//               },
//               {
//                 "date": "2023-09-16",
//                 "grid": "001100000000000000000000"
//             }
//           ]
//       }
//   ]
// },
// {
//   "company": {
//       "id": 1,
//       "name": "Суши \"Минск-сити\""
//   },
//   "status": "pending",
//   "equipmentItems": [
//       {
//           "equipment": {
//               "id": "2"
//           },
//           "intervals": [
//               {
//                   "date": "2023-09-16",
//                   "grid": "001100000000000000000000"
//               }
//           ]
//       }
//   ]
// },
// {
//   "company": {
//       "id": 1,
//       "name": "Суши \"Минск-сити\""
//   },
//   "status": "pending",
//   "equipmentItems": [
//       {
//           "equipment": {
//               "id": "11"
//           },
//           "intervals": [
//               {
//                   "date": "2023-09-16",
//                   "grid": "001100000000000000000000"
//               }
//           ]
//       }
//   ]
// }