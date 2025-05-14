import React from 'react';
import FeaturedEmployers from './FeaturedEmployers';

const FeaturedEmployerList = () => {
  const jobCompanies = [
    { id: 1, client_name: 'Company A', logo: '/path/to/logoA.png' },
    { id: 2, client_name: 'Company B', logo: '/path/to/logoB.png' },
    { id: 3, client_name: 'Company C', logo: 'logo.png' },
  ];

  return (
    <div>
      <FeaturedEmployers jobCompanies={jobCompanies} />
    </div>
  );
};

export default FeaturedEmployerList;
