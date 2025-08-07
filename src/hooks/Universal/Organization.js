import { useEffect, useState } from 'react';
import { getOrganization } from '../../Api/Universal/UniversalApi';

const useOrganization = () => {
  const [organization, setOrganization] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getOrganization().then((res) => {
      if (mounted) {
        setOrganization(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return { organization, loading };
};

export default useOrganization;