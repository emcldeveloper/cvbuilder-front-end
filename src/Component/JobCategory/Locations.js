import React, { useEffect, useState } from 'react';
import { getJobCountByRegion } from '../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom'; // Only needed if you're using routing

const Locations = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await getJobCountByRegion();
        if (response) {
          setRegions(response);
          console.log("region",response)
        }
      } catch (error) {
        console.error('Error fetching job count by region:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegions();
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
  .join(' ')
}

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
