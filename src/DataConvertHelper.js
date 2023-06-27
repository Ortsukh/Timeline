import moment from "moment";
import { orderStatus } from "./constants/constants";

export function convertTrucksToTimelineGroups(tools) {
  return tools.map((tool, index) => ({
    id: index + 1,
    title: tool.name,
    category: tool.category,
  }));
}

export function convertOrdersToTimelineItems(orders, tools, companies) {
  const hash = tools.reduce((acc, tool, index) => {
    tool.assignedOrderId.forEach((id) => {
      acc[id] = index + 1;
    });
    return acc;
  }, {});

  return orders.map((order) => {
    const orderId = createOrderIdNumberFromIdString(order.id);
    const group = hash[order.id];
    const companie = companies.find(
      (companie) => companie.id === order.companieId
    );
    const statusColor = orderStatus[order.status]?.color || "blue";
    const itemProps = { style: { background: statusColor } };

    return {
      id: orderId,
      group,
      title: order.id,
      start_time: order.from,
      end_time: order.to,
      companie,
      status: order.status || null,
      itemProps,
    };
  });
}

function createOrderIdNumberFromIdString(orderId) {
  return parseInt(orderId.match(/\d+/)[0], 10);
}

export const createEquipmentGroup = (equipments) => {
  console.log(equipments);
  const result = [];
  equipments.map((elem) => {
    if (elem.equipment) {
      result.push({
        id: elem.equipment.id,
        title: elem.equipment.name,
        type: elem.equipment.type,
        category: elem.equipment.type,
      });
    }
  });
  return result;
};

const convertGrid = (length, grid, date) => {
  const arr = grid.split('');
  const times = [];
  for (let i = 0; i < 24; i += length) {
    if (arr[i] === '1') {
      times.push({
        start_time: moment(date +' '+ i + ":00").valueOf(),
        end_time: moment(date + ' ' +(i + length) + ":00").valueOf(),
      });
    }
  }
  return times;
};

export const createOrderGroup = (orders) => {

  const result = [];

  const length = 2;

  orders.forEach(order => {
    console.log(order);
    if(!order.rentOrder || !order.equipment) return 
  order.intervals.map((interval) => {
    const statusColor = orderStatus[orders.status]?.color || "blue";
    const itemProps = { style: { background: statusColor } };
    const formInterval = convertGrid(length, interval.grid, interval.date.date);
    formInterval.forEach((el, index) => {
      result.push({
        id: order.id + el.start_time + interval.date.date + index,
        custom_id: 12,
        group: order.equipment.id,
        start_time: el.start_time,
        end_time: el.end_time,
        companie: order.rentOrder.company || null,
        status: order.rentOrder.status || null,
        itemProps,
      });
    });
  });
})

  return result;
};
const a = {
  id: 1,
  equipment: {
    id: 10,
    status: "free",
    type: "kitchen",
    description: "TextHolder",
    price: "1000.0000",
    category: {
      id: 1,
      name: "category1",
      shiftLength: 2,
    },
  },
  intervals: [
    {
      id: 1,
      date: {
        date: "2023-06-20 00:00:00.000000",
        timezone_type: 3,
        timezone: "Europe/Moscow",
      },
      grid: "000000000000000011000000",
    },
    {
      id: 4,
      date: {
        date: "2023-06-20 00:00:00.000000",
        timezone_type: 3,
        timezone: "Europe/Moscow",
      },
      grid: "000000000000000011000000",
    },
    {
      id: 5,
      date: {
        date: "2023-06-20 00:00:00.000000",
        timezone_type: 3,
        timezone: "Europe/Moscow",
      },
      grid: "000000000000000000001100",
    },
  ],
};
