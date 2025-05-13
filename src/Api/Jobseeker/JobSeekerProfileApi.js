import axios from 'axios';

export const profile = async ({ uuid }) => {
    try {
        const response = await axios.get(`https://ekazi.co.tz/api/cv/cv_builder/${uuid}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}