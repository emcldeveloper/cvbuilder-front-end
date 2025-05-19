import React, { useEffect, useState } from 'react';
import { getJobCategorySummary } from '../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom'; // If you're using React Router

// Helper function to get cached data from localStorage
const getCachedCategories = () => {
  const cachedData = localStorage.getItem('categories');
  return cachedData ? JSON.parse(cachedData) : null;
};

// Helper function to set data in localStorage
const setCachedCategories = (data) => {
  localStorage.setItem('categories', JSON.stringify(data));
};

const Industries = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the categories data is cached
    const cachedData = getCachedCategories();

    if (cachedData) {
      // If cached data exists, use it and stop loading
      setCategories(cachedData);
      setLoading(false);
    } else {
      // If no cache, fetch data from the API
      const fetchCategories = async () => {
        try {
          const response = await getJobCategorySummary();
          if (response) {
            setCategories(response);
            // Cache the response data
            setCachedCategories(response);
          }
        } catch (error) {
          console.error('Error fetching job category summary:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, []);

  return (
    <div>
      <h4 className="mb-3">Job Categories</h4>
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No job categories found.</p>
      ) : (
        <div className="row">
          {categories.map((category) => (
            <div key={category.category_id} className="col-md-4 mb-3">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to={`/category/${category.category_id}`} className="text-decoration-none text-dark">
                  {category.category_name
                    .toLowerCase()
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </Link>
                <span className="badge bg-primary rounded-pill">
                  {category.total_positions}
                </span>
              </li>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Industries;
