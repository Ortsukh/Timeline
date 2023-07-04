import moment from "moment";
import { orderStatus } from "./constants/constants";
import { v4 as uuidv4 } from "uuid";
import { id } from "date-fns/locale";

export const createEquipmentGroup = (equipments) => {
  const result = [];
  equipments.map((elem) => {
    if (elem.kitchenEquipment.length > 0) {
      elem.kitchenEquipment.forEach((item) => {
        result.push({
          id: item.id,
          title: item.name,
          type: item.type,
          category: elem.name,
          shiftLength: elem.shiftLength,
        });
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
        start_time: moment(date + " " + i + ":00").valueOf(),
        end_time: moment(date + " " + (i + length) + ":00").valueOf(),
      });
    }
  }
  return times;
};

export const createOrderGroup = (orders) => {
  const result = [];

  orders.forEach((order) => {
    if (!order.rentOrder || !order.equipment || !order.equipment.category)
      return;
    console.log(order);
    const shiftLength = order.equipment.category.shiftLength;

    order.intervals.map((interval) => {
      const statusColor =
        orderStatus[order.rentOrder.status]?.color || "rgb(39, 128, 252)";
      const itemProps = { style: { background: statusColor } };

      const formInterval = convertGrid(
        shiftLength,
        interval.grid,
        interval.date
      );

      formInterval.forEach((el) => {
        const hour = moment(el.start_time).hours();

        const formatHour = Math.floor(hour / shiftLength);
        result.push({
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
        });
      });
    });
  });

  return result;
};

export const addGrid = (formatHour, shiftLength) => {
  const grid = new Array(24).fill(0);

  for (let i = 0; i < shiftLength; i++) {
    grid[formatHour * shiftLength + i] = 1;
  }

  return grid.join("");
};

export const formatOrder = (order, orderId) => {
  const equipmentIdArray = {};
  const dateIntervals = [];
  console.log(order);
  order.forEach((item) => {
    if (!equipmentIdArray[item.equipmentId]) {
      equipmentIdArray[item.equipmentId] = [];
    }
    equipmentIdArray[item.equipmentId].push({
      date: item.date,
      grid: item.grid,
      id: item.intervalId,
      orderItemId:item.orderItemId
    });
  });
  console.log(equipmentIdArray);
  for (let key in equipmentIdArray) {
    dateIntervals.push({
      equipment: { id: key },
      id: equipmentIdArray[key][0].orderItemId,
      intervals: equipmentIdArray[key],
    });
  }
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
      let intervalId;
      el.intervals[keyObj].map((el) => {
        partA += Number(el.grid.slice(0, 12));
        partB += Number(el.grid.slice(12, 24));
        intervalId = intervalId ? intervalId : el.intervalId;
      });

      result.push({
        intervalId: intervalId,
        equipmentId: el.equipmentId,
        orderItemId:  el.intervals[keyObj][0].orderId,
        date: keyObj,
        grid: String(partA).slice(1, 13) + String(partB).slice(1, 13),
      });
    }
  });
  return result;
};

// import { orderStatus } from "./constants/constants";

// export function convertTrucksToTimelineGroups(tools) {
//   return tools.map((tool, index) => ({
//     id: index + 1,
//     title: tool.name,
//     category: tool.category,
//   }));
// }

// export function convertOrdersToTimelineItems(orders, tools, companies) {
//   const hash = tools.reduce((acc, tool, index) => {
//     tool.assignedOrderId.forEach((id) => {
//       acc[id] = index + 1;
//     });
//     return acc;
//   }, {});

//   return orders.map((order) => {
//     const orderId = createOrderIdNumberFromIdString(order.id);
//     const group = hash[order.id];
//     const companie = companies.find(
//       (companie) => companie.id === order.companieId
//     );
//     const statusColor = orderStatus[order.status]?.color || "blue";
//     const itemProps = { style: { background: statusColor } };

//     return {
//       id: orderId,
//       group,
//       title: order.id,
//       start_time: order.from,
//       end_time: order.to,
//       companie,
//       status: order.status || null,
//       itemProps,
//     };
//   });
// }

// function createOrderIdNumberFromIdString(orderId) {
//   return parseInt(orderId.match(/\d+/)[0], 10);
// }

// export const createEquipmentGroup = (equipments) => {
//   console.log(equipments);
//   const result = [];
//   equipments.map((elem) => {
//     if (elem.kitchenEquipment.length > 0) {
//       elem.kitchenEquipment.forEach((item) => {
//         result.push({
//           id: item.id,
//           title: item.name,
//           type: item.type,
//           category: elem.name,
//           shiftLength: elem.shiftLength
//         });
//       });
//     }
//   });
//   console.log(result);
//   return result;
// };

// const convertGrid = (length, grid, date) => {
//   const arr = grid.split("");
//   const times = [];
//   for (let i = 0; i < 24; i += length) {
//     if (arr[i] === "1") {
//       console.log(date + " " + i + ":00");
//       times.push({
//         start_time: moment(date + " " + i + ":00").valueOf(),
//         end_time: moment(date + " " + (i + length) + ":00").valueOf(),
//       });
//     }
//   }
//   return times;
// };

// export const createOrderGroup = (orders) => {
//   console.log(orders);
//   const result = [];

//   orders.forEach((order) => {

//     if (!order.rentOrder || !order.equipment || !order.equipment.category) return;
//     const length = order.equipment.category.shiftLength;

//     order.intervals.map((interval) => {
//       const statusColor = orderStatus[order.rentOrder.status]?.color || "rgb(39, 128, 252)";
//       const itemProps = { style: { background: statusColor } };
//       console.log(interval);
//       const formInterval = convertGrid(length, interval.grid, interval.date);
//       console.log(formInterval);
//       formInterval.forEach((el, index) => {
//         result.push({
//           id: order.id + moment() + interval.date + index,
//           rentOrderId: order.rentOrder.id,
//           group: order.equipment.id,
//           start_time: el.start_time,
//           end_time: el.end_time,
//           companie: order.rentOrder.company || null,
//           status: order.rentOrder.status || "accepted",
//           itemProps,
//         });
//       });
//     });
//   });

//   return result;
// };
