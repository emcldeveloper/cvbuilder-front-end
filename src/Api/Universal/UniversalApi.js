import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;
const UNIVERSAL_API = `${API_BASE_URL}universal`;

export const getMaritalStatuses = () => axios.get(`${UNIVERSAL_API}/marital`);

export const getGenders = () => axios.get(`${UNIVERSAL_API}/gender`);

export const getCountries = () => axios.get(`${UNIVERSAL_API}/country`);

export const getRegions = () => axios.get(`${UNIVERSAL_API}/regions`);

export const getIndustry = () =>
  axios.get(`${UNIVERSAL_API}/industry`).then((res) => ({
    data: res.data.industry, // ✅ Fix: extract the actual array
  }));



export const geMajor = () => axios.get(`${UNIVERSAL_API}/marital`);

export const getCourse = () => axios.get(`${UNIVERSAL_API}/course`);

export const getEducationLevel = () => axios.get(`${UNIVERSAL_API}/education_level`);

export const gePosition = () => axios.get(`${UNIVERSAL_API}/position`);

export const getPositionLevel = () => axios.get(`${UNIVERSAL_API}/position_level`);

//get site statistics
export const getSiteStatic=()=> axios.get(`${API_BASE_URL}site-statistics`).then((res) => ({
    data: res.data
  }));;