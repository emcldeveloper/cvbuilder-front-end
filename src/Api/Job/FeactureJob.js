import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';


const API_BASE_URL = process.env.REACT_APP_API_URL;
 
export const fetchFeaturedJobs = async (page = 1) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/applicant/featuredJobs?limit=10&page=${page}`
    );
    return {
      success: true,
      data: response.data.data,
      hasMore: response.data.data.length > 0
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};


export const getJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}jobs`);
  return response.data.data; 
};
