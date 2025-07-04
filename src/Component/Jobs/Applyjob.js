import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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

    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [applicant, setApplicant] = useState(null);
    const jobId = localStorage.getItem("jobId");
    const applicant_id = localStorage.getItem("applicantId");

    // ✅ Fetch applicant profile
    useEffect(() => {
        const fetchProfile = async () => {
            if (!applicant_id) return;

            if (profileCache[applicant_id]) {
                setApplicant(profileCache[applicant_id]);
                setOriginalDetails(profileCache[applicant_id]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await profile(applicant_id);
                profileCache[applicant_id] = response.data;
                setOriginalDetails(response.data);
                setError(null);
            } catch (err) {
                if (err.response?.status === 429) {
                    setError("Too many requests. Please wait a moment and try again.");
                } else {
                    setError(err.message || "Error fetching applicant profile.");
                }
                console.error('Error fetching profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [applicant_id]);

    // ✅ Optional: Fetch job details if needed
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/applicant/jobdetail/${jobId}`);
                setJob(res.data);
            } catch (err) {
                console.error('Error fetching job:', err);
            }
        };

        if (jobId) fetchJob();
    }, [jobId]);

    if (loading) {
        return <div className="container text-center py-5">Loading application data...</div>;
    }

    if (error) {
        return <div className="container text-center py-5 text-danger">Error: {error}</div>;
    }

    if (!originalDetails) {
        return <div className="container text-center py-5">No application data found</div>;
    }

    const applicantProfiles = originalDetails.applicant_profile || [];
    const applicantadress = originalDetails.address || [];

    return (
        <div>
            <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                    <div className="job-header text-center py-2 mb-3">
                        <h5 className="text-primary fw-bold border-bottom border-primary pb-2 d-inline-block">
                            Cover Letter Application Form
                        </h5>
                    </div>

                    <div className="card rounded-lg">
                        <div className="card-header bg-white border-bottom-0 pt-3 px-3">
                            <div className="row mb-3">
                                <div className="col-12 text-end">
                                    <div className="applicant-address text-end">
                                        {applicantProfiles.map((item, index) => (
                                            <div key={index}>
                                                <strong>{item.first_name} {item.last_name}</strong>
                                            </div>
                                        ))}
                                        <div>P.O.BOX</div>
                                        {applicantadress.map((item, index) => (
                                            <div key={index}>{item.region_name}, {item.name}</div>
                                        ))}
                                        <div className="text-muted small mt-2 text-end">
                                            {new Date().toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 text-start">
                                    <div className="employer-address">
                                        {job.map((jobItem, index) => (
                                            <address className="mb-0" key={index}>
                                                <strong className="d-block">{jobItem.client?.client_name}</strong>
                                                <strong className="d-block">{jobItem.job_position?.position_name}</strong>
                                                <strong className="d-block">P.O.BOX</strong>
                                                <span className="d-block">{jobItem.client?.client_addresses?.sub_location},</span>
                                                <span className="d-block">{jobItem.client?.client_addresses?.region?.region_name}</span>
                                                <span className="d-block">{jobItem.client?.client_addresses?.region?.country?.name}</span>
                                            </address>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-2">
                                <div className="col-12">
                                    <p>Dear Sir/Madam,</p>
                                </div>
                            </div>
                        </div>

                        <div className="card-body px-3 px-lg-4 pt-0">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <div className="job-reference text-center py-2 bg-primary bg-opacity-10 rounded">
                                            <h6 className="mb-0 text-primary">
                                                REF: APPLICATION FOR THE POST OF
                                                {job.map((jobItem, index) => (
                                                    <span key={index} className="d-block mt-1">
                                                        {jobItem.job_position?.position_name?.toUpperCase()}
                                                    </span>
                                                ))}
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-3">
                                    <textarea
                                        name="notes"
                                        className="form-control p-3"
                                        placeholder="Write your cover letter here..."
                                        required
                                        id="coverLetter"
                                        style={{
                                            minHeight: '200px',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            border: '1px solid #ced4da',
                                            borderRadius: '0.25rem'
                                        }}
                                    ></textarea>
                                </div>

                                <MatchModalButton />
                            </form>
                        </div>

                        <div className="card-footer bg-white border-top-0 px-3 px-lg-4 pb-3">
                            <div className="closing-section">
                                {applicantProfiles.map((item, index) => (
                                    <div key={index} className="signature-block">
                                        <div>Thank you</div>
                                        <div>Regards</div>
                                        <strong>{item.first_name} {item.last_name}</strong>
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
