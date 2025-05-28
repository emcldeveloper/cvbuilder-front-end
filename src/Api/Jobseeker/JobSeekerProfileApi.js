import axios from 'axios';

// Set up default base URL for all axios requests
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // e.g., 'https://ekazi.co.tz/'
});

// Simple in-memory cache with expiration
const cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Helper to check cache expiration
const isCacheValid = (key) => {
    const entry = cache[key];
    if (!entry) return false;

    const now = Date.now();
    return now - entry.timestamp < CACHE_TTL;
};

// Fetch CV Profile with caching + expiration
export const cvprofile = async ({ uuid }) => {
    const cacheKey = `cvprofile_${uuid}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`cv_builder/${uuid}`);
        cache[cacheKey] = {
            data: response.data,
            timestamp: Date.now(),
        };
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetch Applicant Profile with caching + expiration
export const profile = async (applicant_id) => {
    const cacheKey = `profile_${applicant_id}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/profile`, {
            params: { applicant_id },
        });
        cache[cacheKey] = {
            data: response.data,
            timestamp: Date.now(),
        };
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Fetch Featured Job Seeker with caching + expiration
export const featuredJobSeeker = async () => {
    const cacheKey = 'featuredJobSeeker';

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/feacture-candidate`);
        console.log("console will be here",response.data.data)
        cache[cacheKey] = {
            data: response.data.data,
            timestamp: Date.now(),
        };
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
