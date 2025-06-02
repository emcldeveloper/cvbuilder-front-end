import React, { useEffect, useState } from 'react';


import { formatDateTime } from '../../utils/dateUtils';
// import { FaEye, FaUpload, FaArrowDown } from 'react-bootstrap-icons';
import {
    Container, Card, Table, Badge, Dropdown,
    OverlayTrigger, Tooltip, Button, ButtonGroup
} from 'react-bootstrap';
import {
    FaFilePdf, FaFileDownload, FaEye, FaTrashAlt,
    FaEllipsisV, FaBriefcase, FaCalendarAlt, FaUserTie,
    FaFileContract, FaSearch, FaCheckCircle
} from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtils'; // Replace with your date formatter
import ContractCell from '../Forms/Job/UploadContract';
import JobDetailModal from './JobDetailModel/JobModelDetail';



const SavedJobsList = ({ application }) => {
    const handleContractUpload = (jobId, file) => {
        // Your API upload logic here
        console.log(`Uploading contract for job ${jobId}`, file);
        // Example: await uploadContractAPI(jobId, file);
    };
    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setShowModal(true);
    };


    console.log("my application is msoft one", application)
    return (
        <Container fluid className="px-4 py-3">
            <Card className="border-0 shadow-sm">
                <Card.Header style={{ backgroundColor: '#D36314' }} className=" text-white d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <FaBriefcase className="me-2" />
                        <h4 className="m-0">Saved Jobs </h4>
                    </div>
                    <Badge pill bg="light" text="dark">
                        {application?.length || 0} jobs
                    </Badge>
                </Card.Header>

                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="mb-0 align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th className="ps-4">Position & Company</th>
                                    <th>  Posted On</th>
                                    <th>  Expired on</th>
                               
                                    <th className="text-center">Apply</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {application?.map((app, idx) => {
                                    const job = app.job || {};
                                    const client = job.client?.name || 'Exact Manpower Consulting Ltd';
                                    const jobPosition = job.job_position?.position_name || '';
                                    const stage = app.status || '';

                                    const getStatusBadge = () => {
                                        const baseClass = "rounded-pill py-1 px-3 d-inline-flex align-items-center";

                                        switch (stage) {
                                            case 'Interview':
                                                return (
                                                    <Badge
                                                        bg="info"
                                                        className={`${baseClass} cursor-pointer`}
                                                    // onClick={() => handleViewInterview(job.id, app.applicant_id)}
                                                    >
                                                        <FaUserTie className="me-1" /> {stage}
                                                    </Badge>
                                                );
                                            case 'Offer':
                                                return (
                                                    <a
                                                        href={`/applicant/offer/${app.applicant_id}/${job.id}/${app.stage.id}`}
                                                        className={`badge bg-success ${baseClass} text-white text-decoration-none`}
                                                    >
                                                        <FaCheckCircle className="me-1" /> {stage}
                                                    </a>
                                                );
                                            case 'Employed':
                                                return (
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className={`${baseClass} border-0`}
                                                        onClick={() => window.previewContractForm(app.applicant_id, job.id, app.stage.id)}
                                                    >
                                                        <FaFileContract className="me-1" /> {stage}
                                                    </Button>
                                                );
                                            case 'Screening':
                                                return <Badge bg="secondary" className={baseClass}><FaSearch className="me-1" /> Screening</Badge>;
                                            default:
                                                return <Badge bg="light" text="dark" className={baseClass}>{stage}</Badge>;
                                        }
                                    };

                                    return (
                                        <tr key={idx} className={job.checkDeadline ? 'table-warning' : ''}>
                                            <td className="ps-4">
                                                <div className="fw-semibold">{jobPosition}</div>
                                                <div className="text-muted small">{client}</div>
                                            </td>

                                            <td>
                                                <div className="text-nowrap">{formatDate(app.job?.publish_date)}</div>
                                            </td>

                                            <td>
                                                <div className="text-nowrap">{formatDate(app.created_at)}</div>
                                            </td>

                                            <td>
                                                {getStatusBadge()}
                                            </td>

                                          

                                            <td className="text-center">
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" size="sm" className="px-2">
                                                        <FaEllipsisV />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={() => handleJobClick(job)}
                                                            style={{ cursor: 'pointer' }}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <FaEye className="me-2" /> View Details
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item
                                                            href={`/applicant/job/cancel/${app.id}`}
                                                            className="d-flex align-items-center text-danger"
                                                            onClick={(e) => {
                                                                if (!window.confirm(`Cancel application for ${jobPosition}?`)) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            <FaTrashAlt className="me-2" /> Withdraw
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>

                <Card.Footer className="bg-light d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                        Showing {application?.length || 0} jobs
                    </div>
                    {/* Pagination would go here */}
                </Card.Footer>
            </Card>
            <JobDetailModal
                job={selectedJob}
                show={showModal}

                onHide={() => setShowModal(false)}
            />
        </Container>
    );
};

export default SavedJobsList;
