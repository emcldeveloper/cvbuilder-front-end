// src/Api/Employer/ListOfEmployerApi.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const getListOfEmployers = async (page, perPage) => {
  try {
    const response = await axios.get(`${API_BASE_URL}list-of-employer?page=${page}&per_page=${perPage}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employers:", error);
    throw error;
  }
};
