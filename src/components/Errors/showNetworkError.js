const showNetworkError = (failedReq, statusCode = 404) => {
  console.log(1212);
  window.swal({
    icon: "error",
    text: `"${failedReq}" failed with  status code ${statusCode}`,
  });
};

export default showNetworkError;
