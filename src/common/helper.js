import showNetwork from "../components/Alert/showNetwork";

export default function fetchJSON(url) {
  return fetch(url, {
    credentials: "same-origin",
    secure: false,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  })
    .then((result) => {
      const statusCode = result.status;
      if (statusCode >= 400) {
        showNetwork(url, statusCode);
      }
      return result;
    })
    .then((result) => result.json())
    .catch((reason) => {
      showNetwork("error");
      console.log("catch", reason.response);
    });
}
