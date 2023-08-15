import { formatOrder } from "../DataConvertHelper.js";


const backendUrl = "http://freekitchen.loc/admin/manager/";

const test = {
  success: true,
  data: [
    {
      id: 1,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: 'Суши "Минск-сити"',
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 1,
          date: "2023-06-26",
          grid: "000000110000111100000000",
        },
        {
          id: 2,
          date: "2023-06-27",
          grid: "000000110000111100000000",
        },
      ],
    },
    {
      id: 2,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: 'Суши "Минск-сити"',
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 3,
          date: "2023-06-27",
          grid: "000000111100111100000000",
        },
      ],
    },
    {
      id: 3,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: 'Суши "Минск-сити"',
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 4,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: 'Суши "Минск-сити"',
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        category: null,
      },
      intervals: [],
    },
    {
      id: 5,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 6,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 8,
        type: "kitchen",
        name: "Суши 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 7,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 8,
      rentOrder: {
        id: 2,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
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
          name: "Умами",
        },
      },
      equipment: null,
      intervals: [],
    },
    {
      id: 10,
      rentOrder: {
        id: 3,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 7,
        type: "kitchen",
        name: "Пиццерия 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 11,
      rentOrder: {
        id: 3,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 9,
        type: "kitchen",
        name: "Мясо-рыбный цех",
        category: null,
      },
      intervals: [],
    },
    {
      id: 12,
      rentOrder: {
        id: 3,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 13,
      rentOrder: {
        id: 4,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 14,
      rentOrder: {
        id: 4,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 15,
      rentOrder: {
        id: 4,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 16,
      rentOrder: {
        id: 4,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 17,
      rentOrder: {
        id: 5,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 18,
      rentOrder: {
        id: 5,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 19,
      rentOrder: {
        id: 5,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        category: null,
      },
      intervals: [],
    },
    {
      id: 20,
      rentOrder: {
        id: 5,
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        category: null,
      },
      intervals: [],
    },
  ],
};

const testOrderequip = {
  success: true,
  data: [
    {
      id: 5,
      name: "Микроволновка",
      shiftLength: 1,
      kitchenEquipment: [
        {
          id: 1,
          type: "equipment",
          name: "микроволновка 1",
        },
      ],
    },
    {
      id: 6,
      name: "Кухня",
      shiftLength: 8,
      kitchenEquipment: [
        {
          id: 4,
          type: "kitchen",
          name: "k1",
        },
        {
          id: 5,
          type: "kitchen",
          name: "k2",
        },
      ],
    },
    {
      id: 1,
      name: "Холодильник",
      shiftLength: 4,
      kitchenEquipment: [],
    },
    {
      id: 2,
      name: "Комбайн",
      shiftLength: 2,
      kitchenEquipment: [],
    },
    {
      id: 3,
      name: "Чайник",
      shiftLength: 2,
      kitchenEquipment: [],
    },
    {
      id: 4,
      name: "Плита",
      shiftLength: 4,
      kitchenEquipment: [],
    },
  ],
};

export async function getAllEqupments1() {
  return new Promise((resolve) => {
    resolve(testOrderequip);
  });
}

export async function getAllOrders1() {
  return new Promise((resolve) => {
    resolve(test);
  });
}

export async function getAllEqupments() {
  const str = `http://freekitchen.loc/test/get_equipment`;
  let res = await fetch(str, {});
  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return await res.json();
}

export async function getAllOrders() {
  const str = `http://freekitchen.loc/test/get_equipment_items`;
  let res = await fetch(str, {});

  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return await res.json();
}

export async function sendEditOrder(order) {
  const str = `/admin/manager/edit_order`;



  let res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(order),
  });


  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }

  // return await res.json();
  return true
}



export async function createOrder(order) {
  const str = `http://freekitchen.loc/test/save_order`;
  const dateIntervals = formatOrder(order)
 console.log(122222222);
  const body = {
    company: {
      id: 1,
      name: 'Суши "Минск-сити"',
    },
    status: "pending",
    equipmentItems: dateIntervals,
  };

  let res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*"
    },
    mode: 'no-cors',
    body: JSON.stringify(body),
  });
  // let result = await res.json()
  // console.log(result);
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }

  // return await res.json();
  return true
}
