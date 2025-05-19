import React, { useEffect, useState } from 'react';
import { getJobCountByRegion } from '../../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom'; // Only needed if you're using routing

// Helper function to get cached data from localStorage
const getCachedRegions = () => {
  const cachedData = localStorage.getItem('regions');
  return cachedData ? JSON.parse(cachedData) : null;
};

// Helper function to set data in localStorage
const setCachedRegions = (data) => {
  localStorage.setItem('regions', JSON.stringify(data));
};

const Locations = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the regions data is cached
    const cachedData = getCachedRegions();

    if (cachedData) {
      // If cached data exists, use it and stop loading
      setRegions(cachedData);
      setLoading(false);
    } else {
      // If no cache, fetch data from the API
      const fetchRegions = async () => {
        try {
          const response = await getJobCountByRegion();
          if (response) {
            setRegions(response);
            // Cache the response data
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
            <div key={region.region_id} className="col-md-4 mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/location/${region.region_id}`} className="text-decoration-none text-dark">
                  {region.region_name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Link>
                <span className="badge bg-primary rounded-pill">
                  {region.total_positions}
                </span>
              </li>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
