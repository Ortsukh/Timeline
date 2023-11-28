import { useEffect, useState } from "react";
import fetchJSON from "../common/helper";

const useFetch = (url, update) => {
  const [fetchData, setFetchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setLoading(true);

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
