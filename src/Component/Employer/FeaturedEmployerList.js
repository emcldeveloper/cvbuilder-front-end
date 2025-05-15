import React, { useEffect, useState } from 'react';
import FeaturedEmployers from './FeaturedEmployers';
import { getListOfEmployers } from '../../Api/Employer/ListOfEmployerApi';

const FeaturedEmployerList = () => {
  const [jobCompanies, setJobCompanies] = useState([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await getListOfEmployers(1,20); // Defaults to page=1
        setJobCompanies(response.data); // response.data contains the array of employers
      } catch (error) {
        console.error('Failed to fetch employer list:', error);
      }
    };

    fetchEmployers();
  }, []);

  return (
    <div>
      <FeaturedEmployers jobCompanies={jobCompanies} />
    </div>
  );
};

export default FeaturedEmployerList;
