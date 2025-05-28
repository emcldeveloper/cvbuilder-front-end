import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;

const cache = {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// Modified fetchWithCache function to avoid retries and handle rate-limiting
const fetchWithCache = async (key, url, transform) => {
  const now = Date.now();

  // Check if cached data exists and hasn't expired
  if (cache[key] && (now - cache[key].timestamp < CACHE_EXPIRATION_TIME)) {
    return Promise.resolve(cache[key].data);
  }

  try {
    // Make the API request
    const res = await axios.get(url);
    const data = transform ? transform(res) : res.data;

    // Save data and timestamp in cache
    cache[key] = {
      data,
      timestamp: Date.now()
    };

    return data;
  } catch (error) {
    // Handle 429 error (rate-limited)
    if (error.response?.status === 429) {
      console.error(`Rate limit exceeded for ${url}. No retry will occur.`);
    }
    // Re-throw other errors
    throw error;
  }
};

// Exported API calls
export const getMaritalStatuses = () =>
  fetchWithCache('marital', `${UNIVERSAL_API}/marital`, res => ({
    data: res.data.marital
  }));

export const getGenders = () =>
  fetchWithCache('gender', `${UNIVERSAL_API}/gender`, res => ({
    data: res.data.gender
  }));

export const getCountries = () =>
  fetchWithCache('country', `${UNIVERSAL_API}/country`, res => ({
    data: res.data.country
  }));

export const getRegions = () =>
  fetchWithCache('regions', `${UNIVERSAL_API}/regions`, res => ({
    data: res.data.region
  }));

export const getIndustry = () =>
  fetchWithCache('industry', `${UNIVERSAL_API}/industry`, res => ({
    data: res.data.industry
  }));

export const getMajor = () =>
  fetchWithCache('major', `${UNIVERSAL_API}/major`, res => ({
    data: res.data.major
  }));

export const getCourse = () =>
  fetchWithCache('course', `${UNIVERSAL_API}/course`, res => ({
    data: res.data.course
  }));

export const getEducationLevel = () =>
  fetchWithCache('education_level', `${UNIVERSAL_API}/education_level`, res => ({
    data: res.data.education_category
  }));

export const getPosition = () =>
  fetchWithCache('position', `${UNIVERSAL_API}/position`);

export const getPositionLevel = () =>
  fetchWithCache('position_level', `${UNIVERSAL_API}/position_level`, res => ({
    data: res.data.position_level
  }));

export const getSiteStatistics = () =>
  fetchWithCache('site_statistics', `${API_BASE_URL}site-statistics`, res => ({
    data: res.data
  }));

export const getJobTypes = () =>
  fetchWithCache('jobType', `${UNIVERSAL_API}/job-type`, res => ({
    data: res.data.type
  }));
