import { axiosInstance } from '@/services/instance';
import { Monitor } from '@prisma/client';
import { useEffect, useState } from 'react';

export const useNewMonitor = () => {
  const [loading, setLoading] = useState(false);
  const [monitor, setMonitor] = useState<Monitor[]>([]);

  useEffect(() => {
    async function fetchNewMonitorId() {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/monitor`);

        console.log('data', data);

        data && setMonitor(data.newMonitor);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNewMonitorId();
  }, []);

  console.log('monitor', monitor);

  return { monitor, loading };
};
