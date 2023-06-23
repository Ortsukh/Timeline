
import moment from "moment";

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
    tools
  ) {
    const hash = this._mapTruckIdsToOrderIds(tools);

    return orders.map(order => ({
      id: this._createOrderIdNumberFromIdString(order.id),
      group: hash[order.id],
      title: order.id,
      start_time: order.from,
      end_time: order.to
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
