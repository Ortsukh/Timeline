import JsonDataProvider from "./JsonDataProvider.js";

const backendUrl = 'http://freekitchen.loc/admin/manager/'

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

export async function getAllEqupments() {
  const str = `${backendUrl}equipments`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function getAllOrders() {
  const str = `${backendUrl}orders`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function createOrder(order) {
  const body = {
    companie: order.companie,
    order_items:[{
      category_id: order.companie.toolId,
      intervals: order.companie.intervals,
      session_length: 2,
    }]
  };

  const str = `${backendUrl}orders`;
  let res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}