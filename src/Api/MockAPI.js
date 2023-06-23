import JsonDataProvider from "./JsonDataProvider.js";

export default class MockAPI {
  getData = () => {
    return new Promise(resolve => {
      resolve(JsonDataProvider.callMockApiCall());
    });
  };

  addData = (order, toolId) => {
      (JsonDataProvider.add(order, toolId));
  };
}
