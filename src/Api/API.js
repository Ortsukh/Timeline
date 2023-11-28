import { formatOrder } from "../common/DataConvertHelper";

// const backendUrl = "http://freekitchen.loc/test/";
// prod
const backendUrl = "/admin/manager/";

export async function sendEditOrder(order) {
  const str = `${backendUrl}edit_order`;
  // eslint-disable-next-line
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

export async function createOrder(order, company, comment, status) {
  const str = `${backendUrl}save_order`;
  const dateIntervals = formatOrder(order);
  const body = {
    company: {
      id: company.id,
      name: company.name,
    },
    status,
    comment,
    equipmentItems: dateIntervals,
  };
  // eslint-disable-next-line
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
