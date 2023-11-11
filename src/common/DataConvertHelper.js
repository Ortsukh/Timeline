import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import orderStatus from "../constants/constants";

const createWorkTimeMap = (workTimesArr) => {
  let shiftTimes = { start: "0:00", end: "24:00" };
  let dayMap = {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  };
  if (!workTimesArr.length) {
    dayMap = {
      monday: { start: "0:00", end: "24:00" },
      tuesday: { start: "0:00", end: "24:00" },
      wednesday: { start: "0:00", end: "24:00" },
      thursday: { start: "0:00", end: "24:00" },
      friday: { start: "0:00", end: "24:00" },
      saturday: { start: "0:00", end: "24:00" },
      sunday: { start: "0:00", end: "24:00" },
    };
    return { dayMap, shiftTimes };
  }
  const time = workTimesArr[0];
  if (time.monday) {
    dayMap.monday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.tuesday) {
    dayMap.tuesday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.wednesday) {
    dayMap.wednesday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.thursday) {
    dayMap.thursday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.friday) {
    dayMap.friday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.saturday) {
    dayMap.saturday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  if (time.sunday) {
    dayMap.sunday = { start: time.timeFrom, end: time.timeTo };
    shiftTimes = { start: time.timeFrom, end: time.timeTo };
  }
  return { dayMap, shiftTimes };
};

const createEquipmentObject = (item, elem) => ({
  id: item.id,
  title: item.name,
  color: elem.color,
  type: item.type,
  category: elem.name,
  shiftLength: elem.shiftLength,
  price: item.price,
  description: item.description,
  workTime: createWorkTimeMap(item.marketPlace.conditionTimes),
  img: item.image,
  shortTitle: item.shortName,
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
  for (let i = 0; i < 24; i++) {
    if (arr[i] === "1") {
      times.push({
        start_time: moment(`${date} ${i}:00`).valueOf(),
        end_time: moment(`${date} ${i + length}:00`).valueOf(),
      });
      i += length - 1;
    }
  }
  return times;
};

const addStartGrid = (formatHour, shiftLength) => {
  const grid = new Array(24).fill(0);
  for (let i = 0; i < shiftLength; i++) {
    grid[formatHour + i] = 1;
  }
  return grid.join("");
};

export const addGrid = (formatHour, shiftLength, startWorkDay = 0) => {
  const grid = new Array(24).fill(0);
  for (let i = 0; i < shiftLength; i++) {
    grid[formatHour * shiftLength + startWorkDay + i] = 1;
  }

  return grid.join("");
};
const getOrderColor = (order, user) => {
  // if (user === null) return orderStatus.waitingRole.color;
  const isCompanyOrder = user && user.role === "ROLE_COMPANY" && user.id === order.rentOrder.company?.id;
  const isFranchise = user && user.role === "ROLE_MANAGER";
  // if (isCompanyOrder) return orderStatus[order.rentOrder.status]?.color;
  if (isCompanyOrder && order.rentOrder.status === "pending") return orderStatus.pending.color;
  if (isCompanyOrder && order.rentOrder.status === "accepted") return orderStatus.accepted.color;
  if (user && user.role === "ROLE_COMPANY") return orderStatus.other.color;
  if (isFranchise) {
    switch (order.rentOrder.status) {
      case "pending":
        return orderStatus.franchise.pending.color;
      case "rejected":
        return orderStatus.franchise.rejected.color;
      case "accepted":
        return orderStatus.franchise.accepted.color;
      default:
        return orderStatus.franchise.default.color;
    }
  }
  if (order.rentOrder.status === "pending") return orderStatus.otherPending.color;
  return orderStatus.booked.color;
};

const createOrderObject = (order, el, shiftLength, interval, user) => {
  const statusColor = getOrderColor(order, user);
  const itemProps = { style: { background: statusColor } };
  const hour = moment(el.start_time).hours();
  return {
    id: uuidv4(),
    orderId: order.id,
    rentOrderId: order.rentOrder.id,
    group: order.equipment.id,
    groupName: order.equipment.name,
    intervalId: interval.id,
    start_time: el.start_time,
    end_time: el.end_time,
    categoryId: order.equipment.category.id || null,
    categoryName: order.equipment.category.name || null,
    categoryColor: order.equipment.category.color || "#622525",
    company: order.rentOrder.company || null,
    status: order.rentOrder.status || "pending",
    itemProps,
    date: interval.date,
    grid: addStartGrid(hour, shiftLength),
  };
};

export const createOrderGroup = (orders, user) => {
  const result = [];
  orders.forEach((order) => {
    if (!order.rentOrder || !order.equipment || !order.equipment.category) { return; }
    const { shiftLength } = order.equipment.category;

    order.intervals.forEach((interval) => {
      const formInterval = convertGrid(shiftLength, interval.grid, interval.date);

      formInterval.forEach((el) => {
        result.push(createOrderObject(order, el, shiftLength, interval, user));
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

  Object.keys(equipmentIdArray).forEach((key) => {
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
    Object.keys(el.intervals).forEach((keyObj) => {
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

  Object.keys(dateObj).forEach((key) => {
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
