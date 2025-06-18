import React, { useEffect, useState } from 'react';
import { getClientsJobCountByIndustry } from '../../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom';

const getCachedIndustryData = () => {
  const cachedData = localStorage.getItem('industryCounts');
  return cachedData ? JSON.parse(cachedData) : null;
};

const setCachedIndustryData = (data) => {
  localStorage.setItem('industryCounts', JSON.stringify(data));
};

const Category = () => {
  const [industryCounts, setIndustryCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = getCachedIndustryData();

    if (cachedData) {
      setIndustryCounts(cachedData);
      setLoading(false);
    } else {
      const fetchIndustryData = async () => {
        try {
          const response = await getClientsJobCountByIndustry();
          if (response) {
            setIndustryCounts(response);
            setCachedIndustryData(response);
          }
        } catch (error) {
          console.error('Error fetching industry job count:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchIndustryData();
    }
  }, []);

  return (
    <div>
      <h4 className="mb-3">Industries with Job Listings</h4>
      {loading ? (
        <p>Loading...</p>
      ) : industryCounts.length === 0 ? (
        <p>No industries found.</p>
      ) : (
        <div className="row">
          {industryCounts.map((industry) => {
            const formattedName = industry.industry_name
              .toLowerCase()
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <div
                key={industry.industry_id}
                className="col-md-4 mb-3 d-flex align-items-center"
              >
                <span className="badge bg-primary rounded-pill me-3">
                  {industry.job_count}
                </span>
                <Link
                  to={`/jobs?industry=${encodeURIComponent(industry.industry_name)}`}
                  className="text-decoration-none text-dark"
                >
                  {formattedName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;
