import React, { useEffect, useState } from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
 
import { getAppliedJobs } from "../../../Api/Job/FeactureJob";
import AppliedJobsList from "../../../Component/Jobs/AppliedJob";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";

const AppliedJob = () => {
    const [applications, setApplications] = useState([]); // better name, initialize as array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const applicant_id = 48;
     
    useEffect(() => {
        const myApplication = async () => {
            try {
                setLoading(true);
                const response = await getAppliedJobs(applicant_id);
                console.log('majibu');
                setApplications(response); // response is already the data
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching applications:', err);
            } finally {
                setLoading(false);
            }
        };

        myApplication();
    }, [applicant_id]); 
  
    console.log('Response data my applications:', applications);

    return (
        // <JobSeekerLayout>
        //     <AppliedJobsList applicant={applications}/>
        // </JobSeekerLayout>
        <JobSeekerLayout2>
            <AppliedJobsList applicant={applications}/>
        </JobSeekerLayout2>
       
    )
}

export default AppliedJob;