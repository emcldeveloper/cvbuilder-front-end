import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import EmpCorrespondence from "../../Component/Profile/Correspondend";
import JobSeekerLayout2 from "../../layouts/JobSeekerLayout2";
import { Card } from "react-bootstrap";

const EmployerCorrespondence = () => {
    return (

        <JobSeekerLayout2>
            <Card>
                <Card.Body>
                    <EmpCorrespondence></EmpCorrespondence>
                </Card.Body>
            </Card>
        </JobSeekerLayout2>

    );
}
export default EmployerCorrespondence;