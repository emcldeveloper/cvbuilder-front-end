import { useEffect, useState } from 'react';
import { applicantpipeline } from '../../Api/Jobseeker/JobSeekerProfileApi';

const Usegetapplicantpipeline = () => {
    const [jobseekerpipeline, setpipeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const applicant_id = localStorage.getItem("applicantId");
 

    useEffect(() => {
        let mounted = true;
        applicantpipeline(applicant_id).then((res) => {
            if (mounted) {
                setpipeline(res.data);
                setLoading(false);
            }
        });

        return () => { mounted = false; };
    }, []);
   console.log("applicnat id yes man",jobseekerpipeline);
    return { jobseekerpipeline, loading };
};

export default Usegetapplicantpipeline;