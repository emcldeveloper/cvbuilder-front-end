import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;


export const cvprofile = async ({ uuid }) => {
    try {
        const response = await axios.get(`https://ekazi.co.tz/cv_builder/${uuid}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
 
export const profile = async (applicant_id) => {
    const response = await axios.get(`http://127.0.0.1:8000/api/applicant/profile`, {
       
      params: {
        applicant_id,
        
      },
    });
     
    return response.data; 
  }