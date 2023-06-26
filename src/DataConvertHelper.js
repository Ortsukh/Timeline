
import moment from "moment";
import { orderStatus } from "./constants/constants";

export default class DataConvertHelper {
  static convertTrucksToTimelineGroups(tools) {
    return tools.map((tool, index) => ({
      id: index + 1,
      title: tool.name,
      category: tool.category
    }));
  }

  static convertOrdersToTimelineItems(
    orders,
    tools,
    companies
  ) {
    const hash = this._mapTruckIdsToOrderIds(tools);

    return orders.map(order => ({
      id: this._createOrderIdNumberFromIdString(order.id),
      group: hash[order.id],
      title: order.id,
      start_time: order.from,
      end_time: order.to,
      companie: companies.find(companie => companie.id === order.companieId),
      status: order.status || null,
      itemProps: {
             style: {
          background: orderStatus[order.status]?.color || "blue",
        }
      }
    }));
  }

   static _mapTruckIdsToOrderIds(tools) {
    const hash = {};
    tools.forEach((tool, index) => {
      tool.assignedOrderId.forEach(id => {
        hash[id] = index + 1;
      });
    });
    return hash;
  }



   static _createOrderIdNumberFromIdString = (orderId) => {
    return parseInt(orderId.match(/\d+/)[0], 10);
  };
}
