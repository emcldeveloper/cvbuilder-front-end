 
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_URL;
 
 
// const api = axios.create({
//   baseURL: 'https://ekazi.co.tz/api/applicant',  
//    headers: {
//       'Content-Type': 'multipart/form-data',  
//     },
// });
const api = axios.create({
   baseURL: `${API_BASE_URL}applicant`, 
   headers: {
      'Content-Type': 'multipart/form-data',  
    },
});
 
 
export const CvApi = {
 
   createsubscription: async (countnoData) => {
    try {
      const response = await api.post('/savesubsription', countnoData);
      return response;
    } catch (error) {
      throw error.response?.data?.message || 
             error.response?.data?.error ||
             error.message;
    }
  },

 
  getsubscriptionPlan: async () => {
    try {
      const response = await api.get('/CvSubscription');
      return response.data.cv_plan_subscription;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
 
};

 