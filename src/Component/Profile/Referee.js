import React from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt, faDownload, faUserTie } from '@fortawesome/free-solid-svg-icons';

const RefereesSection = ({ applicant, showAddModal, showEditModal }) => {
    const getFileNameFromUrl = (url) => {
        if (!url) return '';
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        return filename.length > 20 ? `${filename.substring(0, 15)}...` : filename;
    };

    return (
        <div className="referees-section mt-4">
            {/* Referees Header */}
            <Row className="align-items-center mb-2">
                <Col xs={8}>
                    <h6 className=" mb-0">
                        <b>REFEREES</b>
                    </h6>
                </Col>
                <Col xs={4} className="text-end">
                    <Button
                        variant="link"
                        className="p-0 text-secondary"
                        onClick={showAddModal}
                    >
                        <FontAwesomeIcon icon={faPlus} size="lg" className="me-2" />
                    </Button>
                </Col>
            </Row>

            <div className="mb-3 divider" />

            {/* Referees List */}

            <div className="table-responsive">
                <Table hover className="info-table">
                    <tbody id="refereediv-details">
                        {applicant?.referees?.length > 0 ? (
                            applicant.referees.map((referee, index) => (
                                <tr key={index}>
                                    <td style={{ verticalAlign: 'top', width: '70px' }}>
                                        <div className="referee-avatar mt-1">
                                            <FontAwesomeIcon
                                                icon={faUserTie}
                                                className="text-primary"
                                                style={{
                                                    fontSize: '1.25rem',  // Reduced from 2.5rem
                                                    border: '3px solid #28a8e4',  // Thinner border
                                                    borderRadius: '50%',
                                                    padding: '3px',  // Less padding
                                                    backgroundColor: 'white',
                                                    width: '32px',   // Fixed dimensions
                                                    height: '32px'
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td style={{ paddingLeft: '1%' }}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div>
                                                <h6 className="mb-1">
                                                    {[referee.first_name, referee.middle_name, referee.last_name]
                                                        .filter(Boolean)
                                                        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
                                                        .join(' ')}
                                                </h6>
                                                <p className="mb-1">
                                                    {referee.referee_position &&
                                                        referee.referee_position.charAt(0).toUpperCase() +
                                                        referee.referee_position.slice(1).toLowerCase()}
                                                </p>
                                                <p className="mb-1">
                                                    {referee.employer &&
                                                        referee.employer.charAt(0).toUpperCase() +
                                                        referee.employer.slice(1).toLowerCase()}
                                                </p>
                                                <p className="mb-1 text-muted">
                                                    {referee.email}
                                                </p>
                                                <p className="mb-1">
                                                    {referee.phone}
                                                </p>
                                            </div>
                                            <Button
                                                variant="link"
                                                className="p-0 text-secondary"
                                                onClick={() => showEditModal(referee)}
                                            >
                                                <FontAwesomeIcon icon={faPencilAlt} />
                                            </Button>
                                        </div>

                                        {referee.type === 'private' && referee.attachment && (
                                            <div className="mt-2">
                                                <a
                                                    href={referee.attachment}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none small"
                                                    title={getFileNameFromUrl(referee.attachment)}
                                                >
                                                    <FontAwesomeIcon icon={faDownload} className="me-1" />
                                                    {getFileNameFromUrl(referee.attachment)}
                                                </a>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center py-3 text-muted">
                                    No referees added
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>


            <style jsx>{`
        .divider {
          height: 1px;
          width: 100%;
          background-color: rgb(235, 235, 235);
        }
        .text-orange {
          color: orange;
        }
        .referee-avatar {
          margin-top: -10px;
        }
        .info-table tr:hover {
          background-color: rgba(0, 0, 0, 0.02);
        }
      `}</style>
        </div>
    );
};

export default RefereesSection;