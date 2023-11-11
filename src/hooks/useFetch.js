import React from "react";
import fetchJSON from "../common/helper";

const useFetch = (url, update) => {
  const [fetchData, setFetchData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState(null);

  React.useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      try {
        const { data } = await fetchJSON(url);
        setFetchData(data);
        setLoading(false);
      } catch (error) {
        setFetchError(error);
      }
    })();
  }, [update]);

  return { data: fetchData, loading, error: fetchError };
};

export default useFetch;
