/* eslint-disable */
import moment from "moment";

const backendUrl = "http://freekitchen.loc/test/";

export const getProfitData = (start, end) => {
  const generateTimeRangeData = () => {
    let day = moment(start);
    const result = [];
    while (day.isSameOrBefore(moment(end))) {
      const profitValue = Math.floor(Math.random() * 3000);
      const profitDate = day.format("YYYY-MM-DD");
      result.push({
        y: profitValue, x: profitDate,
      });
      day = day.add(1, "day");
    }
    return result;
  };

  return new Promise((resolve) => {
    resolve(generateTimeRangeData());
  });
};

export async function getRentCompanies() {
  // const str = "/admin/api/get_contracts";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // return res.json();
  return testCompany;
}
export async function getUserInfo() {
  // const str = "/admin/api/get_manager_info";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();
  return testUser;
}
export async function getOrders() {
  // const str = "/admin/api/get_orders";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();

  return testOrders;
}

export async function getAllOrdersDashboard() {
  const str = `${backendUrl}get_equipment_items`;
  const res = await fetch(str, {});

  if (!res.ok) {
    throw new Error("Something went wrong. Sorry");
  }

  return res.json();
}
export async function getRepairingEquipments() {
  // const str = "http://freekitchen.loc/admin/api/get_manager_info";?
// if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }

  // // console.log("getOrders:", res);
  // return res.json();
  return testRepairingEquip.data;
}
const testUser = {
  lesseeCompanies: 3,
  kitchens: 2,
  kitchensFree: 1,
  equipment: 6,
  equipmentFree: 5,
  marketPlaces: 3,
  name: "Франчайзи 001",
};

