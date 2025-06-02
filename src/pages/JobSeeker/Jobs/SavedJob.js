import React from "react";
import JobSeekerLayout2 from "../../../layouts/JobSeekerLayout2";
import SavedJobsList from "../../../Component/Jobs/SavedJob";
 
const SavedJob = () => {
 const application=[];
    return (
        <JobSeekerLayout2 >
            <SavedJobsList  application={application}/>
        </JobSeekerLayout2>

    )

}

export default SavedJob;