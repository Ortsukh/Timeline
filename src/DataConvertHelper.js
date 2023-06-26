// import moment from "moment";
import { orderStatus } from "./constants/constants";

export function convertTrucksToTimelineGroups(tools) {
  return tools.map((tool, index) => ({
    id: index + 1,
    title: tool.name,
    category: tool.category
  }));
}

export function convertOrdersToTimelineItems(orders, tools, companies) {
  const hash = tools.reduce((acc, tool, index) => {
    tool.assignedOrderId.forEach(id => {
      acc[id] = index + 1;
    });
    return acc;
  }, {});

  return orders.map(order => {
    const orderId = createOrderIdNumberFromIdString(order.id);
    const group = hash[order.id];
    const companie = companies.find(companie => companie.id === order.companieId);
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
      itemProps
    };
  });
}

function createOrderIdNumberFromIdString(orderId) {
  return parseInt(orderId.match(/\d+/)[0], 10);
}