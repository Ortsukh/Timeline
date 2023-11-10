// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from "sweetalert2";

const showNetwork = (failedReq, statusCode = 404) => {
  if (failedReq === "error") {
    Swal.fire({
      icon: "error",
      text: `Не удалась установить соединение. Ошибка ${statusCode}.`,
    });
    return;
  }

  if (failedReq === "success") {
    Swal.fire({
      icon: "success",
      text: "Запрос прошел успешно.",
      showConfirmButton: false,
    });
    setTimeout(() => {
      Swal.close();
    }, 1500);
    return;
  }

  Swal.fire({
    icon: "info",
    text: `${failedReq}. Код ${statusCode}.`,
  });
};

export default showNetwork;
