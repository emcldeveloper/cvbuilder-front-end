import React, { useEffect, useState } from 'react';
import { getClientsJobCountByIndustry } from '../../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom'; // Optional: if using React Router

// Helper function to get cached data from localStorage
const getCachedIndustryData = () => {
  const cachedData = localStorage.getItem('industryCounts');
  return cachedData ? JSON.parse(cachedData) : null;
};

// Helper function to set data in localStorage
const setCachedIndustryData = (data) => {
  localStorage.setItem('industryCounts', JSON.stringify(data));
};

const Category = () => {
  const [industryCounts, setIndustryCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the industry data is cached
    const cachedData = getCachedIndustryData();

    if (cachedData) {
      // If cached data exists, use it and stop loading
      setIndustryCounts(cachedData);
      setLoading(false);
    } else {
      // If no cache, fetch data from the API
      const fetchIndustryData = async () => {
        try {
          const response = await getClientsJobCountByIndustry();
          if (response) {
            setIndustryCounts(response);
            // Cache the response data
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
          {industryCounts.map((industry) => (
            <div key={industry.industry_id} className="col-md-4 mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/industry/${industry.industry_id}`} className="text-decoration-none text-dark">
                  {industry.industry_name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Link>
                <span className="badge bg-primary rounded-pill">
                  {industry.job_count}
                </span>
              </li>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
