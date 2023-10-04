import { formatOrder } from "../common/DataConvertHelper";
// dev
// const backendUrl = "http://freekitchen.loc/admin/manager/";
// local
const backendUrl = "http://freekitchen.loc/test/";
// prod
// const backendUrl = "/admin/manager/";
const test = {
  success: true,
  data: [
    {
      id: 1,
      rentOrder: {
        id: 1,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 2,
      rentOrder: {
        id: 1,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 3,
      rentOrder: {
        id: 1,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [],
    },
    {
      id: 4,
      rentOrder: {
        id: 1,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 21,
      rentOrder: {
        id: 6,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 22,
      rentOrder: {
        id: 7,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 23,
      rentOrder: {
        id: 7,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 24,
      rentOrder: {
        id: 8,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 25,
      rentOrder: {
        id: 9,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 26,
      rentOrder: {
        id: 10,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 27,
      rentOrder: {
        id: 11,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 28,
      rentOrder: {
        id: 12,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 29,
      rentOrder: {
        id: 13,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 30,
      rentOrder: {
        id: 14,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 31,
      rentOrder: {
        id: 15,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 32,
      rentOrder: {
        id: 16,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 33,
      rentOrder: {
        id: 17,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 34,
      rentOrder: {
        id: 18,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 35,
      rentOrder: {
        id: 18,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 36,
      rentOrder: {
        id: 19,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 37,
      rentOrder: {
        id: 20,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 38,
      rentOrder: {
        id: 20,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 39,
      rentOrder: {
        id: 20,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 40,
      rentOrder: {
        id: 21,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 41,
      rentOrder: {
        id: 22,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 42,
      rentOrder: {
        id: 22,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 43,
      rentOrder: {
        id: 23,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 44,
      rentOrder: {
        id: 24,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 45,
      rentOrder: {
        id: 25,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 46,
      rentOrder: {
        id: 25,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 47,
      rentOrder: {
        id: 25,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 48,
      rentOrder: {
        id: 26,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 49,
      rentOrder: {
        id: 27,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 50,
      rentOrder: {
        id: 27,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 51,
      rentOrder: {
        id: 27,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 52,
      rentOrder: {
        id: 28,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 53,
      rentOrder: {
        id: 28,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 54,
      rentOrder: {
        id: 29,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 55,
      rentOrder: {
        id: 29,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 56,
      rentOrder: {
        id: 30,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 57,
      rentOrder: {
        id: 31,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 58,
      rentOrder: {
        id: 31,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 59,
      rentOrder: {
        id: 32,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 60,
      rentOrder: {
        id: 32,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 61,
      rentOrder: {
        id: 32,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 62,
      rentOrder: {
        id: 33,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 63,
      rentOrder: {
        id: 33,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 64,
      rentOrder: {
        id: 34,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 65,
      rentOrder: {
        id: 34,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 66,
      rentOrder: {
        id: 34,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 67,
      rentOrder: {
        id: 35,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 68,
      rentOrder: {
        id: 35,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 69,
      rentOrder: {
        id: 35,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 70,
      rentOrder: {
        id: 36,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 71,
      rentOrder: {
        id: 37,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 72,
      rentOrder: {
        id: 38,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 73,
      rentOrder: {
        id: 38,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 74,
      rentOrder: {
        id: 39,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 75,
      rentOrder: {
        id: 40,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 76,
      rentOrder: {
        id: 41,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 77,
      rentOrder: {
        id: 42,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 78,
      rentOrder: {
        id: 42,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 79,
      rentOrder: {
        id: 43,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 80,
      rentOrder: {
        id: 43,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 81,
      rentOrder: {
        id: 44,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 82,
      rentOrder: {
        id: 45,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 83,
      rentOrder: {
        id: 46,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 84,
      rentOrder: {
        id: 46,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 85,
      rentOrder: {
        id: 46,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 86,
      rentOrder: {
        id: 47,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 87,
      rentOrder: {
        id: 47,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 88,
      rentOrder: {
        id: 47,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 89,
      rentOrder: {
        id: 48,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 90,
      rentOrder: {
        id: 49,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 91,
      rentOrder: {
        id: 50,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 92,
      rentOrder: {
        id: 51,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 93,
      rentOrder: {
        id: 52,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 94,
      rentOrder: {
        id: 53,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 95,
      rentOrder: {
        id: 54,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 96,
      rentOrder: {
        id: 54,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 97,
      rentOrder: {
        id: 55,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 98,
      rentOrder: {
        id: 56,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 99,
      rentOrder: {
        id: 57,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 100,
      rentOrder: {
        id: 57,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 101,
      rentOrder: {
        id: 58,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 102,
      rentOrder: {
        id: 58,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 103,
      rentOrder: {
        id: 58,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 104,
      rentOrder: {
        id: 59,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 105,
      rentOrder: {
        id: 60,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 106,
      rentOrder: {
        id: 60,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 107,
      rentOrder: {
        id: 60,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 108,
      rentOrder: {
        id: 61,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 109,
      rentOrder: {
        id: 61,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 110,
      rentOrder: {
        id: 61,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 111,
      rentOrder: {
        id: 62,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 112,
      rentOrder: {
        id: 62,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 113,
      rentOrder: {
        id: 62,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 114,
      rentOrder: {
        id: 63,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 115,
      rentOrder: {
        id: 63,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 116,
      rentOrder: {
        id: 63,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 117,
      rentOrder: {
        id: 64,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 118,
      rentOrder: {
        id: 64,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 119,
      rentOrder: {
        id: 64,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 120,
      rentOrder: {
        id: 65,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 121,
      rentOrder: {
        id: 65,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 122,
      rentOrder: {
        id: 66,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 123,
      rentOrder: {
        id: 66,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 124,
      rentOrder: {
        id: 66,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 125,
      rentOrder: {
        id: 67,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 126,
      rentOrder: {
        id: 67,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 127,
      rentOrder: {
        id: 67,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 128,
      rentOrder: {
        id: 68,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 129,
      rentOrder: {
        id: 68,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 130,
      rentOrder: {
        id: 68,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 131,
      rentOrder: {
        id: 69,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 132,
      rentOrder: {
        id: 69,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 133,
      rentOrder: {
        id: 69,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 134,
      rentOrder: {
        id: 70,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 135,
      rentOrder: {
        id: 70,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 136,
      rentOrder: {
        id: 70,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 137,
      rentOrder: {
        id: 71,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 138,
      rentOrder: {
        id: 71,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 139,
      rentOrder: {
        id: 71,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 140,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 167,
          date: "2023-07-05",
          grid: "001111111111100111001001",
        },
        {
          id: 202,
          date: "2023-07-06",
          grid: "000100001100000000000000",
        },
      ],
    },
    {
      id: 141,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 142,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 143,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 144,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 145,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 146,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 147,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 148,
      rentOrder: {
        id: 73,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: null,
      intervals: [
        {
          id: 190,
          date: "2023-07-05",
          grid: "111111111111111100000000",
        },
      ],
    },
    {
      id: 149,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 150,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 196,
          date: "2023-07-05",
          grid: "111111110000000011111111",
        },
        {
          id: 200,
          date: "2023-07-06",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 151,
      rentOrder: {
        id: 72,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 198,
          date: "2023-07-05",
          grid: "000000001111111111111111",
        },
        {
          id: 199,
          date: "2023-07-06",
          grid: "111111110000000000000000",
        },
        {
          id: 201,
          date: "2023-07-04",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 152,
      rentOrder: {
        id: 74,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: null,
      intervals: [
        {
          id: 203,
          date: "2023-07-06",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 153,
      rentOrder: {
        id: 75,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: null,
      intervals: [
        {
          id: 204,
          date: "2023-07-06",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 154,
      rentOrder: {
        id: 76,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 205,
          date: "2023-07-06",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 155,
      rentOrder: {
        id: 77,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 206,
          date: "2023-08-09",
          grid: "000011110000000000000000",
        },
      ],
    },
    {
      id: 156,
      rentOrder: {
        id: 77,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 207,
          date: "2023-08-09",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 157,
      rentOrder: {
        id: 77,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 208,
          date: "2023-08-09",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 158,
      rentOrder: {
        id: 78,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 159,
      rentOrder: {
        id: 79,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 211,
          date: "2023-08-15",
          grid: "110000000000010000000011",
        },
        {
          id: 212,
          date: "2023-08-13",
          grid: "000000000000000000000011",
        },
        {
          id: 246,
          date: "2023-08-09",
          grid: "000000000000000010000000",
        },
        {
          id: 247,
          date: "2023-08-18",
          grid: "000000000000010000000000",
        },
        {
          id: 248,
          date: "2023-08-11",
          grid: "000100000000000000000000",
        },
      ],
    },
    {
      id: 160,
      rentOrder: {
        id: 80,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 214,
          date: "2023-08-15",
          grid: "111111111111111100000000",
        },
      ],
    },
    {
      id: 161,
      rentOrder: {
        id: 80,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 216,
          date: "2023-08-15",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 162,
      rentOrder: {
        id: 81,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 163,
      rentOrder: {
        id: 82,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 164,
      rentOrder: {
        id: 83,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 165,
      rentOrder: {
        id: 84,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 166,
      rentOrder: {
        id: 85,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 221,
          date: "2023-08-13",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 167,
      rentOrder: {
        id: 86,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 168,
      rentOrder: {
        id: 87,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 169,
      rentOrder: {
        id: 88,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 170,
      rentOrder: {
        id: 89,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 171,
      rentOrder: {
        id: 90,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 172,
      rentOrder: {
        id: 91,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 173,
      rentOrder: {
        id: 92,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 228,
          date: "2023-08-16",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 174,
      rentOrder: {
        id: 93,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 175,
      rentOrder: {
        id: 94,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 230,
          date: "2023-08-15",
          grid: "000000000000000011111111",
        },
        {
          id: 244,
          date: "2023-08-11",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 176,
      rentOrder: {
        id: 95,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 177,
      rentOrder: {
        id: 96,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 178,
      rentOrder: {
        id: 97,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 234,
          date: "2023-08-07",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 179,
      rentOrder: {
        id: 98,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 235,
          date: "2023-08-05",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 180,
      rentOrder: {
        id: 99,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 236,
          date: "2023-08-02",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 181,
      rentOrder: {
        id: 100,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 237,
          date: "2023-08-03",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 182,
      rentOrder: {
        id: 101,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 238,
          date: "2023-08-06",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 183,
      rentOrder: {
        id: 102,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 239,
          date: "2023-08-08",
          grid: "000000001111111100000000",
        },
        {
          id: 240,
          date: "2023-08-12",
          grid: "000000001111111100000000",
        },
        {
          id: 241,
          date: "2023-08-30",
          grid: "000000001111111100000000",
        },
        {
          id: 242,
          date: "2023-08-21",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 184,
      rentOrder: {
        id: 94,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 185,
      rentOrder: {
        id: 97,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 245,
          date: "2023-08-13",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 186,
      rentOrder: {
        id: 103,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 249,
          date: "2023-08-12",
          grid: "000100000000000000000000",
        },
      ],
    },
    {
      id: 187,
      rentOrder: {
        id: 104,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 250,
          date: "2023-08-07",
          grid: "001000000000000000000000",
        },
      ],
    },
    {
      id: 188,
      rentOrder: {
        id: 105,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 251,
          date: "2023-08-05",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 189,
      rentOrder: {
        id: 106,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 252,
          date: "2023-08-05",
          grid: "000000010000000000000000",
        },
        {
          id: 253,
          date: "2023-08-06",
          grid: "000000100000000000000000",
        },
      ],
    },
    {
      id: 190,
      rentOrder: {
        id: 107,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 254,
          date: "2023-08-06",
          grid: "000011000000000000000000",
        },
      ],
    },
    {
      id: 191,
      rentOrder: {
        id: 108,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 255,
          date: "2023-08-16",
          grid: "000011000000000000000000",
        },
      ],
    },
    {
      id: 192,
      rentOrder: {
        id: 109,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 256,
          date: "2023-08-11",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 193,
      rentOrder: {
        id: 110,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 257,
          date: "2023-08-16",
          grid: "000200000100000000000000",
        },
        {
          id: 258,
          date: "2023-08-14",
          grid: "000000010000000000000000",
        },
        {
          id: 259,
          date: "2023-08-17",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 194,
      rentOrder: {
        id: 111,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 260,
          date: "2023-08-16",
          grid: "000000001010000000000000",
        },
      ],
    },
    {
      id: 195,
      rentOrder: {
        id: 112,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 261,
          date: "2023-08-16",
          grid: "110000000000000000000000",
        },
      ],
    },
    {
      id: 196,
      rentOrder: {
        id: 113,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 262,
          date: "2023-08-11",
          grid: "000000001100000000000000",
        },
      ],
    },
    {
      id: 197,
      rentOrder: {
        id: 114,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 263,
          date: "2023-08-19",
          grid: "111111111111111100000000",
        },
      ],
    },
    {
      id: 198,
      rentOrder: {
        id: 115,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 266,
          date: "2023-08-27",
          grid: "000000001111111100000000",
        },
        {
          id: 267,
          date: "2023-08-23",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 199,
      rentOrder: {
        id: 116,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 268,
          date: "2023-08-23",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 200,
      rentOrder: {
        id: 117,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 269,
          date: "2023-08-17",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 201,
      rentOrder: {
        id: 118,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 270,
          date: "2023-08-06",
          grid: "000000110000000000000000",
        },
        {
          id: 271,
          date: "2023-08-08",
          grid: "000000000011000000000000",
        },
      ],
    },
    {
      id: 202,
      rentOrder: {
        id: 119,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [
        {
          id: 272,
          date: "2023-08-24",
          grid: "111100000000000000000000",
        },
      ],
    },
    {
      id: 203,
      rentOrder: {
        id: 120,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [
        {
          id: 273,
          date: "2023-08-24",
          grid: "000011110000000000000000",
        },
      ],
    },
    {
      id: 205,
      rentOrder: {
        id: 122,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 275,
          date: "2023-08-24",
          grid: "000000000011000000000000",
        },
      ],
    },
    {
      id: 206,
      rentOrder: {
        id: 123,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 276,
          date: "2023-08-24",
          grid: "000000000000000011000000",
        },
      ],
    },
    {
      id: 207,
      rentOrder: {
        id: 124,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 277,
          date: "2023-08-14",
          grid: "000000000000001100001100",
        },
      ],
    },
    {
      id: 208,
      rentOrder: {
        id: 125,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 278,
          date: "2023-08-14",
          grid: "000000000000001100001100",
        },
      ],
    },
    {
      id: 209,
      rentOrder: {
        id: 126,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 279,
          date: "2023-08-26",
          grid: "000000110000000000000000",
        },
      ],
    },
    {
      id: 210,
      rentOrder: {
        id: 127,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 280,
          date: "2023-08-17",
          grid: "001100000000000000000000",
        },
      ],
    },
    {
      id: 211,
      rentOrder: {
        id: 128,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 281,
          date: "2023-08-24",
          grid: "000000000000001100000000",
        },
      ],
    },
    {
      id: 212,
      rentOrder: {
        id: 129,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 282,
          date: "2023-08-24",
          grid: "000000000010000000000000",
        },
      ],
    },
    {
      id: 213,
      rentOrder: {
        id: 129,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 283,
          date: "2023-08-23",
          grid: "000000001100000000000000",
        },
      ],
    },
    {
      id: 215,
      rentOrder: {
        id: 131,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 285,
          date: "2023-08-25",
          grid: "000000000000001100000000",
        },
      ],
    },
    {
      id: 216,
      rentOrder: {
        id: 132,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 286,
          date: "2023-08-30",
          grid: "000000001001101000000000",
        },
      ],
    },
    {
      id: 217,
      rentOrder: {
        id: 132,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [],
    },
    {
      id: 218,
      rentOrder: {
        id: 133,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 288,
          date: "2023-08-31",
          grid: "000000000000001111000000",
        },
      ],
    },
    {
      id: 219,
      rentOrder: {
        id: 134,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 289,
          date: "2023-08-31",
          grid: "000000000000000000001111",
        },
      ],
    },
    {
      id: 220,
      rentOrder: {
        id: 135,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 290,
          date: "2023-09-06",
          grid: "111100000000000000000000",
        },
      ],
    },
    {
      id: 221,
      rentOrder: {
        id: 136,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 291,
          date: "2023-08-29",
          grid: "000000001111000000000000",
        },
      ],
    },
    {
      id: 224,
      rentOrder: {
        id: 139,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 296,
          date: "2023-09-11",
          grid: "000000110000000000000000",
        },
        {
          id: 297,
          date: "2023-09-05",
          grid: "000000001100001100000000",
        },
      ],
    },
    {
      id: 225,
      rentOrder: {
        id: 140,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 298,
          date: "2023-09-08",
          grid: "000011001100000000000000",
        },
      ],
    },
    {
      id: 226,
      rentOrder: {
        id: 141,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 299,
          date: "2023-09-14",
          grid: "000000001100110000000000",
        },
        {
          id: 300,
          date: "2023-09-15",
          grid: "000000000000000011000000",
        },
        {
          id: 301,
          date: "2023-09-17",
          grid: "000011001100110000000000",
        },
        {
          id: 302,
          date: "2023-09-19",
          grid: "000000001100000000000000",
        },
        {
          id: 303,
          date: "2023-09-20",
          grid: "001100000011000000000000",
        },
        {
          id: 304,
          date: "2023-09-21",
          grid: "000000001100000011000000",
        },
        {
          id: 305,
          date: "2023-09-23",
          grid: "000000001100110000000000",
        },
        {
          id: 306,
          date: "2023-09-24",
          grid: "000011000000000000000000",
        },
        {
          id: 307,
          date: "2023-09-18",
          grid: "000000110000000011000000",
        },
      ],
    },
    {
      id: 229,
      rentOrder: {
        id: 144,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 310,
          date: "2023-09-13",
          grid: "000000000100000000100000",
        },
      ],
    },
    {
      id: 230,
      rentOrder: {
        id: 145,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 311,
          date: "2023-09-13",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 231,
      rentOrder: {
        id: 146,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 312,
          date: "2023-09-14",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 232,
      rentOrder: {
        id: 147,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 313,
          date: "2023-09-14",
          grid: "000000010000000100100000",
        },
      ],
    },
    {
      id: 233,
      rentOrder: {
        id: 148,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 314,
          date: "2023-09-14",
          grid: "000000000001000000000000",
        },
      ],
    },
    {
      id: 234,
      rentOrder: {
        id: 149,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 315,
          date: "2023-09-15",
          grid: "000000000000100000000000",
        },
      ],
    },
    {
      id: 235,
      rentOrder: {
        id: 150,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 316,
          date: "2023-09-15",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 236,
      rentOrder: {
        id: 151,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 317,
          date: "2023-09-15",
          grid: "000000001000000100000000",
        },
      ],
    },
    {
      id: 237,
      rentOrder: {
        id: 151,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [
        {
          id: 318,
          date: "2023-09-15",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 238,
      rentOrder: {
        id: 151,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 319,
          date: "2023-09-15",
          grid: "000000000011000000110000",
        },
      ],
    },
    {
      id: 241,
      rentOrder: {
        id: 154,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 334,
          date: "2023-09-19",
          grid: "000000101000000010000000",
        },
        {
          id: 335,
          date: "2023-09-23",
          grid: "000000001000000000000000",
        },
        {
          id: 336,
          date: "2023-09-25",
          grid: "000000001000100001000000",
        },
        {
          id: 337,
          date: "2023-09-20",
          grid: "000000001001010000000000",
        },
        {
          id: 338,
          date: "2023-09-26",
          grid: "000000000010001000000000",
        },
        {
          id: 339,
          date: "2023-09-22",
          grid: "001000010001001010000000",
        },
        {
          id: 340,
          date: "2023-09-27",
          grid: "000000100000000010000000",
        },
        {
          id: 341,
          date: "2023-09-24",
          grid: "000001000001000000000000",
        },
      ],
    },
    {
      id: 242,
      rentOrder: {
        id: 155,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 342,
          date: "2023-09-21",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 243,
      rentOrder: {
        id: 156,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 343,
          date: "2023-09-21",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 244,
      rentOrder: {
        id: 157,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 344,
          date: "2023-09-22",
          grid: "000000001111111100000000",
        },
        {
          id: 345,
          date: "2023-09-23",
          grid: "000000001111111100000000",
        },
        {
          id: 346,
          date: "2023-09-24",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 245,
      rentOrder: {
        id: 158,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 347,
          date: "2023-09-20",
          grid: "000101011000000000000000",
        },
      ],
    },
    {
      id: 246,
      rentOrder: {
        id: 159,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 348,
          date: "2023-09-24",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 247,
      rentOrder: {
        id: 159,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        price: "2.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 349,
          date: "2023-09-21",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 248,
      rentOrder: {
        id: 160,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 350,
          date: "2023-09-20",
          grid: "100000000000000000000000",
        },
        {
          id: 351,
          date: "2023-09-21",
          grid: "100000000000000000000000",
        },
        {
          id: 352,
          date: "2023-09-22",
          grid: "100000000000000000000000",
        },
        {
          id: 353,
          date: "2023-09-23",
          grid: "100000000000000000000000",
        },
        {
          id: 354,
          date: "2023-09-24",
          grid: "100000000000000000000000",
        },
        {
          id: 355,
          date: "2023-09-25",
          grid: "100000000000000000000000",
        },
        {
          id: 356,
          date: "2023-09-26",
          grid: "100000000000000000000000",
        },
        {
          id: 357,
          date: "2023-09-27",
          grid: "100000000000000000000000",
        },
        {
          id: 358,
          date: "2023-09-28",
          grid: "100000000000000000000000",
        },
        {
          id: 359,
          date: "2023-09-29",
          grid: "100000000000000000000000",
        },
      ],
    },
    {
      id: 249,
      rentOrder: {
        id: 161,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 360,
          date: "2023-09-20",
          grid: "000000000000010000000000",
        },
      ],
    },
    {
      id: 250,
      rentOrder: {
        id: 161,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 361,
          date: "2023-09-21",
          grid: "000000000000010000000000",
        },
        {
          id: 362,
          date: "2023-09-22",
          grid: "000000000000010000000000",
        },
        {
          id: 363,
          date: "2023-09-23",
          grid: "000000000000010000000000",
        },
        {
          id: 364,
          date: "2023-09-25",
          grid: "000000000000010000000000",
        },
        {
          id: 365,
          date: "2023-09-26",
          grid: "000000000000010000000000",
        },
        {
          id: 366,
          date: "2023-09-27",
          grid: "000000000000010000000000",
        },
        {
          id: 367,
          date: "2023-09-28",
          grid: "000000000000010000000000",
        },
        {
          id: 368,
          date: "2023-09-29",
          grid: "000000000000010000000000",
        },
        {
          id: 369,
          date: "2023-09-30",
          grid: "000000000000010000000000",
        },
      ],
    },
    {
      id: 251,
      rentOrder: {
        id: 162,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 370,
          date: "2023-09-27",
          grid: "000000000000010000000000",
        },
      ],
    },
    {
      id: 252,
      rentOrder: {
        id: 162,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 371,
          date: "2023-09-20",
          grid: "000000000000010000000000",
        },
        {
          id: 372,
          date: "2023-09-21",
          grid: "000000000000010000000000",
        },
        {
          id: 373,
          date: "2023-09-22",
          grid: "000000000000010000000000",
        },
        {
          id: 374,
          date: "2023-09-23",
          grid: "000000000000010000000000",
        },
        {
          id: 375,
          date: "2023-09-25",
          grid: "000000000000010000000000",
        },
        {
          id: 376,
          date: "2023-09-26",
          grid: "000000000000010000000000",
        },
        {
          id: 377,
          date: "2023-09-28",
          grid: "000000000000010000000000",
        },
        {
          id: 378,
          date: "2023-09-29",
          grid: "000000000000010000000000",
        },
        {
          id: 379,
          date: "2023-09-30",
          grid: "000000000000010000000000",
        },
      ],
    },
    {
      id: 253,
      rentOrder: {
        id: 163,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 380,
          date: "2023-09-22",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 254,
      rentOrder: {
        id: 163,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 381,
          date: "2023-09-20",
          grid: "000000010000000000000000",
        },
        {
          id: 382,
          date: "2023-09-21",
          grid: "000000010000000000000000",
        },
        {
          id: 383,
          date: "2023-09-23",
          grid: "000000010000000000000000",
        },
        {
          id: 384,
          date: "2023-09-24",
          grid: "000000010000000000000000",
        },
        {
          id: 385,
          date: "2023-09-25",
          grid: "000000010000000000000000",
        },
        {
          id: 386,
          date: "2023-09-26",
          grid: "000000010000000000000000",
        },
        {
          id: 387,
          date: "2023-09-27",
          grid: "000000010000000000000000",
        },
        {
          id: 388,
          date: "2023-09-28",
          grid: "000000010000000000000000",
        },
        {
          id: 389,
          date: "2023-09-29",
          grid: "000000010000000000000000",
        },
        {
          id: 390,
          date: "2023-09-30",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 255,
      rentOrder: {
        id: 164,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 391,
          date: "2023-09-26",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 256,
      rentOrder: {
        id: 164,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 392,
          date: "2023-09-20",
          grid: "000000010000000000000000",
        },
        {
          id: 393,
          date: "2023-09-21",
          grid: "000000010000000000000000",
        },
        {
          id: 394,
          date: "2023-09-22",
          grid: "000000010000000000000000",
        },
        {
          id: 395,
          date: "2023-09-23",
          grid: "000000010000000000000000",
        },
        {
          id: 396,
          date: "2023-09-24",
          grid: "000000010000000000000000",
        },
        {
          id: 397,
          date: "2023-09-25",
          grid: "000000010000000000000000",
        },
        {
          id: 398,
          date: "2023-09-27",
          grid: "000000010000000000000000",
        },
        {
          id: 399,
          date: "2023-09-28",
          grid: "000000010000000000000000",
        },
        {
          id: 400,
          date: "2023-09-29",
          grid: "000000010000000000000000",
        },
        {
          id: 401,
          date: "2023-09-30",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 257,
      rentOrder: {
        id: 165,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 402,
          date: "2023-09-23",
          grid: "100000000000000000000000",
        },
        {
          id: 403,
          date: "2023-09-24",
          grid: "100000000000000000000000",
        },
      ],
    },
    {
      id: 258,
      rentOrder: {
        id: 166,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 404,
          date: "2023-09-24",
          grid: "000000010000000000000000",
        },
      ],
    },
    {
      id: 259,
      rentOrder: {
        id: 167,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 405,
          date: "2023-09-28",
          grid: "100000000000000000000000",
        },
        {
          id: 406,
          date: "2023-09-29",
          grid: "100000000000000000000000",
        },
      ],
    },
    {
      id: 260,
      rentOrder: {
        id: 168,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 407,
          date: "2023-09-27",
          grid: "000000010000000000000000",
        },
        {
          id: 408,
          date: "2023-09-28",
          grid: "000000010000000000000000",
        },
        {
          id: 409,
          date: "2023-09-29",
          grid: "000000010000000000000000",
        },
        {
          id: 473,
          date: "2023-09-30",
          grid: "000000001000000000000000",
        },
      ],
    },
    {
      id: 261,
      rentOrder: {
        id: 169,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 411,
          date: "2023-09-20",
          grid: "010000000000000000000000",
        },
        {
          id: 412,
          date: "2023-09-21",
          grid: "010000000000000000000000",
        },
        {
          id: 413,
          date: "2023-09-22",
          grid: "010000000000000000000000",
        },
        {
          id: 414,
          date: "2023-09-23",
          grid: "010000000000000000000000",
        },
        {
          id: 415,
          date: "2023-09-24",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 262,
      rentOrder: {
        id: 170,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 416,
          date: "2023-09-20",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 263,
      rentOrder: {
        id: 171,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 417,
          date: "2023-09-21",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 264,
      rentOrder: {
        id: 172,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 418,
          date: "2023-09-20",
          grid: "100000000000000000000000",
        },
        {
          id: 419,
          date: "2023-09-21",
          grid: "100000000000000000000000",
        },
        {
          id: 420,
          date: "2023-09-22",
          grid: "100000000000000000000000",
        },
        {
          id: 421,
          date: "2023-09-23",
          grid: "100000000000000000000000",
        },
      ],
    },
    {
      id: 265,
      rentOrder: {
        id: 173,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 422,
          date: "2023-09-20",
          grid: "010000000000000000000000",
        },
        {
          id: 423,
          date: "2023-09-21",
          grid: "010000000000000000000000",
        },
        {
          id: 424,
          date: "2023-09-22",
          grid: "010000000000000000000000",
        },
        {
          id: 425,
          date: "2023-09-23",
          grid: "010000000000000000000000",
        },
        {
          id: 426,
          date: "2023-09-24",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 266,
      rentOrder: {
        id: 174,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 427,
          date: "2023-09-20",
          grid: "001000000000000000000000",
        },
        {
          id: 428,
          date: "2023-09-21",
          grid: "001000000000000000000000",
        },
        {
          id: 429,
          date: "2023-09-22",
          grid: "001000000000000000000000",
        },
        {
          id: 430,
          date: "2023-09-23",
          grid: "001000000000000000000000",
        },
        {
          id: 431,
          date: "2023-09-24",
          grid: "001000000000000000000000",
        },
        {
          id: 432,
          date: "2023-09-25",
          grid: "001000000000000000000000",
        },
        {
          id: 433,
          date: "2023-09-26",
          grid: "001000000000000000000000",
        },
        {
          id: 434,
          date: "2023-09-27",
          grid: "001000000000000000000000",
        },
        {
          id: 435,
          date: "2023-09-28",
          grid: "001000000000000000000000",
        },
        {
          id: 436,
          date: "2023-09-29",
          grid: "001000000000000000000000",
        },
        {
          id: 437,
          date: "2023-09-30",
          grid: "001000000000000000000000",
        },
      ],
    },
    {
      id: 267,
      rentOrder: {
        id: 175,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 438,
          date: "2023-09-24",
          grid: "100000000000000000000000",
        },
        {
          id: 439,
          date: "2023-09-28",
          grid: "100000000000000000000000",
        },
        {
          id: 440,
          date: "2023-09-29",
          grid: "100000000000000000000000",
        },
      ],
    },
    {
      id: 268,
      rentOrder: {
        id: 175,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 441,
          date: "2023-09-20",
          grid: "100000000000000000000000",
        },
        {
          id: 442,
          date: "2023-09-21",
          grid: "100000000000000000000000",
        },
        {
          id: 443,
          date: "2023-09-22",
          grid: "100000000000000000000000",
        },
        {
          id: 444,
          date: "2023-09-25",
          grid: "100000000000000000000000",
        },
        {
          id: 445,
          date: "2023-09-26",
          grid: "100000000000000000000000",
        },
        {
          id: 446,
          date: "2023-09-27",
          grid: "100000000000000000000000",
        },
        {
          id: 447,
          date: "2023-09-30",
          grid: "100000000000000000000000",
        },
        {
          id: 448,
          date: "2023-09-23",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 269,
      rentOrder: {
        id: 176,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 449,
          date: "2023-09-25",
          grid: "100000000000000000000000",
        },
        {
          id: 450,
          date: "2023-09-26",
          grid: "100000000000000000000000",
        },
        {
          id: 451,
          date: "2023-09-27",
          grid: "100000000000000000000000",
        },
        {
          id: 452,
          date: "2023-09-24",
          grid: "001000000000000000000000",
        },
        {
          id: 453,
          date: "2023-09-21",
          grid: "001000000000000000000000",
        },
        {
          id: 454,
          date: "2023-09-22",
          grid: "001000000000000000000000",
        },
        {
          id: 455,
          date: "2023-09-23",
          grid: "000100000000000000000000",
        },
        {
          id: 456,
          date: "2023-09-28",
          grid: "010000000000000000000000",
        },
        {
          id: 457,
          date: "2023-09-29",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 270,
      rentOrder: {
        id: 177,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 458,
          date: "2023-09-22",
          grid: "010000000000000000000000",
        },
        {
          id: 459,
          date: "2023-09-24",
          grid: "010000000000000000000000",
        },
        {
          id: 460,
          date: "2023-09-25",
          grid: "010000000000000000000000",
        },
        {
          id: 461,
          date: "2023-09-26",
          grid: "010000000000000000000000",
        },
        {
          id: 462,
          date: "2023-09-27",
          grid: "010000000000000000000000",
        },
        {
          id: 463,
          date: "2023-09-28",
          grid: "010000000000000000000000",
        },
        {
          id: 464,
          date: "2023-09-29",
          grid: "010000000000000000000000",
        },
        {
          id: 465,
          date: "2023-09-30",
          grid: "010000000000000000000000",
        },
      ],
    },
    {
      id: 271,
      rentOrder: {
        id: 177,
        status: "pending",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 466,
          date: "2023-09-23",
          grid: "001000000000000000000000",
        },
      ],
    },
    {
      id: 272,
      rentOrder: {
        id: 178,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 467,
          date: "2023-09-25",
          grid: "110000000000000000000000",
        },
        {
          id: 468,
          date: "2023-09-26",
          grid: "110000000000000000000000",
        },
        {
          id: 469,
          date: "2023-09-27",
          grid: "110000000000000000000000",
        },
        {
          id: 470,
          date: "2023-09-28",
          grid: "110000000000000000000000",
        },
        {
          id: 471,
          date: "2023-09-29",
          grid: "110000000000000000000000",
        },
        {
          id: 472,
          date: "2023-09-30",
          grid: "110000000000000000000000",
        },
      ],
    },
    {
      id: 273,
      rentOrder: {
        id: 179,
        status: "accepted",
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 12,
        type: "equipment",
        name: "Микроволновка 2",
        price: "2.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 474,
          date: "2023-09-29",
          grid: "001000000000000000000000",
        },
      ],
    },
    {
      id: 5,
      rentOrder: {
        id: 2,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 8,
        type: "kitchen",
        name: "Суши 1",
        price: "30.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 7,
      rentOrder: {
        id: 2,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [],
    },
    {
      id: 8,
      rentOrder: {
        id: 2,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 7,
        type: "kitchen",
        name: "Пиццерия 1",
        price: "15.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 11,
      rentOrder: {
        id: 3,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 9,
        type: "kitchen",
        name: "Мясо-рыбный цех",
        price: "30.0000",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [],
    },
    {
      id: 12,
      rentOrder: {
        id: 3,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [],
    },
    {
      id: 16,
      rentOrder: {
        id: 4,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 4,
        type: "kitchen",
        name: "k1",
        price: "1.0000",
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
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [],
    },
    {
      id: 20,
      rentOrder: {
        id: 5,
        status: "pending",
        company: {
          id: 2,
          name: "Умами",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [],
    },
    {
      id: 204,
      rentOrder: {
        id: 121,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 274,
          date: "2023-08-18",
          grid: "000000000011000000000000",
        },
      ],
    },
    {
      id: 214,
      rentOrder: {
        id: 130,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 2,
        type: "equipment",
        name: "Холодильник 1",
        price: "2.0000",
        category: {
          id: 1,
          name: "Холодильник",
          shiftLength: 4,
        },
      },
      intervals: [
        {
          id: 284,
          date: "2023-08-25",
          grid: "000000000000001100000000",
        },
      ],
    },
    {
      id: 227,
      rentOrder: {
        id: 142,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 308,
          date: "2023-09-19",
          grid: "000000110011000000000000",
        },
      ],
    },
    {
      id: 228,
      rentOrder: {
        id: 143,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 309,
          date: "2023-09-20",
          grid: "110000000000000000000000",
        },
      ],
    },
    {
      id: 239,
      rentOrder: {
        id: 152,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 1,
        type: "equipment",
        name: "микроволновка 1",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 320,
          date: "2023-09-19",
          grid: "000100000010000000100000",
        },
        {
          id: 321,
          date: "2023-09-20",
          grid: "000010100000001000000000",
        },
        {
          id: 322,
          date: "2023-09-22",
          grid: "000001000000000010000000",
        },
        {
          id: 323,
          date: "2023-09-23",
          grid: "001000000000000000000000",
        },
        {
          id: 324,
          date: "2023-09-25",
          grid: "000001000001010000100000",
        },
        {
          id: 325,
          date: "2023-09-24",
          grid: "000000000100000000000000",
        },
        {
          id: 326,
          date: "2023-09-21",
          grid: "000000000101000000100000",
        },
      ],
    },
    {
      id: 240,
      rentOrder: {
        id: 153,
        status: "accepted",
        company: {
          id: 16,
          name: "Тестовая Компания",
        },
      },
      equipment: {
        id: 3,
        type: "equipment",
        name: "микроволновка 2",
        price: "3.0000",
        category: {
          id: 5,
          name: "Микроволновка",
          shiftLength: 1,
        },
      },
      intervals: [
        {
          id: 327,
          date: "2023-09-24",
          grid: "000101000000010000100000",
        },
        {
          id: 328,
          date: "2023-09-20",
          grid: "000001001000100000000000",
        },
        {
          id: 329,
          date: "2023-09-25",
          grid: "000000000010000000000000",
        },
        {
          id: 330,
          date: "2023-09-26",
          grid: "000000010000000000000000",
        },
        {
          id: 331,
          date: "2023-09-22",
          grid: "000100000100000010000000",
        },
        {
          id: 332,
          date: "2023-09-27",
          grid: "000000000000010000000000",
        },
        {
          id: 333,
          date: "2023-09-29",
          grid: "000000001000000000000000",
        },
      ],
    },
    {
      id: 222,
      rentOrder: {
        id: 137,
        status: "accepted",
        company: {
          id: 21,
          name: "Супер Бурге  р",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 292,
          date: "2023-09-08",
          grid: "000000000011000000000000",
        },
      ],
    },
    {
      id: 223,
      rentOrder: {
        id: 138,
        status: "accepted",
        company: {
          id: 21,
          name: "Супер Бурге  р",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
        price: "5.0000",
        category: {
          id: 3,
          name: "Чайник",
          shiftLength: 2,
        },
      },
      intervals: [
        {
          id: 293,
          date: "2023-09-09",
          grid: "000000110000000000000000",
        },
        {
          id: 294,
          date: "2023-09-10",
          grid: "000000000011000000000000",
        },
        {
          id: 295,
          date: "2023-09-13",
          grid: "000000000000110000000000",
        },
      ],
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
          shortName: "",
          description: "описание",
          price: "3.0000",
          image: null,
        },
        {
          id: 3,
          type: "equipment",
          name: "микроволновка 2",
          shortName: "",
          description: "описание",
          price: "3.0000",
          image: null,
        },
        {
          id: 12,
          type: "equipment",
          name: "Микроволновка 2",
          shortName: "",
          description: "описание",
          price: "2.0000",
          image: null,
        },
      ],
    },
    {
      id: 1,
      name: "Холодильник",
      shiftLength: 4,
      kitchenEquipment: [
        {
          id: 2,
          type: "equipment",
          name: "Холодильник 1",
          shortName: "",
          description: "описание",
          price: "2.0000",
          image: null,
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
          shortName: "",
          description: "описание",
          price: "1.0000",
          image: null,
        },
        {
          id: 5,
          type: "kitchen",
          name: "k2",
          shortName: "",
          description: "описание",
          price: "2.0000",
          image: null,
        },
        {
          id: 6,
          type: "kitchen",
          name: "к3",
          shortName: "",
          description: "описание",
          price: "3.0000",
          image: null,
        },
        {
          id: 7,
          type: "kitchen",
          name: "Пиццерия 1",
          shortName: "",
          description: "Пицца печь, тестомес , холодильный шкаф",
          price: "15.0000",
          image: null,
        },
        {
          id: 8,
          type: "kitchen",
          name: "Суши 1",
          shortName: "",
          description: "описание",
          price: "30.0000",
          image: null,
        },
        {
          id: 9,
          type: "kitchen",
          name: "Мясо-рыбный цех",
          shortName: "",
          description: "описание",
          price: "30.0000",
          image: null,
        },
        {
          id: 10,
          type: "kitchen",
          name: "Пицца цех",
          shortName: "",
          description: "описание",
          price: "20.0000",
          image: null,
        },
      ],
    },
    {
      id: 3,
      name: "Чайник",
      shiftLength: 2,
      kitchenEquipment: [
        {
          id: 11,
          type: "equipment",
          name: "Шкаф",
          shortName: "",
          description: "описание",
          price: "5.0000",
          image: null,
        },
      ],
    },
    {
      id: 2,
      name: "Комбайн",
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

export async function getAllEquipments1() {
  return new Promise((resolve) => {
    resolve(testOrderequip);
  });
}

export async function getAllOrders1() {
  return new Promise((resolve) => {
    resolve(test);
  });
}

export async function getUser() {
  // const str = `${backendUrl}get_current_user`;
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();
  //
  return {
    role: "ROLE_MANAGER",
    id: 1,
    name: "Франчайзи 001",
  };

  // return {
  //   role: "ROLE_COMPANY",
  //   id: 1,
  //   name: "Суши \"Минск-сити\"",
  // };
}

export async function getCompanies() {
  // const str = `${backendUrl}get_lessee_companies/`;
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();

  return [
    { id: 1, name: "Суши \"Минск-сити\"" },
    { id: 16, name: "Тестовая Компания" },
  ];

  // return {
  //   role: "ROLE_COMPANY",
  //   id: 1,
  //   name: "Суши",
  // };
}
export async function getAllEquipments() {
  const str = `${backendUrl}get_equipment`;
  const res = await fetch(str, {});
  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return res.json();
}

export async function getManagerEquipments() {
  const str = `${backendUrl}get_equipment_manager`;
  const res = await fetch(str, {});
  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }
  return res.json();
}

export async function getAllOrders() {
  const str = `${backendUrl}get_equipment_items`;
  const res = await fetch(str, {});

  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return res.json();
}

export async function sendEditOrder(order) {
  const str = `${backendUrl}edit_order`;
  // eslint-disable-next-line
  const res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    mode: "no-cors",

    body: JSON.stringify(order),
  });

  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }

  // return res.json();
  return true;
}

export async function createOrder(order, company, status) {
  console.log(company);
  const str = `${backendUrl}save_order`;
  const dateIntervals = formatOrder(order);
  const body = {
    company: {
      id: company.id,
      name: company.name,
    },
    status,
    equipmentItems: dateIntervals,
  };
  // eslint-disable-next-line
  const res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    mode: "no-cors",
    body: JSON.stringify(body),
  });
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }

  // return res.json();
  return true;
}
