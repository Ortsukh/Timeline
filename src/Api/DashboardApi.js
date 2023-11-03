/* eslint-disable */
import moment from "moment";

// const backendUrl = "http://freekitchen.loc/test/";
const backendUrl = "/admin/manager/";
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

export async function getLesseeInfo(id) {
  // const str = `/admin/api/get_lessee_info/${id}`;
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();
  return testUser;
}
export async function getOrders(id) {
  // const str = `/admin/api/get_orders${id ? `/${id}` : ''}`;
  // const res = await fetch(str, {}) ;
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
export async function getTransactions() {
  // const str = "/admin/api/get_transactions";
  // const res = await fetch(str, {});
  // if (!res.ok) {
  //   throw new Error("Something went wrong. Sorry");
  // }
  // console.log(res);
  // return res.json();

  return testTransactions;
}
export async function getRepairingEquipments() {
//   const str = "/admin/api/get_kitchen_equipment"
//   const res = await fetch(str, {});
//
// if (!res.ok) {
//     throw new Error("Something went wrong. Sorry");
//   }
//
//   // console.log("getOrders:", res);
//   return res.json();
  return testRepairingEquip;
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
  "success": true,
  "data": [
    {
      "id": 2,
      "balance": "50.00",
      "reservedBalance": "1320.00",
      "isCurrent": null,
      "company": {
        "id": 23,
        "name": "компания",
        "sysName": "some",
        "type": "lessee",
        "email": null,
        "createdAt": {
          "date": "2022-08-03 11:28:20.000000",
          "timezone_type": 3,
          "timezone": "Europe/Moscow"
        },
        "site": null,
        "updatedAt": null,
        "shortComment": null,
        "contactFullName": null,
        "contactPosition": null,
        "contactPositionReason": null,
        "contactPhones": null,
        "contactEmail": null,
        "lawName": null,
        "lawAddress": null,
        "address": null,
        "unp": null,
        "okpo": null,
        "igrn": null,
        "bankAccount": null,
        "bankName": null,
        "bankAddress": null,
        "bankBik": null,
        "bankKpp": null,
        "bankKorAccount": null
      }
    },
    {
      "id": 3,
      "balance": "50.00",
      "reservedBalance": "0.00",
      "isCurrent": null,
      "company": {
        "id": 25,
        "name": "компания2",
        "sysName": "33",
        "type": "lessee",
        "email": null,
        "createdAt": {
          "date": "2022-08-03 11:28:20.000000",
          "timezone_type": 3,
          "timezone": "Europe/Moscow"
        },
        "site": null,
        "updatedAt": null,
        "shortComment": null,
        "contactFullName": null,
        "contactPosition": null,
        "contactPositionReason": null,
        "contactPhones": null,
        "contactEmail": null,
        "lawName": null,
        "lawAddress": null,
        "address": null,
        "unp": null,
        "okpo": null,
        "igrn": null,
        "bankAccount": null,
        "bankName": null,
        "bankAddress": null,
        "bankBik": null,
        "bankKpp": null,
        "bankKorAccount": null
      }
    },
    {
      "id": 5,
      "balance": "50.00",
      "reservedBalance": "0.00",
      "isCurrent": false,
      "company": {
        "id": 3,
        "name": "компания1",
        "sysName": "",
        "type": "lessee",
        "email": null,
        "createdAt": {
          "date": "2022-08-03 11:28:20.000000",
          "timezone_type": 3,
          "timezone": "Europe/Moscow"
        },
        "site": null,
        "updatedAt": null,
        "shortComment": null,
        "contactFullName": null,
        "contactPosition": null,
        "contactPositionReason": null,
        "contactPhones": null,
        "contactEmail": null,
        "lawName": null,
        "lawAddress": null,
        "address": null,
        "unp": null,
        "okpo": null,
        "igrn": null,
        "bankAccount": null,
        "bankName": null,
        "bankAddress": null,
        "bankBik": null,
        "bankKpp": null,
        "bankKorAccount": null
      }
    }
  ]
}
const testRepairingEquip = {
  "success": true,
  "data": [
    {
      "id": 24,
      "status": "Активен",
      "type": "equipment",
      "name": "Морозидка",
      "shortName": "МЗ1",
      "parameters": [],
      "description": "Рост: 150см. Ширина: 60см. Вес: 50кг.",
      "price": "12.0000",
      "updatedAt": {
        "date": "2023-11-02 16:25:57.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    },
    {
      "id": 22,
      "status": "В ремонте",
      "type": "kitchen",
      "name": "Цех 2",
      "shortName": "Ц2",
      "parameters": [],
      "description": "Длинна: 98м. Широта:  96м. Градус: 38.",
      "price": "55.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    },
    {
      "id": 23,
      "status": "Неактивен",
      "type": "equipment",
      "name": "Холодильник Sumsung",
      "shortName": "Х1",
      "parameters": [],
      "description": "Рост: 150см. Ширина: 60см. Вес: 20кг.",
      "price": "10.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    },
    {
      "id": 25,
      "status": "В ремонте",
      "type": "equipment",
      "name": "Фритюр",
      "shortName": "ФР1",
      "parameters": [],
      "description": "Хороший",
      "price": "15.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    },
    {
      "id": 26,
      "status": "Активен",
      "type": "equipment",
      "name": "Плавильная печь",
      "shortName": "ПП1",
      "parameters": [],
      "description": "Очень горячё!",
      "price": "88.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    },
    {
      "id": 31,
      "status": "В ремонте",
      "type": "equipment",
      "name": "312",
      "shortName": "312",
      "parameters": [],
      "description": null,
      "price": "0.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": true
    },
    {
      "id": 38,
      "status": "Неактивен",
      "type": "equipment",
      "name": "1",
      "shortName": "1",
      "parameters": [],
      "description": null,
      "price": "0.0000",
      "updatedAt": {
        "date": "1970-01-02 00:00:00.000000",
        "timezone_type": 3,
        "timezone": "Europe/Moscow"
      },
      "image": null,
      "deleted": false
    }
  ]
}

const testOrders =  [
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
  ]



const testTransactions = {
  success: true,
  data: [
    {
      "id": 394,
      "status": "Принято",
      "amount": "3.0000",
      "amountAfter": "89227.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 385,
      "status": "Принято",
      "amount": "42.0000",
      "amountAfter": "1848.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 387,
      "status": "Принято",
      "amount": "12.0000",
      "amountAfter": "1860.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 389,
      "status": "Принято",
      "amount": "9.0000",
      "amountAfter": "1869.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 391,
      "status": "Принято",
      "amount": "8.0000",
      "amountAfter": "1877.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 393,
      "status": "processed",
      "amount": "3.0000",
      "amountAfter": "1880.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 386,
      "status": "processed",
      "amount": "42.0000",
      "amountAfter": "211.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 388,
      "status": "processed",
      "amount": "12.0000",
      "amountAfter": "199.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 390,
      "status": "processed",
      "amount": "9.0000",
      "amountAfter": "190.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      },
      {
      "id": 392,
      "status": "processed",
      "amount": "8.0000",
      "amountAfter": "182.0000",
      "updatedAt": {
      "date": "2023-10-20 18:00:03.000000",
      "timezone_type": 3,
      "timezone": "Europe/Moscow"
      },
      "contract": {
      "id": 22,
      "company": {
      "id": 3,
      "name": "компания1"
      }
      }
      }
  ]
}

