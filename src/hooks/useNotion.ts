import { useEffect, useState } from 'react';
import { fetchLastTenVulnerabilities, fetchAllVulnerabilities } from '../services/notionService';

interface Vulnerability {
  id: string;
  title: string;
  url: string;
  affectedOS: string;
  description: string;
  creationDate: string;
  status: string;
}

export function useLastTenVulnerabilities() {
  const [data, setData] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchLastTenVulnerabilities();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
}

export function useAllVulnerabilities() {
  const [data, setData] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchAllVulnerabilities();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
}
