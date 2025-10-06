import { useEffect, useState } from 'react';
import { getCulture } from '../../Api/Universal/UniversalApi';
import { getExperienceType } from '../../Api/Universal/UniversalApi';

const useExperienceType = () => {
  const [experincetype, setexperiencetype] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getExperienceType().then((res) => {
      if (mounted) {
        setexperiencetype(res.data);  
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);
  console.log("check experinece type  yap",experincetype);
  return {experincetype, loading };
};

export default useExperienceType;