const testCompany = {
  success: true,
  data: [
    {
      id: 2,
      balance: "10.00",
      isCurrent: null,
      company: {},
    },
    {
      id: 3,
      balance: "20.00",
      isCurrent: null,
      company: {
        id: 25,
        name: "компания2",
        sysName: "33",
        type: "lessee",
        email: null,
        createdAt: {
          date: "2022-08-03 11:28:20.000000",
          timezone_type: 3,
          timezone: "Europe/Moscow",
        },
        site: null,
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
    {
      id: 5,
      balance: "40.00",
      isCurrent: false,
      company: {
        id: 3,
        name: "компания1",
        sysName: "",
        type: "lessee",
        email: null,
        createdAt: {
          date: "2022-08-03 11:28:20.000000",
          timezone_type: 3,
          timezone: "Europe/Moscow",
        },
        site: null,
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
    {
      id: 20,
      balance: "0.00",
      isCurrent: null,
      company: {
        id: 23,
        name: "компания",
        sysName: "some",
        type: "lessee",
        email: null,
        createdAt: {
          date: "2022-08-03 11:28:20.000000",
          timezone_type: 3,
          timezone: "Europe/Moscow",
        },
        site: null,
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
    {
      id: 21,
      balance: "0.00",
      isCurrent: true,
      company: {
        id: 23,
        name: "компания",
        sysName: "some",
        type: "lessee",
        email: null,
        createdAt: {
          date: "2022-08-03 11:28:20.000000",
          timezone_type: 3,
          timezone: "Europe/Moscow",
        },
        site: null,
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
    {
      id: 22,
      balance: "0.00",
      isCurrent: true,
      company: {
        id: 3,
        name: "компания1",
        sysName: "",
        type: "lessee",
        email: null,
        createdAt: {
          date: "2022-08-03 11:28:20.000000",
          timezone_type: 3,
          timezone: "Europe/Moscow",
        },
        site: null,
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
    {
      id: 25,
      balance: "0.00",
      isCurrent: false,
      company: {
        id: 27,
        name: "123",
        sysName: "312",
        type: "lessee",
        email: "1@mail.ru",
        createdAt: null,
        site: "132",
        updatedAt: null,
        shortComment: null,
        contactFullName: null,
        contactPosition: null,
        contactPositionReason: null,
        contactPhones: null,
        contactEmail: null,
        lawName: null,
        lawAddress: null,
        address: null,
        unp: null,
        okpo: null,
        igrn: null,
        bankAccount: null,
        bankName: null,
        bankAddress: null,
        bankBik: null,
        bankKpp: null,
        bankKorAccount: null,
      },
    },
  ],
};
const testRepairingEquip = {
  success: true,
  data: [
    {
      id: 8,
      name: "Холодильники",
      shiftLength: 4,
      kitchenEquipment: [
        {
          id: 23,
          type: "equipment",
          name: "Холодильник Sumsung",
          shortName: "Х1",
          description: "Рост: 150см. Ширина: 60см. Вес: 20кг.",
          price: "10.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 10,
      name: "Печи",
      shiftLength: 4,
      kitchenEquipment: [
        {
          id: 26,
          type: "equipment",
          name: "Плавильная печь",
          shortName: "ПП1",
          description: "Очень горячё!",
          price: "88.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 12,
      name: "Цеха",
      shiftLength: 8,
      kitchenEquipment: [
        {
          id: 22,
          type: "kitchen",
          name: "Цех 2",
          shortName: "Ц2",
          description: "Длинна: 98м. Широта:  96м. Градус: 38.",
          price: "55.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 13,
      name: "Морозилки",
      shiftLength: 4,
      kitchenEquipment: [
        {
          id: 24,
          type: "equipment",
          name: "Морозидка",
          shortName: "МЗ1",
          description: "Рост: 150см. Ширина: 60см. Вес: 50кг.",
          price: "28.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 14,
      name: "Фритюр",
      shiftLength: 4,
      kitchenEquipment: [
        {
          id: 25,
          type: "equipment",
          name: "Фритюр",
          shortName: "ФР1",
          description: "Хороший",
          price: "15.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 17,
      name: "123",
      shiftLength: 2,
      kitchenEquipment: [
        {
          id: 27,
          type: "equipment",
          name: "312",
          shortName: "321",
          description: null,
          price: "0.0000",
          image: null,
          marketPlace: {
            id: 1,
            conditionTimes: [
              {
                id: 2,
                timeFrom: "11:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: false,
                sunday: false,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 9,
      name: "Кухни",
      shiftLength: 8,
      kitchenEquipment: [
        {
          id: 20,
          type: "kitchen",
          name: "Кухня 1",
          shortName: "К1",
          description: "Длинна: 100м. Широта: 69м. Градус: 40.",
          price: "50.0000",
          image: null,
          marketPlace: {
            id: 3,
            conditionTimes: [
              {
                id: 4,
                timeFrom: "7:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: false,
              },
              {
                id: 7,
                timeFrom: "00:00",
                timeTo: "23:59",
                monday: false,
                tuesday: false,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 11,
      name: "Другое",
      shiftLength: 1,
      kitchenEquipment: [
        {
          id: 19,
          type: "equipment",
          name: "Чайник",
          shortName: "Ч1",
          description: "Объем:  2л. Цвет:  белый.",
          price: "5.0000",
          image: "https://686601.selcdn.ru/caf-public/images/freekitchen/f10233034f51e422c4c2fbf5764b0388.jpeg",
          marketPlace: {
            id: 3,
            conditionTimes: [
              {
                id: 4,
                timeFrom: "7:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: false,
              },
              {
                id: 7,
                timeFrom: "00:00",
                timeTo: "23:59",
                monday: false,
                tuesday: false,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            ],
          },
          managerId: null,
        },
        {
          id: 21,
          type: "equipment",
          name: "Альпака",
          shortName: "АЛ1",
          description: "Рост: 150см. Ширина: 60см. Вес: 15кг.",
          price: "100.0000",
          image: null,
          marketPlace: {
            id: 3,
            conditionTimes: [
              {
                id: 4,
                timeFrom: "7:00",
                timeTo: "23:00",
                monday: true,
                tuesday: true,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: false,
              },
              {
                id: 7,
                timeFrom: "00:00",
                timeTo: "23:59",
                monday: false,
                tuesday: false,
                wednesday: true,
                thursday: true,
                friday: true,
                saturday: true,
                sunday: true,
              },
            ],
          },
          managerId: null,
        },
      ],
    },
    {
      id: 15,
      name: "Категория1",
      shiftLength: 4,
      kitchenEquipment: [],
    },
    {
      id: 16,
      name: "Категория2",
      shiftLength: 2,
      kitchenEquipment: [],
    },
  ],
};
const testOrders = [
  {
    id: 272,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 271,
    category: "Другое",
    company: "Франчайзи 001",
    price: "100.0000",
    total: 100,
    date: "2023-11-01",
    shift: 1,
    status: "Принято",
    equipment: "Альпака",
  },
  {
    id: 270,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 269,
    category: "Морозилки",
    company: "Франчайзи 001",
    price: "28.0000",
    total: 112,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Морозидка",
  },
  {
    id: 268,
    category: "Печи",
    company: "компания1",
    price: "88.0000",
    total: 352,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Плавильная печь",
  },
  {
    id: 267,
    category: "Холодильники",
    company: "Франчайзи 001",
    price: "10.0000",
    total: 40,
    date: "2023-11-01",
    shift: 4,
    status: "Принято",
    equipment: "Холодильник Sumsung",
  },
  {
    id: 266,
    category: "Кухни",
    company: "Франчайзи 001",
    price: "50.0000",
    total: 400,
    date: "2023-11-01",
    shift: 8,
    status: "Принято",
    equipment: "Кухня 1",
  },
  {
    id: 265,
    category: "Другое",
    company: "компания",
    price: "5.0000",
    total: 5,
    date: "2023-10-31",
    shift: 1,
    status: "Принято",
    equipment: "Чайник",
  },
  {
    id: 264,
    category: "Кухни",
    company: "компания1",
    price: "50.0000",
    total: 200,
    date: "2023-10-27",
    shift: 4,
    status: "Принято",
    equipment: "Кухня 1",
  },
];
