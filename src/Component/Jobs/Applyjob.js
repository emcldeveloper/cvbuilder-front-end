import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { profile } from '../../Api/Jobseeker/JobSeekerProfileApi';
import MatchModalButton from './JobMatchPercentage';

const profileCache = {};
const CoverLetterForm = () => {
    const [originalDetails, setOriginalDetails] = useState(null);


    const [coverLetter, setCoverLetter] = useState('');
    const { register, handleSubmit } = useForm();
    const { uuid, template } = useParams();
    const [searchParams] = useSearchParams();
    // const jobId = searchParams.get('jobId') || localStorage.getItem('jobId');
    const jobId = 297;
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [applicant, setApplicant] = useState(null);

    // const applicant_idy = 18861;
    // const applicant_id = 48;
    const applicant_id = localStorage.getItem("applicantId");
    console.log("applicant id from local storage", applicant_id);

    useEffect(() => {
        const fetchProfile = async () => {
            // Check cache first
            if (profileCache[applicant_id]) {
                setApplicant(profileCache[applicant_id]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await profile(applicant_id);

                // Update cache
                profileCache[applicant_id] = response.data;

                console.log('Response data:', response.data);
                setOriginalDetails(response.data)
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [applicant_id]);
    console.log({
        uuid,
        template,
        jobIdFromURL: searchParams.get('jobId'),
        jobIdFromStorage: localStorage.getItem('jobId'),
        finalJobId: jobId
    });


    useEffect(() => {
        if (!jobId) {
            setError('No job ID found');
            setLoading(false);
            return;
        }

        const fetchJobData = async () => {
            try {

                const response = await axios.get(`http://127.0.0.1:8000/api/applicant/jobdetail/${jobId}`);

                if (response.data) {
                    console.log("view job by id:", response.data);
                    setJob(response.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (error) {
                console.error("API Error:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobData();
    }, [jobId]);
    console.log("detail job is available their", job);

    if (loading) {
        return <div className="container text-center py-5">Loading application data...</div>;
    }

    if (error) {
        return <div className="container text-center py-5 text-danger">Error: {error}</div>;
    }

    if (!originalDetails) {
        return <div className="container text-center py-5">No application data found</div>;
    }

    // Ensure applicant_profile exists and is an array
    const applicantProfiles = originalDetails.applicant_profile || [];
    const applicantadress = originalDetails.address || [];

    return (
        <div > {/* Increased horizontal padding on medium+ screens */}
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12"> {/* Constrained width for better readability */}
                    {/* Header Section */}
                    <div className="job-header text-center py-4 mb-4"> {/* Increased padding */}
                        <h5 className="text-primary fw-bold border-bottom border-primary border-3 pb-3  ">
                            Cover Letter Application Form
                        </h5>
                    </div>

                    {/* Main Card */}
                    <div className="card shadow-sm rounded-lg"> {/* Added subtle shadow and rounded corners */}
                        {/* Address Section */}
                        <div className="card-header bg-white border-bottom-0 pt-4">
                            {/* Applicant Address - Top Right */}
                            <div className="row justify-content-between mb-5"> {/* Added bottom margin to create space before employer address */}
                                <div className="col-md-5"></div> {/* Empty column to push applicant address to right */}
                                <div className="col-md-5">
                                    <div className="applicant-address p-3   rounded text-md-end">
                                        {originalDetails.applicant_profile.map((item, index) => (
                                            <div key={index}>
                                                <strong className="d-block">{item.first_name} {item.last_name}</strong>
                                            </div>
                                        ))}
                                        <div className="mb-1">P.O.BOX</div>
                                        {applicantadress.map((item, index) => (
                                            <div key={index} className="mb-1">
                                                {item.region_name}, {item.name}
                                            </div>
                                        ))}
                                        <div className="text-muted mt-2">
                                            {new Date().toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Employer Address - Bottom Left */}
                            <div className="row justify-content-between mt-1">
                                <div className="col-md-5 ">
                                    <div className="employer-address p-3   rounded">
                                        {job.map((jobItem, index) => (
                                            <address className="mb-0" key={index}>
                                                <strong className="d-block">{jobItem.client?.client_name}</strong>
                                                <strong className="d-block">{jobItem.job_position?.position_name}</strong>
                                                <strong className="d-block">P.O.BOX</strong>
                                                <span className="d-block">
                                                    {jobItem.client?.client_addresses?.sub_location},
                                                </span>
                                                <span className="d-block">
                                                    {jobItem.client?.client_addresses?.region?.region_name}
                                                </span>
                                                <span className="d-block">
                                                    {jobItem.client?.client_addresses?.region?.country?.name}
                                                </span>
                                            </address>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-5"></div> {/* Empty column for balance */}
                            </div>

                            {/* Salutation */}
                            <div className="row mt-2">
                                <div className="col-12 px-4">
                                    <p className="lead">Dear Sir/ Madam,</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="card-body px-4 px-lg-5 pt-0"> {/* Adjusted padding */}
                            <form>
                                {/* Reference Section */}
                                <div className="row mb-4"> {/* Added bottom margin */}
                                    <div className="col-12">
                                        <div className="job-reference text-center py-3 bg-primary bg-opacity-10 rounded"> {/* Highlighted background */}
                                            <h5 className="mb-0  text-primary">
                                                REF: APPLICATION FOR THE POST OF
                                                {job.map((jobItem, index) => (
                                                    <span key={index} className="d-block mt-2">
                                                        {jobItem.job_position?.position_name?.toUpperCase()}
                                                    </span>
                                                ))}
                                            </h5>
                                        </div>
                                    </div>
                                </div>

                                {/* Cover Letter Textarea */}
                                <div className="form-group mb-4">
                                    <textarea
                                        name="notes"
                                        className="form-control p-4"
                                        placeholder="Write your cover letter here..."
                                        required
                                        id="coverLetter"
                                        style={{
                                            minHeight: '250px',
                                            fontSize: '1.05rem',
                                            lineHeight: '1.8',
                                            border: '1px solid #ced4da',
                                            borderRadius: '0.5rem'
                                        }}
                                    ></textarea>
                                 
                                </div>

                                {/* Submit Button */}
                               
                                <MatchModalButton>
                                    
                                </MatchModalButton>
                            </form>
                        </div>

                        {/* Footer Section */}
                        <div className="card-footer bg-white border-top-0 px-4 px-lg-5 pb-4"> {/* Removed border */}
                            <div className="closing-section px-3">
                                {originalDetails.applicant_profile.map((item, index) => (
                                    <div key={index} className="signature-block mt-3">
                                        <strong className="d-block"> Thank you</strong>
                                        <strong className="d-block">  Regards</strong>
                                        <strong className="d-block">{item.first_name} {item.last_name}</strong>
                                       
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CoverLetterForm;