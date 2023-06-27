import JsonDataProvider from "./JsonDataProvider.js";

const backendUrl = "http://freekitchen.loc/admin/manager/";

export default class MockAPI {
  getData = () => {
    return new Promise((resolve) => {
      resolve(JsonDataProvider.callMockApiCall());
    });
  };

  addData = (order, toolId) => {
    JsonDataProvider.add(order, toolId);
  };
}
const test = {
  success: true,
  data: [
    {
      id: 1,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
        },
      },
      equipment: {
        id: 10,
        type: "kitchen",
        name: "Пиццерия",
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
    },
    {
      id: 2,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "Шаурмичная",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 2,
          date: {
            date: "2023-06-24 00:00:00.000000",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000000001100",
        },
      ],
    },
    {
      id: 3,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 3,
          date: {
            date: "2023-06-23 00:00:00.000000",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000000110000",
        },
      ],
    },
    {
      id: 4,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "Фритюрница",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 5,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "Холодная коптильня",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 7,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 8,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "Холодная коптильня",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 9,
      rentOrder: {
        id: 3,
        company: {
          id: 2,
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "Холодная коптильня",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
  ],
};

const testOrder = {
  success: true,
  data: [
    {
      id: 1,
      rentOrder: {
        id: 1,
        status: "accepted",
        company: {
          id: 1,
          name: 'Суши "Минск-сити"',
        },
      },
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
            date: "2023-06-27",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000011000000",
        },
        {
          id: 4,
          date: {
            date: "2023-06-25",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000001100000000",
        },
        {
          id: 5,
          date: {
            date: "2023-06-26",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000000001100",
        },
      ],
    },
    {
      id: 2,
      equipment: {
        id: 4,
        status: "free",
        type: "kitchen",
        description: "TextHolder",
        price: "800.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 2,
          date: {
            date: "2023-06-24 00:00:00.000000",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000000001100",
        },
      ],
    },
    {
      id: 3,
      equipment: {
        id: 2,
        status: "free",
        type: "equipment",
        description: "TextHolder",
        price: "150.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 3,
          date: {
            date: "2023-06-23 00:00:00.000000",
            timezone_type: 3,
            timezone: "Europe/Moscow",
          },
          grid: "000000000000000000110000",
        },
      ],
    },
    {
      id: 4,
      equipment: {
        id: 3,
        status: "free",
        type: "equipment",
        description: "TextHolder",
        price: "650.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 25,
      equipment: {
        id: 1,
        status: "free",
        type: "equipment",
        description: "TextHolder",
        price: "300.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 35,
      equipment: {
        id: 11,
        status: "free",
        type: "equipment",
        description: "equipment",
        price: "37.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 57,
      equipment: {
        id: 2,
        status: "free",
        type: "equipment",
        description: "TextHolder",
        price: "150.0000",
        category: {
          id: 1,
          name: "category1",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 43,
      equipment: {
        id: 17,
        status: "free",
        type: "equipment",
        description: "equipment",
        price: "75.0000",
        category: {
          id: 2,
          name: "category2",
          shiftLength: 4,
        },
      },
      intervals: [],
    },
  ],
};

export async function getAllEqupments1() {
  return new Promise((resolve) => {
    resolve(test);
  });
}

export async function getAllOrders1() {
  return new Promise((resolve) => {
    resolve(testOrder);
  });
}
export async function getAllEqupments() {
  const str = `http://freekitchen.loc/admin/manager/get_equipment_items`;
  let res = await fetch(str, {
    headers: {
      method: "get",
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function getAllOrders() {
  const str = `http://freekitchen.loc/admin/manager/get_order/1`;
  let res = await fetch(str, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    },
  });

  if (!res.ok) {
    throw new Error("Something went wrong.Sorry");
  }

  return await res.json();
}

export async function createOrder(order) {

  const str = `${backendUrl}orders`;
  let res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(order),
  });

  return await res.json();
}
