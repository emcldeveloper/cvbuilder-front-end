import { useEffect, useState } from 'react';
import { getSoftware } from '../../Api/Universal/UniversalApi';

const useSoftware = () => {
  const [software, setsoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getSoftware().then((res) => {
      if (mounted) {
        setsoftware(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return {software, loading };
};

export default useSoftware;