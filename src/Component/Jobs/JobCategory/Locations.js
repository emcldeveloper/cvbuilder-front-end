import React, { useEffect, useState } from 'react';
import { getJobCountByRegion } from '../../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom';

const getCachedRegions = () => {
  const cached = localStorage.getItem('regions');
  return cached ? JSON.parse(cached) : null;
};

const setCachedRegions = (data) => {
  localStorage.setItem('regions', JSON.stringify(data));
};

const Locations = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = getCachedRegions();

    if (cachedData) {
      setRegions(cachedData);
      setLoading(false);
    } else {
      const fetchRegions = async () => {
        try {
          const response = await getJobCountByRegion();
          if (response) {
            setRegions(response);
            setCachedRegions(response);
          }
        } catch (error) {
          console.error('Error fetching job count by region:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchRegions();
    }
  }, []);

  return (
    <div>
      <h4 className="mb-3">Jobs by Location</h4>

      {loading ? (
        <p>Loading...</p>
      ) : regions.length === 0 ? (
        <p>No job locations found.</p>
      ) : (
        <div className="row">
          {regions.map((region) => (
            <div key={region.region_id} className="col-md-4 mb-3 d-flex align-items-center">
              <span className="badge bg-primary rounded-pill me-2">
                {region.total_positions}
              </span>
              <Link
                to={`/location/${region.region_id}`}
                className="text-decoration-none text-dark"
              >
                {region.region_name
                  .toLowerCase()
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
