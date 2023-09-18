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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 2,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 3,
      rentOrder: {
        id: 1,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          name: "Суши \"Минск-сити\"",
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
      id: 21,
      rentOrder: {
        id: 6,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 22,
      rentOrder: {
        id: 7,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 23,
      rentOrder: {
        id: 7,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 24,
      rentOrder: {
        id: 8,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 25,
      rentOrder: {
        id: 9,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 27,
      rentOrder: {
        id: 11,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 28,
      rentOrder: {
        id: 12,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 30,
      rentOrder: {
        id: 14,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 31,
      rentOrder: {
        id: 15,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 32,
      rentOrder: {
        id: 16,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 33,
      rentOrder: {
        id: 17,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 35,
      rentOrder: {
        id: 18,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 36,
      rentOrder: {
        id: 19,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 38,
      rentOrder: {
        id: 20,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 39,
      rentOrder: {
        id: 20,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 42,
      rentOrder: {
        id: 22,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 44,
      rentOrder: {
        id: 24,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 45,
      rentOrder: {
        id: 25,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 46,
      rentOrder: {
        id: 25,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 47,
      rentOrder: {
        id: 25,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 50,
      rentOrder: {
        id: 27,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 51,
      rentOrder: {
        id: 27,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 53,
      rentOrder: {
        id: 28,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 54,
      rentOrder: {
        id: 29,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 55,
      rentOrder: {
        id: 29,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 56,
      rentOrder: {
        id: 30,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 58,
      rentOrder: {
        id: 31,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 59,
      rentOrder: {
        id: 32,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 60,
      rentOrder: {
        id: 32,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 61,
      rentOrder: {
        id: 32,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 63,
      rentOrder: {
        id: 33,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 65,
      rentOrder: {
        id: 34,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 66,
      rentOrder: {
        id: 34,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 68,
      rentOrder: {
        id: 35,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 69,
      rentOrder: {
        id: 35,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 71,
      rentOrder: {
        id: 37,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 72,
      rentOrder: {
        id: 38,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 73,
      rentOrder: {
        id: 38,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 74,
      rentOrder: {
        id: 39,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 75,
      rentOrder: {
        id: 40,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 77,
      rentOrder: {
        id: 42,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 78,
      rentOrder: {
        id: 42,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 79,
      rentOrder: {
        id: 43,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 80,
      rentOrder: {
        id: 43,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 81,
      rentOrder: {
        id: 44,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 82,
      rentOrder: {
        id: 45,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 83,
      rentOrder: {
        id: 46,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 84,
      rentOrder: {
        id: 46,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 85,
      rentOrder: {
        id: 46,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 87,
      rentOrder: {
        id: 47,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 88,
      rentOrder: {
        id: 47,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 90,
      rentOrder: {
        id: 49,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 91,
      rentOrder: {
        id: 50,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 92,
      rentOrder: {
        id: 51,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 93,
      rentOrder: {
        id: 52,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 94,
      rentOrder: {
        id: 53,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 95,
      rentOrder: {
        id: 54,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 96,
      rentOrder: {
        id: 54,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 98,
      rentOrder: {
        id: 56,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 99,
      rentOrder: {
        id: 57,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 100,
      rentOrder: {
        id: 57,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 102,
      rentOrder: {
        id: 58,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 103,
      rentOrder: {
        id: 58,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 105,
      rentOrder: {
        id: 60,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 106,
      rentOrder: {
        id: 60,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 107,
      rentOrder: {
        id: 60,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 109,
      rentOrder: {
        id: 61,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 110,
      rentOrder: {
        id: 61,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 112,
      rentOrder: {
        id: 62,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 113,
      rentOrder: {
        id: 62,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 115,
      rentOrder: {
        id: 63,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 116,
      rentOrder: {
        id: 63,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 118,
      rentOrder: {
        id: 64,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 119,
      rentOrder: {
        id: 64,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 121,
      rentOrder: {
        id: 65,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 122,
      rentOrder: {
        id: 66,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 123,
      rentOrder: {
        id: 66,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 124,
      rentOrder: {
        id: 66,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 126,
      rentOrder: {
        id: 67,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 127,
      rentOrder: {
        id: 67,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 129,
      rentOrder: {
        id: 68,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 130,
      rentOrder: {
        id: 68,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 132,
      rentOrder: {
        id: 69,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 133,
      rentOrder: {
        id: 69,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 135,
      rentOrder: {
        id: 70,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 136,
      rentOrder: {
        id: 70,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 138,
      rentOrder: {
        id: 71,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 139,
      rentOrder: {
        id: 71,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 142,
      rentOrder: {
        id: 72,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 144,
      rentOrder: {
        id: 72,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 145,
      rentOrder: {
        id: 72,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 146,
      rentOrder: {
        id: 72,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
      id: 147,
      rentOrder: {
        id: 72,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 209,
          date: "2023-08-14",
          grid: "001111111100000000000000",
        },
      ],
    },
    {
      id: 159,
      rentOrder: {
        id: 79,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 210,
          date: "2023-08-14",
          grid: "000000000000000000000011",
        },
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 213,
          date: "2023-08-14",
          grid: "000000001111111100000000",
        },
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 215,
          date: "2023-08-14",
          grid: "000000000000000011111111",
        },
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 217,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 163,
      rentOrder: {
        id: 82,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 218,
          date: "2023-08-14",
          grid: "222222222222222200000000",
        },
      ],
    },
    {
      id: 164,
      rentOrder: {
        id: 83,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 219,
          date: "2023-08-14",
          grid: "222222222222222200000000",
        },
      ],
    },
    {
      id: 165,
      rentOrder: {
        id: 84,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 220,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 166,
      rentOrder: {
        id: 85,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 222,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 168,
      rentOrder: {
        id: 87,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 223,
          date: "2023-08-14",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 169,
      rentOrder: {
        id: 88,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 224,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 170,
      rentOrder: {
        id: 89,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 225,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 171,
      rentOrder: {
        id: 90,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 226,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 172,
      rentOrder: {
        id: 91,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 227,
          date: "2023-08-14",
          grid: "000000001111111100000000",
        },
      ],
    },
    {
      id: 173,
      rentOrder: {
        id: 92,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 229,
          date: "2023-08-14",
          grid: "000000001111111111111111",
        },
      ],
    },
    {
      id: 175,
      rentOrder: {
        id: 94,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
        category: {
          id: 6,
          name: "Кухня",
          shiftLength: 8,
        },
      },
      intervals: [
        {
          id: 231,
          date: "2023-08-14",
          grid: "000000000000000011111111",
        },
      ],
    },
    {
      id: 177,
      rentOrder: {
        id: 96,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 232,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
      ],
    },
    {
      id: 178,
      rentOrder: {
        id: 97,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
          id: 233,
          date: "2023-08-14",
          grid: "111111110000000000000000",
        },
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: null,
      intervals: [],
    },
    {
      id: 185,
      rentOrder: {
        id: 97,
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 5,
        type: "kitchen",
        name: "k2",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
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
        company: {
          id: 1,
          name: "Суши \"Минск-сити\"",
        },
      },
      equipment: {
        id: 11,
        type: "equipment",
        name: "Шкаф",
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
      id: 3,
      name: "Чайник",
      shiftLength: 2,
      kitchenEquipment: [
        {
          id: 11,
          type: "equipment",
          name: "Шкаф",
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

  // return {
  //   role: "ROLE_MANAGER",
  //   id: 1,
  //   name: "Франчайзи 001",
  // };

  return {
    role: "ROLE_COMPANY",
    id: 1,
    name: "Суши \"Минск-сити\"",
  };
}

export async function getCompanies() {
  // const str = `${backendUrl}get_lessee_companies/`;
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();

  return [{ id: 1, name: "Суши \"Минск-сити\"" }, { id: 16, name: "Тестовая Компания" }];

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

  const res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    // mode: "no-cors",

    body: JSON.stringify(order),
  });

  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return res.json();
  // return true;
}

export async function createOrder(order, company) {
  console.log(company);
  const str = `${backendUrl}save_order`;
  const dateIntervals = formatOrder(order);
  const body = {
    company: {
      id: company.id,
      name: company.name,
    },
    status: "pending",
    equipmentItems: dateIntervals,
  };

  const res = await fetch(str, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    // mode: "no-cors",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return res.json();
  // return true;
}
