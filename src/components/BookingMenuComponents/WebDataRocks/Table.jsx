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
import { groupByDateItems } from "../../../common/DataConvertHelper";
// import deleteItemToolbar from "./Toolbar/deleteItem";
// import addThemeToolbar from "./Toolbar/theme";

// eslint-disable-next-line
const BookedMeKey = [];

export default function Table({
  items, currentDevice, selectedCompany, groups, setCurrentDevice, currentDeviceIndex, setCurrentDeviceIndex, setItemsPreOrder, setSendItemFromeTable
}) {
  const today = moment();
  const [viewedMonth, setViewedMonth] = useState(today.startOf("month"));
  const BookedOthersKey = [];
  items.map((item) => {
    if (item.group === currentDevice.id && moment(item.date).format("MM-YYYY") === viewedMonth.format("MM-YYYY")) { // TODO Оптимизировать Вернуться позже
      const formateDate = moment(item.date).format("DD-MM-YYYY");
      const formateTime = [];
      const arrayGrid = item.grid.split("")
      for (let hourGrid = 0; hourGrid < arrayGrid.length - 1; hourGrid += currentDevice.shiftLength) {
        if (arrayGrid[hourGrid] === "1") {
          const fullTime = currentDevice.shiftLength !== 1 ? `${hourGrid}-${hourGrid + currentDevice.shiftLength}` : hourGrid;
          formateTime.push(fullTime);
        }
      }
      formateTime.map((time) => {
        BookedOthersKey.push({
          // company: item.company,
          deviceId: item.group,
          time: `Hour.${time}`, 
          date: `Date.${formateDate}`,
          grid: item.grid,
        });
      })
    }
  })

  const addGrid = (formatHour, shiftLength) => {
    const grid = new Array(24).fill(0);
    for (let i = 0; i < shiftLength; i++) {
      grid[formatHour * shiftLength + i] = 1;
    }
    return grid.join("");
  };

  console.log("BookedOthersKey", BookedOthersKey);
  // console.log("selectedCompany", selectedCompany);
  // console.log("items", items);
  // console.log("currentDevice", currentDevice.shiftLength);
  const [history, setHistory] = useState([[]]);
  const [bookingTime, setBookingTime] = useState(history[0]);
  const [indexCurentHistory, setIndexCurentHistory] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [rernderTable, setRernderTable] = useState(0);

  useEffect(() => {
    setRernderTable((prev) => prev + 1);
  }, [currentDevice, viewedMonth, selectedCompany]);
  // console.log("viewedMonth", viewedMonth.format("MMMM"));

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

  function sumNumbersFromRange(range) {
    if (range.length === 0) {
      return 0;
    }
    const numbers = range.map(Number);
    let sum = 0;
    for (let i = numbers[0]; i <= numbers[numbers.length - 1]; i++) {
      sum += i;
    }
    return sum;
  }
  function sumDate(fullDate) {
    return fullDate.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue, 10);
    }, 0);
  }

  useEffect(() => {
    // eslint-disable-next-line
    webdatarocks.removeAllConditions();
    console.log("HELOOOOOOOOOOOOOOOOOOOoo", bookingTime)
    bookingTime.map((el) => {
      // const sumDateCond = sumNumbersFromRangeASD(el.date.split('.')[1].split('-'));
      const efrvv = el.date.split('.')[1].split('-')
      // const sumTimeCond = sumDateZXC(el.time.split('.')[1].split('-'));
      const numbersd = el.time.split('.')[1].split('-').map(Number);
      let sfefrf = 0;
      for (let i = numbersd[0]; i <= numbersd[numbersd.length - 1]; i++) {
        sfefrf += i;
      }

      // console.log("HELOOOOOOOOOOOOOOOOOOOoo", +el.deviceId + +efrvv[0] + +efrvv[1] + +efrvv[2] + +sumTimeCond);
      // console.log("HELOOOOOOOOOOOOOOOOOOOooDate", el.date.split('.')[1].split('-'), +efrvv[0] + +efrvv[1] + +efrvv[2]);
      // console.log("HELOOOOOOOOOOOOOOOOOOOooTime", el.time.split('.')[1].split('-'), );
      const ddegergrg = el.date.split('.')[1].split('-') + el.time.split('.')[1].split('-') + el.deviceId.toString();
      const sdsfekjeklklk = +ddegergrg.replace(/,/g, '');
      // console.log("fekiejfkfikokm!!!!!", sdsfekjeklklk);
      // console.log("fekiejfkfikokm!!!!!", el.deviceId + +efrvv[0] * 55 + +efrvv[1] + +efrvv[2] + +sfefrf + sdsfekjeklklk);
      // eslint-disable-next-line
      webdatarocks.addCondition({
        formula: `#value = ${el.deviceId + +efrvv[0] + +efrvv[1] + +efrvv[2] + +sfefrf + sdsfekjeklklk}`,
        // row: el.rowCell,
        // column: el.columnCell,
        id: uuidv4(),
        format: { backgroundColor: "lightblue", color: "lightblue" },
      })
    });
    // eslint-disable-next-line
    webdatarocks.refresh();
  }, [bookingTime, viewedMonth, selectedCompany]);

  // Задание размеров таблицы
  const commonWidthColumn = 800;
  const countColumn = 24 / currentDevice.shiftLength;
  const arrayEmpty = new Array(countColumn).fill({}) // TODO исправить
  const widthMainCell = 100;
  const widthCell = (commonWidthColumn - widthMainCell) / countColumn;
  const widthColumnObj = [{ idx: 0, width: widthMainCell }];
  (function () {
    arrayEmpty.forEach((_, ind) => widthColumnObj.push({ idx: ind + 1, width: widthCell }))
  }());

  const allWeekType = {type: "ALLWEEK", numberDays: [1, 2, 3, 4, 5, 6, 0]}
  const weekdayType = {type: "WEEKDAY", numberDays: [1, 2, 3, 4, 5]}
  const weekendType = {type: "WEEKEND", numberDays: [6, 0]}
  const [filterWorkingDays, setFilterWorkingDays] = useState(allWeekType);
  const setFilterDays = (type) => {
    setRernderTable((prev) => prev + 1);
    setFilterWorkingDays(type)
  }
  let countDaysInChoosedFilter = 0;
  let countHoursInChoosedFilter = 1; // TODO нужно при отсутствии выбранных часов 0 НЕ выводить таблицу
  const generateData = () => {
    const data = [];
    const hoursInDay = 24;
    const daysInMonth = viewedMonth.daysInMonth();
    // const nameMonth = viewedMonth.format("MMMM");
    const smena = currentDevice.shiftLength;

    for (let day = 1; day <= daysInMonth; day++) {
      if (filterWorkingDays.numberDays.includes(new Date(`2023-${moment(viewedMonth).format("MM")}-${day}`).getDay())) {
        countDaysInChoosedFilter++ //
        for (let hour = 0; hour < hoursInDay; hour += smena) {
          const currentDateGen = moment(viewedMonth).date(day).format("DD-MM-YYYY");
          const currentTimeGen = smena !== 1 ? `${hour}-${hour + smena}` : hour;
          const codeSecret = currentDateGen.split('-') + currentTimeGen.toString().split('-') + currentDevice.id.toString();
          const sdsfekjeklklk = +codeSecret.replace(/,/g, '');
          data.push({
            // Date: moment(viewedMonth).date(day).format("D dd").toUpperCase(),
            Date: currentDateGen,
            Hour: currentTimeGen,
            Value: currentDevice.id + sumDate(currentDateGen.split('-')) + sumNumbersFromRange(currentTimeGen.toString().split('-')) + sdsfekjeklklk,
          });
        }
        }
    }
    countHoursInChoosedFilter = data.length / countDaysInChoosedFilter;
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
      if (value.columns.length) { //Клик по header времени -> веделение всей колонки
        for (let day = 1; day <= countDaysInChoosedFilter + 1; day++) {
          // eslint-disable-next-line
          dataHeaderClick.push(webdatarocks.getCell(day, value.columnIndex));
        }
      }
      for (let hour = 1; hour < countHoursInChoosedFilter + 1; hour++) { //Клик по header дня -> веделение всей строки
        // eslint-disable-next-line
        dataHeaderClick.push(webdatarocks.getCell(value.rowIndex, hour));
      }
    }
    // console.log("Выделенные ячейки:", dataHeaderClick);

    if (value.type === "value" && value.columns.length && value.rows.length) { // Проверка на Object и 
      const timeFromObjClick = value.columns.map((column) => column.uniqueName)[0];
      const formatTimeClick = timeFromObjClick?.split(".")[1].split("-")[0];
      const formatTimeClickForGrid = Math.floor(formatTimeClick / currentDevice.shiftLength);

      const adsdssfDATE = sumNumbersFromRange(value.rows.map((row) => row.uniqueName)[0].split('.')[1].split('-'));
      const dwdefTIME = sumDate(timeFromObjClick.split('.')[1].split('-'));
      // console.log("GSGSGGSGS", value.rows.map((row) => row.uniqueName)[0].split('.')[1].split('-'), adsdssfDATE, dwdefTIME, currentDevice.id + adsdssfDATE + dwdefTIME);
      // console.log("HELOOOOOOOOOOOOOOOOOOOoo", el.deviceId + adsdssfDATE + dwdefTIME);
      const selectedCell = {
        deviceId: currentDevice.id,
        time: timeFromObjClick,
        date: value.rows.map((row) => row.uniqueName)[0],
        grid: addGrid(formatTimeClickForGrid, currentDevice.shiftLength),
      };
      if (!isBookedOthers(selectedCell) && !isBookedMe(selectedCell)) {
        setHistory((prevHistory) => {
          const even = (element) => (
            JSON.stringify(element) === JSON.stringify(
              Object.assign(
                {company: {id: selectedCompany.id, name: selectedCompany.name}},
                selectedCell,
                // { rowCell: value.rowIndex, 
                //   columnCell: value.columnIndex,
                // }
              )
            )
          );

          if (prevHistory[prevHistory.length - 1].some(even)) { //! Удаление при повторном нажатии
            let fixMeLater = [...new Set([...prevHistory[prevHistory.length - 1]].flat())].filter(
              (el) => JSON.stringify(el) === JSON.stringify(
                Object.assign(
                  {company: {id: selectedCompany.id, name: selectedCompany.name}},
                  selectedCell,
                  // { rowCell: value.rowIndex, 
                  //   columnCell: value.columnIndex,
                  // }
                ),
              ),
            )
            //!
              // eslint-disable-next-line
              webdatarocks.removeAllConditions();
              fixMeLater.map((el) => {
              let efrvv = el.date.split('.')[1].split('-')
              let numbersd = el.time.split('.')[1].split('-').map(Number);
              let sfefrf = 0;
              for (let i = numbersd[0]; i <= numbersd[numbersd.length - 1]; i++) {
                sfefrf += i;
              }
              let ddegergrg = el.date.split('.')[1].split('-') + el.time.split('.')[1].split('-') + el.deviceId.toString();
              let sdsfekjeklklk = +ddegergrg.replace(/,/g, '');
              webdatarocks.addCondition({
                formula: `#value = ${el.deviceId + +efrvv[0] + +efrvv[1] + +efrvv[2] + +sfefrf + sdsfekjeklklk}`,
                id: uuidv4(),
                format: { backgroundColor: "white", color: "white" },
              })
            });
            webdatarocks.refresh();
            console.log("fixMeLater", fixMeLater);
            //!
            return [
              ...prevHistory, [...new Set([...prevHistory[prevHistory.length - 1]].flat())].filter(
                (el) => JSON.stringify(el) !== JSON.stringify(
                  Object.assign(
                    {company: {id: selectedCompany.id, name: selectedCompany.name}},
                    selectedCell,
                    // { rowCell: value.rowIndex, 
                    //   columnCell: value.columnIndex,
                    // }
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
                    {company: {id: selectedCompany.id, name: selectedCompany.name}},
                    selectedCell,
                    // { rowCell: value.rowIndex, 
                    //   columnCell: value.columnIndex,
                    // }
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
          const timeFromObjHighlightedClick = elCell.columns.map((column) => column.uniqueName)[0];
          const formatTimeHighlightedClick = timeFromObjHighlightedClick?.split(".")[1].split("-")[0];
          const formatTimeHighlightedClickForGrid = Math.floor(formatTimeHighlightedClick / currentDevice.shiftLength);
          const selectedCells = {
            deviceId: currentDevice.id,
            time: timeFromObjHighlightedClick,
            date: elCell.rows.map((row) => row.uniqueName)[0],
            grid: addGrid(formatTimeHighlightedClickForGrid, currentDevice.shiftLength),
          };
          // eslint-disable-next-line
          if (!isBookedOthers(selectedCells) && !isBookedMe(selectedCells)) {
            newObjs.push(Object.assign(
              {company: {id: selectedCompany.id, name: selectedCompany.name}},
              selectedCells,
              // { rowCell: elCell.rowIndex, 
              //   columnCell: elCell.columnIndex,
              // }
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
  console.log("history:", history);
  console.log("indexCurentHistory:", indexCurentHistory);
  console.log("bookingTime:", bookingTime);

  // const customizeToolbar = (toolbar) => {
  //   console.log("toolbar:", toolbar);
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
    // eslint-disable-next-line
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
      const timeFromObj = cellData.columns.map((column) => column.uniqueName)[0];
      const formatTimeCustomizeCell = timeFromObj?.split(".")[1].split("-")[0];
      const formatTimeCustomizeCellForGrid = Math.floor(formatTimeCustomizeCell / currentDevice.shiftLength);
      const ObjectKey = {
        deviceId: currentDevice.id,
        time: timeFromObj,
        date: cellData.rows.map((row) => row.uniqueName)[0],
        grid: addGrid(formatTimeCustomizeCellForGrid, currentDevice.shiftLength),
      };
      const ObjectKeyForBooking = {
        company: {id: selectedCompany.id, name: selectedCompany.name}, // TODO Будет показывать только отмечанные текущей компанией
        ...ObjectKey,
        // rowCell: cellData.rowIndex, 
        // columnCell: cellData.columnIndex,
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

  const handleSendBookingTime = () => {
    const arrayBook = []
    bookingTime.map((reservation) => {
      const reversFormatedDate = reservation.date.split(".")[1];
      const obj = {
        company: reservation.company,
        status: "pending",
        equipmentItems: [{
          equipment: {
            id: reservation.deviceId
          },
          intervals: [
            { 
              // date: moment(reversFormatedDate).format("YYYY-MM-DD"), //! Invalid Date после 12 числа
              date: reversFormatedDate.replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$2-$1'),
              grid: reservation.grid,
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

    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        const intervals = groupedData[key].equipmentItems[0].intervals;
        const newIntervals = groupByDateItems(intervals);
        const newFormatedIntervals = [];
        for (const date in newIntervals) {
          if (newIntervals.hasOwnProperty(date)) {
            const grid = newIntervals[date];
            newFormatedIntervals.push({ date, grid });
          }
        }
        intervals.splice(0, intervals.length);
        intervals.push(newFormatedIntervals);
      }
    }
    
    const resultArray = Object.values(groupedData);// Преобразуем объект сгруппированных данных обратно в массив
    
    console.log("resultArray:", resultArray);
    // console.log("webdatarocks.getAllConditions():", webdatarocks.getAllConditions());
    // setItemsPreOrder(resultArray);
    setSendItemFromeTable(resultArray);
  };
  useEffect(() => {
    const arrayBook = []
    bookingTime.map((reservation) => {
      const reversFormatedDate = reservation.date.split(".")[1];
      const obj = {
        company: reservation.company,
        status: "pending",
        equipmentItems: [{
          equipment: {
            id: reservation.deviceId
          },
          intervals: [
            { 
              // date: moment(reversFormatedDate).format("YYYY-MM-DD"), //! Invalid Date после 12 числа
              date: reversFormatedDate.replace(/^(\d{2})-(\d{2})-(\d{4})$/, '$3-$2-$1'),
              grid: reservation.grid,
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

    for (const key in groupedData) {
      if (groupedData.hasOwnProperty(key)) {
        const intervals = groupedData[key].equipmentItems[0].intervals;
        const newIntervals = groupByDateItems(intervals);
        const newFormatedIntervals = [];
        for (const date in newIntervals) {
          if (newIntervals.hasOwnProperty(date)) {
            const grid = newIntervals[date];
            newFormatedIntervals.push({ date, grid });
          }
        }
        intervals.splice(0, intervals.length);
        intervals.push(newFormatedIntervals);
      }
    }
    
    const resultArray = Object.values(groupedData);// Преобразуем объект сгруппированных данных обратно в массив
    
    console.log("resultArray:", resultArray);
    // console.log("webdatarocks.getAllConditions():", webdatarocks.getAllConditions());
    // setItemsPreOrder(resultArray);
    setSendItemFromeTable(resultArray);
  }, [bookingTime])

  const pivotData = generateData();
  return (
    <div className="App">
      {/* <button type="button" className="btn" onClick={setTitle}>
        Change Title
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
          ОТПРАВИТЬ
        </button> */}
        <button type="button" className="btn" onClick={() => setFilterDays(allWeekType)}>
          Все дни
        </button>
        <button type="button" className="btn" onClick={() => setFilterDays(weekdayType)}>
          Будни
        </button>
        <button type="button" className="btn" onClick={() => setFilterDays(weekendType)}>
          Выходные
        </button>
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
