import React, { useEffect } from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import AppliedJobsList from "../../../Component/Jobs/AppliedJob";
 
const AppliedJob =()=>{
    
    const  applicant=[];
    return (
        <JobSeekerLayout>
 <AppliedJobsList  applications={applicant}/>
        </JobSeekerLayout>
      
    )
}
export default AppliedJob;