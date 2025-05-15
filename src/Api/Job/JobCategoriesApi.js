import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// Get job count grouped by region
export const getJobCountByRegion = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}job-count-by-region`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job count by region:', error);
    throw error;
  }
};

// Get job category summary
export const getJobCategorySummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}job-category-summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job category summary:', error);
    throw error;
  }
};

// Get clients' job count grouped by industry
export const getClientsJobCountByIndustry = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}clients-job-count-by-industry`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clients job count by industry:', error);
    throw error;
  }
};
