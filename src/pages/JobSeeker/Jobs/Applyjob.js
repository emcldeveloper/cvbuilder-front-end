import React from "react";
import JobSeekerLayout from "../../../layouts/JobSeekerLayout";
import { Card } from "react-bootstrap";
import CoverLetterForm from "../../../Component/Jobs/Applyjob";

const Applyjob =()=>{
    return (
        <JobSeekerLayout>
           <Card>
            <Card.Body>
                <CoverLetterForm>
                    
                </CoverLetterForm>
            </Card.Body>
           </Card>
        </JobSeekerLayout>
    )
}
export default Applyjob;