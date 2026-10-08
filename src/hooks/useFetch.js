import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      setError(null);
      setLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed (${response.status} ${response.statusText})`);
        }

        const result = await response.json();
        setData(result);
      } catch (fetchError) {
        if (fetchError?.name !== 'AbortError') {
          setError(fetchError instanceof Error ? fetchError : new Error(String(fetchError)));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
