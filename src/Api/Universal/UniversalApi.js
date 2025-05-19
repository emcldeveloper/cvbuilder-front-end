import axios from 'axios';

// Base URLs
const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;

// Simple in-memory cache
const cache = {};

const fetchWithCache = (key, url, transform) => {
  if (cache[key]) {
    return Promise.resolve(cache[key]);
  }

  return axios.get(url)
    .then((res) => {
      const data = transform ? transform(res) : res.data;
      cache[key] = data;
      return data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 429) {
        console.warn(`Rate limited on ${url}. Try again later.`);
      }
      throw error;
    });
};

// Universal API calls
export const getMaritalStatuses = () =>
  fetchWithCache('marital', `${UNIVERSAL_API}/marital`);

export const getGenders = () =>
  fetchWithCache('gender', `${UNIVERSAL_API}/gender`);

export const getCountries = () =>
  fetchWithCache('country', `${UNIVERSAL_API}/country`);

export const getRegions = () =>
  fetchWithCache('regions', `${UNIVERSAL_API}/regions`);

export const getIndustry = () =>
  fetchWithCache('industry', `${UNIVERSAL_API}/industry`, res => ({
    data: res.data.industry
  }));

export const getMajor = () =>
  fetchWithCache('major', `${UNIVERSAL_API}/marital`);

export const getCourse = () =>
  fetchWithCache('course', `${UNIVERSAL_API}/course`);

export const getEducationLevel = () =>
  fetchWithCache('education_level', `${UNIVERSAL_API}/education_level`);

export const getPosition = () =>
  fetchWithCache('position', `${UNIVERSAL_API}/position`);

export const getPositionLevel = () =>
  fetchWithCache('position_level', `${UNIVERSAL_API}/position_level`);

// Site statistics
export const getSiteStatistics = () =>
  fetchWithCache('site_statistics', `${API_BASE_URL}site-statistics`, res => ({
    data: res.data
  }));
