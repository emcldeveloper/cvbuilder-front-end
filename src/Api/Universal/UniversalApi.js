// src/api/universalApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;

const cache = {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

const fetchWithCache = async (key, url, transform, retries = 3, delay = 1000) => {
  const now = Date.now();

  // Check if cached data exists and hasn't expired
  if (cache[key] && (now - cache[key].timestamp < CACHE_EXPIRATION_TIME)) {
    return Promise.resolve(cache[key].data);
  }

  const fetchData = async (attempt = 0) => {
    try {
      const res = await axios.get(url);
      const data = transform ? transform(res) : res.data;

      // Save data and timestamp
      cache[key] = {
        data,
        timestamp: Date.now()
      };

      return data;
    } catch (error) {
      if (error.response?.status === 429 && attempt < retries) {
        const backoff = delay * Math.pow(2, attempt);
        console.warn(`Rate limited on ${url}. Retrying in ${backoff}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        return fetchData(attempt + 1);
      }
      throw error;
    }
  };

  return fetchData();
};


// Exported API calls
export const getMaritalStatuses = () =>
  fetchWithCache('marital', `${UNIVERSAL_API}/marital`);

export const getGenders = () =>
  fetchWithCache('gender', `${UNIVERSAL_API}/gender`);

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
    data: res.data
  }));

export const getCourse = () =>
  fetchWithCache('course', `${UNIVERSAL_API}/course`, res => ({
    data: res.data
  }));

export const getEducationLevel = () =>
  fetchWithCache('education_level', `${UNIVERSAL_API}/education_level`, res => ({
    data: res.data
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
