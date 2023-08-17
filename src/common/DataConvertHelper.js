import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import orderStatus from "../constants/constants";

const createEquipmentObject = (item, elem) => ({
  id: item.id,
  title: item.name,
  type: item.type,
  category: elem.name,
  shiftLength: elem.shiftLength,
});

export const createEquipmentGroup = (equipments) => {
  const result = [];
  equipments.forEach((elem) => {
    if (elem.kitchenEquipment.length > 0) {
      elem.kitchenEquipment.forEach((item) => {
        result.push(createEquipmentObject(item, elem));
      });
    }
  });
  return result;
};

const convertGrid = (length, grid, date) => {
  const arr = grid.split("");
  const times = [];
  for (let i = 0; i < 24; i += length) {
    if (arr[i] === "1") {
      times.push({
        start_time: moment(`${date} ${i}:00`).valueOf(),
        end_time: moment(`${date} ${i + length}:00`).valueOf(),
      });
    }
  }
  return times;
};

export const addGrid = (formatHour, shiftLength) => {
  const grid = new Array(24).fill(0);

  for (let i = 0; i < shiftLength; i++) {
    grid[formatHour * shiftLength + i] = 1;
  }

  return grid.join("");
};

const createOrderObject = (order, el, shiftLength, interval) => {
  const statusColor = orderStatus[order.rentOrder.status]?.color || "rgb(39, 128, 252)";
  const itemProps = { style: { background: statusColor } };
  const hour = moment(el.start_time).hours();
  const formatHour = Math.floor(hour / shiftLength);

  return {
    id: uuidv4(),
    orderId: order.id,
    rentOrderId: order.rentOrder.id,
    group: order.equipment.id,
    intervalId: interval.id,
    start_time: el.start_time,
    end_time: el.end_time,
    company: order.rentOrder.company || null,
    status: order.rentOrder.status || "accepted",
    itemProps,
    date: interval.date,
    grid: addGrid(formatHour, shiftLength),
  };
};

export const createOrderGroup = (orders) => {
  const result = [];

  orders.forEach((order) => {
    if (!order.rentOrder || !order.equipment || !order.equipment.category) { return; }

    const { shiftLength } = order.equipment.category;

    order.intervals.forEach((interval) => {
      const formInterval = convertGrid(shiftLength, interval.grid, interval.date);

      formInterval.forEach((el) => {
        result.push(createOrderObject(order, el, shiftLength, interval));
      });
    });
  });

  return result;
};

export const formatOrder = (order) => {
  const equipmentIdArray = {};
  const dateIntervals = [];
  order.forEach((item) => {
    if (!equipmentIdArray[item.equipmentId]) {
      equipmentIdArray[item.equipmentId] = [];
    }
    equipmentIdArray[item.equipmentId].push({
      date: item.date,
      grid: item.grid,
      id: item.intervalId,
      orderItemId: item.orderItemId,
    });
  });
  const keys = Object.keys(equipmentIdArray);
  keys.forEach((key) => {
    dateIntervals.push({
      equipment: { id: key },
      id: equipmentIdArray[key][0].orderItemId,
      intervals: equipmentIdArray[key],
    });
  });
  return dateIntervals;
};

export const createOrderGrid = (itemsPreOrder) => {
  const equipmentIdArray = {};
  const dateIntervals = [];
  itemsPreOrder.forEach((order) => {
    if (!equipmentIdArray[order.group]) {
      equipmentIdArray[order.group] = [];
    }
    equipmentIdArray[order.group].push(order);
  });
  const keys = Object.keys(equipmentIdArray);
  keys.forEach((key) => {
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
  });
  const result = [];
  dateIntervals.forEach((el) => {
    const keysObj = Object.keys(equipmentIdArray);
    keysObj.forEach((keyObj) => {
      let partA = 2000000000000;
      let partB = 2000000000000;
      let intervalId;
      el.intervals[keyObj].forEach((element) => {
        partA += Number(element.grid.slice(0, 12));
        partB += Number(element.grid.slice(12, 24));
        intervalId = intervalId || element.intervalId;
      });

      result.push({
        intervalId,
        equipmentId: el.equipmentId,
        orderItemId: el.intervals[keyObj][0].orderId,
        date: keyObj,
        grid: String(partA).slice(1, 13) + String(partB).slice(1, 13),
      });
    });
  });
  return result;
};

export const groupByDateItems = (items) => {
  const dateObj = {};

  items.forEach((item) => {
    if (!dateObj[item.date]) {
      dateObj[item.date] = [];
    }
    dateObj[item.date].push(item.grid);
  });
  const keys = Object.keys(dateObj);
  keys.forEach((key) => {
    let partA = 2000000000000;
    let partB = 2000000000000;
    dateObj[key].forEach((grid) => {
      partA += Number(grid.slice(0, 12));
      partB += Number(grid.slice(12, 24));
    });

    dateObj[key] = String(partA).slice(1, 13) + String(partB).slice(1, 13);
  });

  return dateObj;
};
