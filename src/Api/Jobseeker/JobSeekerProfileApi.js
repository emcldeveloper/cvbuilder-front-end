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

export const applicantpipeline = async (applicant_id) => {
    const cacheKey = `applicantpipeline_${applicant_id}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/applicantpipeline`, {
            params: { applicant_id },
        });
        cache[cacheKey] = {
            data: response.data.applicant_pipeline,
            timestamp: Date.now(),
        };
        return response.data.applicant_pipeline;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const completeprofile = async (applicant_id) => {
    const cacheKey = `completeprofile_${applicant_id}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/complete/${applicant_id}`, {
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
export const jobcompleteprofile = async (applicant_id) => {
    const cacheKey = `checkProfileForJob_${applicant_id}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/checkProfileForJob/${applicant_id}`, {
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
export const primarydata = async (applicant_id) => {
    const cacheKey = `primarydata_${applicant_id}`;

    if (isCacheValid(cacheKey)) {
        return cache[cacheKey].data;
    }

    try {
        const response = await api.get(`applicant/primarydata/${applicant_id}`, {
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
        console.log("console will be here", response.data.data)
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
export const createreferee = async (sendData) => {
    try {
        const response = await api.post('applicant/refereestore', sendData);
        return response;
    } catch (error) {
        throw error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
    }
};
export const createlanguage = async (sendData) => {
    try {
        const response = await api.post('applicant/storeLanguage', sendData);
        return response;
    } catch (error) {
        throw error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
    }
};
export const createCreerProfile = async (applicant_id,career) => {
    try {
        const response = await api.put( `applicant/storecareerobjective/${applicant_id}`, career);
        return response;
    } catch (error) {
        throw error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
    }
};
export const createCreerObjective = async (applicant_id,objective) => {
    try {
        const response = await api.put( `applicant/storeObjective/${applicant_id}`, objective);
        return response;
    } catch (error) {
        throw error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
    }
};
export const createCulture = async (sendData) => {
    try {
        const response = await api.post( `applicant/culturestore`, sendData);
        return response;
    } catch (error) {
        throw error;
    }
};

export const createProfileImageu = async (sendData) => {
    try {
        const response = await api.post('applicant/profileimagesave', sendData);
        return response.data; // Return only the data part
    } catch (error) {
        // Throw the full error to preserve response data
        throw error;
    }
};
export const createProfileImage = async (formData) => {
    try {
        const response = await api.post('applicant/profileimagesave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
            },
            // withCredentials: true // if using sessions
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const createBackgroundImage = async (formData) => {
    try {
        const response = await api.post('applicant/backgroundimagesave', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
            },
            // withCredentials: true // if using sessions
        });
        console.log("the is reach on this api",response);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const deleteLanguage = async (languageId) => {
  try {
    const response = await api.delete(`applicant/languagedelete/${languageId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
export const deleteReferee = async (RefereeId) => {
  try {
    const response = await api.delete(`applicant/refereedelete/${RefereeId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
export const deleteTraining = async (TrainingId) => {
  try {
    const response = await api.delete(`applicant/trainingdelete/${TrainingId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
export const deleteProficiency = async (ProficiencyId) => {
  try {
    const response = await api.delete(`applicant/deleteproficiency/${ProficiencyId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
export const deleteEducation = async (EducationId) => {
  try {
    const response = await api.delete(`applicant/deleteeducation/${EducationId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};
export const deleteExperience = async (ExperienceId) => {
  try {
    const response = await api.delete(`applicant/deleteexperience/${ExperienceId}`);
    return response;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message
    );
  }
};


export const createculture = async (sendData, retries = 3, delay = 2000) => {
    try {
        const response = await api.post('applicant/culturestore', sendData);
        return response;
    } catch (error) {
        // If it's a 429 Too Many Requests
        if (error.response?.status === 429 && retries > 0) {
            // Check for Retry-After header from Laravel
            let retryAfter = error.response.headers["retry-after"];
            retryAfter = retryAfter ? parseInt(retryAfter, 10) * 1000 : delay;

            console.warn(`429 received. Retrying after ${retryAfter / 1000}s...`);

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, retryAfter));

            // Recursive retry
            return createculture(sendData, retries - 1, delay * 2); // exponential backoff
        }

        // Otherwise, throw the error
        throw (
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message
        );
    }
};


export const createcareer = async(data)=>{
    try {
        const response = await api.post('');
        return response;

    } catch (error) {
        throw error.response?.data?.message || 
        error.response?.data.error 
        ||error.message; 
    
    }
}

