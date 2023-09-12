// /* eslint-disable */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import * as WebDataRocksReact from "react-webdatarocks";
import moment from "moment";
import "moment/locale/ru";
import "webdatarocks/webdatarocks.css";
import "./custom-styles.css"; // Подключаем кастомные стили
import { v4 } from "uuid";
// import deleteItemToolbar from "./Toolbar/deleteItem";
// import addThemeToolbar from "./Toolbar/theme";

const BookedOthersKey = [
  { grid: "Hour.1", date: "Date.04-09-2023" },
  { grid: "Hour.4", date: "Date.08-09-2023" },
  { grid: "Hour.5", date: "Date.09-09-2023" },
  { grid: "Hour.3", date: "Date.02-09-2023" },
  { grid: "Hour.2", date: "Date.11-09-2023" },
  { grid: "Hour.0", date: "Date.07-09-2023" },
];

const BookedMeKey = [
  { grid: "Hour.0", date: "Date.03-09-2023" },
  { grid: "Hour.2", date: "Date.06-09-2023" },
  { grid: "Hour.4", date: "Date.09-09-2023" },
  { grid: "Hour.1", date: "Date.09-09-2023" },
];
// eslint-disable-next-line
// const BookedOthersKey = [{ grid: "Hour.1", date: "Date.4 ПН" }, { grid: "Hour.4", date: "Date.8 ПТ" }, { grid: "Hour.5", date: "Date.9 СБ" }, { grid: "Hour.3", date: "Date.2 СБ" }, { grid: "Hour.2", date: "Date.11 ПН" }, { grid: "Hour.0", date: "Date.7 ЧТ" }];
//
// const BookedMeKey = [{ grid: "Hour.0", date: "Date.3 ВС" },
// { grid: "Hour.2", date: "Date.6 СР" }, { grid: "Hour.4", date: "Date.9 СБ" }];

export default function Table() {
  const [history, setHistory] = useState([[]]);
  const [bookingTime, setBookingTime] = useState(history[0]);
  const [indexCurentHistory, setIndexCurentHistory] = useState(0);
  const today = moment();
  // eslint-disable-next-line
  const [viewedMonth, setViewedMonth] = useState(today.startOf("month"));
  // console.log("viewedMonth", today.day());
  console.log("ВТ", new Date().getDay());

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
  }, [history]);

  useEffect(() => {
    // eslint-disable-next-line
    webdatarocks.removeAllConditions();
    // eslint-disable-next-line
    bookingTime.map((el) => webdatarocks.addCondition({
      formula: "#value > 0",
      row: el.rowCell,
      column: el.columnCell,
      id: v4(),
      format: { backgroundColor: "lightblue", color: "lightblue" },
    }));
    // eslint-disable-next-line
    webdatarocks.refresh();
  }, [bookingTime]);

  const generateData = () => {
    const data = [];
    const hoursInDay = 24;
    const daysInMonth = viewedMonth.daysInMonth();
    const nameMonth = viewedMonth.format("MMMM");
    const smena = 1;

    for (let day = 1; day <= daysInMonth; day++) {
      for (let hour = 0; hour < hoursInDay; hour += smena) {
        // eslint-disable-next-line
        const test = day % 2 === 0 && hour % 2 === 0 ? 5 : 0;
        data.push({
          // Date: moment(viewedMonth).date(day).format("D dd").toUpperCase(),
          Date: moment(viewedMonth).date(day).format("DD-MM-YYYY"),
          Hour: smena !== 1 ? `с ${hour} до ${hour + smena}` : hour,
          Value: 55,
          Month: nameMonth,
        });
      }
    }
    return data;
  };

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
  // eslint-disable-next-line
  const isBookingNOWMe = (objectKey) => bookingTime.some(
    (obj) => JSON.stringify(obj) === JSON.stringify(objectKey),
  );

  // eslint-disable-next-line
  const handleCellClick = (cell) => {
    // console.log("Выделена ячейка:", cell);
    // console.log("getCell", webdatarocks.getCell(cell.rowIndex, cell.columnIndex));
    // console.log("conditions", webdatarocks.getAllConditions());
    // eslint-disable-next-line
    const value = webdatarocks.getSelectedCell(); // Если выделен одная ячейка - Object, несколько - Array
    console.log("Выделенные ячейки:", value);

    if (value.type === "value") {
      // Проверка на Object
      const selectedCell = {
        grid: value.columns.map((column) => column.uniqueName)[0],
        date: value.rows.map((row) => row.uniqueName)[0],
      };

      if (!isBookedOthers(selectedCell) && !isBookedMe(selectedCell)) {
        setHistory((prevHistory) => [
          ...prevHistory,
          [
            ...new Set(
              [
                ...prevHistory,
                { rowCell: value.rowIndex, columnCell: value.columnIndex },
              ].flat(),
            ),
          ],
        ]);
      }
    }

    if (Array.isArray(value)) {
      // Проверка на Array
      //   if (indexCurentHistory !== history.length - 1) {
      //     history.splice(indexCurentHistory + 1);
      //   }
      //   const newHistory = history;
      const newObjs = [];
      value.forEach((elCell) => {
        if (elCell.type === "value") {
          const selectedCells = {
            grid: elCell.columns.map((column) => column.uniqueName)[0],
            date: elCell.rows.map((row) => row.uniqueName)[0],
          };

          if (!isBookedOthers(selectedCells) && !isBookedMe(selectedCells)) {
            newObjs.push({
              rowCell: elCell.rowIndex,
              columnCell: elCell.columnIndex,
            });
          }
        }
      });
      if (newObjs.length) {
        setHistory((prevHistory) => [
          ...prevHistory,
          [...new Set([...prevHistory, newObjs].flat())],
        ]);
      }
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
  console.log("history:", history);
  console.log("indexCurentHistory:", indexCurentHistory);
  console.log("bookingTime:", bookingTime);

  // const customizeToolbar = (toolbar) => {
  //   // console.log("toolbar:", toolbar);
  //   deleteItemToolbar(toolbar);
  //   addThemeToolbar(toolbar);
  // };

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
    if (cellData.type === "header" && cellData.rows.length) {
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
        grid: cellData.columns.map((column) => column.uniqueName)[0],
        date: cellData.rows.map((row) => row.uniqueName)[0],
      };

      if (isBookedOthers(ObjectKey)) {
        cellBuilder.addClass("booked_by_others");
      } else if (isBookedMe(ObjectKey)) {
        cellBuilder.addClass("booked_by_me");
      } else {
        cellBuilder.addClass("default");
      }
    }
  };

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

  const pivotData = generateData();

  return (
    <div className="App">
      <button type="button" className="btn" onClick={setTitle}>
        Change Title
      </button>
      <button type="button" className="btn" onClick={updateData}>
        Update Data
      </button>
      <button type="button" className="btn" onClick={showWebDataRocks}>
        WebDataRocks
      </button>
      <button type="button" className="btn" onClick={handleBackHistory}>
        back
      </button>
      <button type="button" className="btn" onClick={handleForwardHistory}>
        forward
      </button>
      <WebDataRocksReact.Pivot
        // toolbar
        width="100%"
        // height="1000px"
        report={{
          dataSource: {
            data: pivotData,
            // filename: "https://cdn.webdatarocks.com/reports/report.json", //! Данные можно получать по ссылке
            // filename: "https://cdn.webdatarocks.com/data/data.csv",
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
  );
}
