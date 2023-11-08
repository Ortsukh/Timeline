import React from "react";
import fetchJSON from "../common/helper";

const useFetch = (url) => {
  const [fetchData, setFetchData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        console.log("fetch");
        const { data } = await fetchJSON(url);
        setFetchData(data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data: fetchData, loading, error: fetchError };
};

export default useFetch;
