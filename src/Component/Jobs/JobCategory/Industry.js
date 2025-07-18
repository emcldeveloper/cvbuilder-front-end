import React, { useEffect, useState } from 'react';
import { getJobCategorySummary } from '../../../Api/Job/JobCategoriesApi';
import { Link } from 'react-router-dom';

const getCachedCategories = () => {
  const cached = localStorage.getItem('categories');
  return cached ? JSON.parse(cached) : null;
};

const setCachedCategories = (data) => {
  localStorage.setItem('categories', JSON.stringify(data));
};

const Industries = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = getCachedCategories();

    if (cachedData) {
      setCategories(cachedData);
      setLoading(false);
    } else {
      const fetchCategories = async () => {
        try {
          const response = await getJobCategorySummary();
          if (response) {
            setCategories(response);
            setCachedCategories(response);
          }
        } catch (error) {
          console.error('Error fetching job categories:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, []);

  return (
    <div>
      <h4 className="mb-3">Jobs by Industry</h4>

      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>No industries found.</p>
      ) : (
        <div className="row">
          {categories.map((category) => {
            const formattedCategoryName = category.category_name
              .toLowerCase()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <div
                key={category.category_id}
                className="col-md-4 mb-3 d-flex align-items-center"
              >
                <span className="badge bg-primary rounded-pill me-3">
                  {category.total_positions}
                </span>
                <Link
                  to={`/jobs?industry=${category.category_id}`}
                  className="text-decoration-none text-dark"
                >
                  {formattedCategoryName}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Industries;
