 import React from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Dropdown } from 'react-bootstrap';
// import { FaEye, FaUpload, FaArrowDown } from 'react-bootstrap-icons';

const AppliedJobsList = ({ applications }) => {
   
    
  return (
    <Container  >
    
          <Card>
            <Card.Header style={{ backgroundColor: '#D36314' }} className="text-white">
              <h4 className="m-0">Applied Jobs List</h4>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table striped hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Job</th>
                      <th>Posted</th>
                      <th>Applied</th>
                      <th>Stage</th>
                      <th>Cover Letter</th>
                      <th>Contract File</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => {
                      const job = app.job || {};
                      const client = job.client?.name || 'Exact Manpower Consulting Ltd';
                      const jobPosition = job.job_position?.position_name || '';
                      const stage = app.stage?.stage_name || '';

                      const rowClass = job.checkDeadline ? 'text-danger' : '';

                      return (
                        <tr key={idx} className={rowClass}>
                          <td style={{ verticalAlign: 'middle' }}>
                            <strong>{client}</strong><br />
                            {jobPosition}
                          </td>

                          <td style={{ verticalAlign: 'middle' }}>
                            {app.job?.publish_date}
                          </td>

                          <td style={{ verticalAlign: 'middle' }}>
                            {app.created_at}
                          </td>

                          <td style={{ verticalAlign: 'middle' }}>
                            {(() => {
                              switch (stage) {
                                case 'Interview':
                                  return (
                                    <Badge
                                      bg="info"
                                      className="btnViewInterviewInfo"
                                      style={{ cursor: 'pointer' }}
                                      data-job-id={job.id}
                                      data-applicant-id={app.applicant_id}
                                    >
                                      {stage} click Here
                                    </Badge>
                                  );
                                case 'Offer':
                                  return (
                                    <a
                                      href={`/applicant/offer/${app.applicant_id}/${job.id}/${app.stage.id}`}
                                      className="badge bg-info text-white"
                                    >
                                      {stage}
                                    </a>
                                  );
                                case 'Employed':
                                  return (
                                    <a
                                      href="#"
                                      onClick={() =>
                                        window.previewContractForm(app.applicant_id, job.id, app.stage.id)
                                      }
                                      className="badge bg-info text-white"
                                      style={{ textDecoration: 'none' }}
                                    >
                                      {stage}
                                    </a>
                                  );
                                case 'Screening':
                                  return <Badge bg="info">Screening</Badge>;
                                default:
                                  return stage;
                              }
                            })()}
                          </td>

                          <td className="text-center" style={{ verticalAlign: 'middle' }}>
                            <a
                              href={`/applicant/cover-letter/download/${job.id}/${app.applicant_id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline-secondary"
                              title="Download Cover Letter"
                            >
                             
                            </a>
                          </td>

                          <td className="text-center" style={{ verticalAlign: 'middle' }}>
                            {job.applicant_contract ? (
                              <a
                                href={`/applicant/view/contract/${job.applicant_contract.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-secondary"
                                title="View Contract"
                              >
                                {/* <FaEye /> */}
                              </a>
                            ) : (
                              
                            <p>no</p>
                              
                            )}
                          </td>

                          <td style={{ verticalAlign: 'middle' }}>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="outline-secondary"
                                id={`dropdown-${idx}`}
                              >
                                Actions  
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  href={`/applicant/job/show?jbi=${encodeURIComponent(app.job.id)}`}
                                  title="View post"
                                >
                                  {/* <FaEye /> View */}
                                </Dropdown.Item>

                                {job.checkDeadline && (
                                  <Dropdown.Item
                                    href={`/applicant/job/cancel/${app.id}`}
                                    title="Cancel job post"
                                    onClick={(e) => {
                                      if (
                                        !window.confirm(
                                          `Are you sure you want to cancel job post ${jobPosition}?`
                                        )
                                      ) {
                                        e.preventDefault();
                                      }
                                    }}
                                  >
                                    <i className="fa fa-trash"></i> Cancel
                                  </Dropdown.Item>
                                )}
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
          </Card>
        {/* </Col>
      </Row> */}
    </Container>
  );
};

export default AppliedJobsList;
