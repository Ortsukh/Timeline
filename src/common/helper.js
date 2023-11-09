import showNetworkError from "../components/Errors/showNetworkError";

export default function fetchJSON(url) {
  console.log(url);
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
      console.log(result);
      const statusCode = result.status;
      if (statusCode >= 400) {
        showNetworkError(url, statusCode);
      }
      return result;
    })
    .then((result) => result.json())
    .catch((reason) => {
      showNetworkError("Ошибка сети");
      console.log("catch", reason.response);
    });
}
