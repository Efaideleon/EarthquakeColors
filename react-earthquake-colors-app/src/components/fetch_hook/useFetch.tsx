import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch(url);
              const jsonData = await response.json();
              setData(jsonData);
            } catch (err) {
              setError(err as Error);
            } finally {
              setLoading(false);
            }
          };
          fetchData();
      
          const intervalId = setInterval(fetchData, 60000);
          return () => clearInterval(intervalId);
    }, [url]);

    return { data, error, loading }
}